import { Portfolio } from '@/components/workshop';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const metadata={title:'Repair portfolio',description:'Explore illustrative repair projects and workshop photo galleries.'};
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Portfolio data={data}/>:<Unavailable/>;}
