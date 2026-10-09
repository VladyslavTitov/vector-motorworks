import { Services } from '@/components/workshop';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const metadata={title:'Services',description:'Explore servicing, diagnostics, brakes, engine repair and EV vehicle care.'};
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Services data={data}/>:<Unavailable/>;}
