import { authorizeVisitor, failure } from '@/lib/security';
import { allowAttempt } from '@/lib/admin-auth';
import { storeImage } from '@/lib/images';
export async function POST(request:Request){const denied=await authorizeVisitor(request);if(denied)return denied;try{if(!await allowAttempt(request,'booking-upload',10))return Response.json({error:'Too many photo uploads. Please try again in 15 minutes.'},{status:429});return storeImage(request);}catch(e){return failure(e);}}
