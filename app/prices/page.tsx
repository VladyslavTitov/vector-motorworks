import { Prices } from '@/components/workshop';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const metadata={title:'Price list',description:'View starting service prices and what is included. Filter by service category.'};
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Prices data={data}/>:<Unavailable/>;}
