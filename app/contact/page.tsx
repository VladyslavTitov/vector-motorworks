import { Contact } from '@/components/workshop';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const metadata={title:'Contact',description:'Workshop contact details, opening hours and local area map.'};
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Contact data={data}/>:<Unavailable/>;}
