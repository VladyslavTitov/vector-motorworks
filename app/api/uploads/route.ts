import { authorize } from '@/lib/security';
import { storeImage } from '@/lib/images';
export async function POST(request:Request){const denied=await authorize(request);if(denied)return denied;return storeImage(request);}
