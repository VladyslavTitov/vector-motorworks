import { revokeSession, sessionCookie, sameOrigin } from '@/lib/admin-auth';
import { failure } from '@/lib/security';
export async function POST(request:Request){
  if(!sameOrigin(request))return Response.json({error:'This request could not be verified.'},{status:403});
  try{await revokeSession(request);return Response.json({ok:true},{headers:{'Set-Cookie':sessionCookie+'=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0','Cache-Control':'no-store'}});}catch(e){return failure(e);}
}
