import { readContent } from './storage';
export async function pageData(){try{return (await readContent()).data;}catch(e){console.error('Content unavailable',e);return null;}}
