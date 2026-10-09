import { Home } from '@/components/workshop';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Home data={data}/>:<Unavailable/>;}
