import { headers } from 'next/headers';
import { database } from './storage';

export const sessionCookie = '__Host-vector_admin';
const sessionSeconds = 8 * 60 * 60;
const textEncoder = new TextEncoder();
const hex = (value: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(value)).map(b => b.toString(16).padStart(2, '0')).join('');
const fromHex = (value: string) => new Uint8Array(value.match(/.{2}/g)?.map(v => parseInt(v, 16)) ?? []);
export async function digest(value: string) { return hex(await crypto.subtle.digest('SHA-256', textEncoder.encode(value))); }
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return (!origin || origin === new URL(request.url).origin) && request.headers.get('sec-fetch-site') !== 'cross-site';
}
export async function verifyPassword(username: string, password: string) {
  const settings = process.env;
  const encoded = settings.DASHBOARD_PASSWORD_HASH;
  if (!settings.DASHBOARD_USERNAME || !encoded || !/^[a-f0-9]{32}:[a-f0-9]{64}$/.test(encoded)) throw new Error('Dashboard authentication is not configured');
  const [salt, expected] = encoded.split(':');
  const material = await crypto.subtle.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const derived = new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:fromHex(salt),iterations:100000}, material, 256));
  const stored = fromHex(expected);
  let mismatch = 0;
  for (let i=0;i<stored.length;i++) mismatch |= stored[i] ^ derived[i];
  return mismatch === 0 && username === settings.DASHBOARD_USERNAME;
}
export async function allowAttempt(request: Request, kind='login', limit=5) {
  const key = await digest(kind+':'+(request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown'));
  const now = Date.now();
  const row = await database().prepare('INSERT INTO login_limits (key, attempts, window_start) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = CASE WHEN login_limits.window_start < ? THEN 1 ELSE login_limits.attempts + 1 END, window_start = CASE WHEN login_limits.window_start < ? THEN excluded.window_start ELSE login_limits.window_start END RETURNING attempts').bind(key, now, now-900000, now-900000).first<{attempts:number}>();
  return (row?.attempts ?? limit+1) <= limit;
}
export async function createSession() {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const db = database();
  await db.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(Date.now()).run();
  await db.prepare('INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)').bind(await digest(token), Date.now()+sessionSeconds*1000).run();
  return `${sessionCookie}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${sessionSeconds}`;
}
export function requestToken(cookie: string | null) {
  const token = cookie?.split(';').map(v=>v.trim()).find(v=>v.startsWith(sessionCookie+'='))?.slice(sessionCookie.length+1);
  return token && /^[a-f0-9]{64}$/.test(token) ? token : null;
}
export async function hasAdminSession(request?: Request) {
  const cookie = request ? request.headers.get('cookie') : (await headers()).get('cookie');
  const token = requestToken(cookie);
  if (!token) return false;
  const row = await database().prepare('SELECT expires_at FROM admin_sessions WHERE token_hash = ? AND expires_at > ?').bind(await digest(token),Date.now()).first();
  return !!row;
}
export async function revokeSession(request: Request) {
  const token = requestToken(request.headers.get('cookie'));
  if(token) await database().prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(await digest(token)).run();
}
