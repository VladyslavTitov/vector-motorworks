import { neon } from '@neondatabase/serverless';
import { initialContent, SiteContent } from './content';
function client() {
  if (!process.env.DATABASE_URL) throw new Error('Database unavailable');
  return neon(process.env.DATABASE_URL);
}
let initialization: Promise<unknown> | undefined;
async function ready() {
  if (!initialization) initialization = client().transaction([
    client().query('SELECT pg_advisory_xact_lock(84720591)'),
    client().query('CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, document TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 0)'),
    client().query('CREATE TABLE IF NOT EXISTS appointments (id TEXT PRIMARY KEY, data TEXT NOT NULL, created_at TEXT NOT NULL, status TEXT NOT NULL)'),
    client().query('CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at BIGINT NOT NULL)'),
    client().query('CREATE TABLE IF NOT EXISTS login_limits (key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, window_start BIGINT NOT NULL)'),
  ]).catch(error => { initialization = undefined; throw error; });
  await initialization;
}
export function database() {
  return { prepare(sql: string) {
    let values: unknown[] = [];
    let index = 0;
    const statement = sql.replace(/\?/g, () => '$'+(++index));
    async function execute() { await ready(); return client().query(statement, values, {fullResults:true}); }
    const query = {
      bind(...args: unknown[]) { values=args; return query; },
      async first<T = Record<string, unknown>>(): Promise<T | null> { const result=await execute(); return (result.rows[0] as T) ?? null; },
      async all() { const result=await execute(); return {results:result.rows as Record<string, unknown>[]}; },
      async run() { const result=await execute(); return {meta:{changes:result.rowCount}}; },
    };
    return query;
  }};
}
export async function readContent(): Promise<{data:SiteContent,version:number}> {
  const row=await database().prepare('SELECT document, version FROM content WHERE id = ?').bind('main').first<{document:string,version:number}>();
  return row ? {data:JSON.parse(row.document),version:row.version} : {data:initialContent,version:0};
}
