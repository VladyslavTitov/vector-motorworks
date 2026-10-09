import { hasAdminSession, sameOrigin } from './admin-auth';
export async function authorize(request:Request) {
  if(!sameOrigin(request))return Response.json({error:'This request could not be verified.'},{status:403});
  if(!await hasAdminSession(request))return Response.json({error:'Your dashboard session has expired. Log in again.'},{status:401,headers:{'Cache-Control':'no-store'}});
  return null;
}
export async function authorizeVisitor(request:Request) {
  if(!sameOrigin(request))return Response.json({error:'This request could not be verified.'},{status:403});
  return null;
}
export function failure(e:unknown) { console.error('Workshop request failed',e); return Response.json({error:'We could not complete this request. Please try again.'},{status:503}); }
