import { z } from 'zod';
import { allowAttempt, createSession, sameOrigin, verifyPassword } from '@/lib/admin-auth';
import { failure } from '@/lib/security';
export async function POST(request: Request) {
  if(!sameOrigin(request))return Response.json({error:'This request could not be verified.'},{status:403});
  try {
    if(!await allowAttempt(request))return Response.json({error:'Too many login attempts. Please try again in 15 minutes.'},{status:429,headers:{'Retry-After':'900','Cache-Control':'no-store'}});
    if(Number(request.headers.get('content-length')||0)>2048)return Response.json({error:'Invalid login details.'},{status:400});
    const credentials=z.object({username:z.string().min(1).max(100),password:z.string().min(1).max(200)}).parse(await request.json());
    if(!await verifyPassword(credentials.username,credentials.password))return Response.json({error:'Incorrect username or password.'},{status:401,headers:{'Cache-Control':'no-store'}});
    return Response.json({ok:true},{headers:{'Set-Cookie':await createSession(),'Cache-Control':'no-store'}});
  }catch(e){if(e instanceof z.ZodError)return Response.json({error:'Enter your username and password.'},{status:400});return failure(e);}
}
