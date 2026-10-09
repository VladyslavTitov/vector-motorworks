import { env } from 'cloudflare:workers';
import { initialContent, SiteContent } from './content';
export function database(): D1Database { const db=(env as unknown as {DB:D1Database}).DB; if(!db) throw new Error('Database unavailable'); return db; }
export function bucket(): R2Bucket { const b=(env as unknown as {BUCKET:R2Bucket}).BUCKET; if(!b) throw new Error('Image storage unavailable'); return b; }
export async function readContent(): Promise<{data:SiteContent,version:number}> { const row=await database().prepare('SELECT document, version FROM content WHERE id = ?').bind('main').first<{document:string,version:number}>(); return row?{data:JSON.parse(row.document),version:row.version}:{data:initialContent,version:0}; }
