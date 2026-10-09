import { Booking } from '@/components/booking';
import { pageData } from '@/lib/page-data';
import { Unavailable } from '@/components/unavailable';
export const metadata={title:'Book a service',description:'Request an appointment for your vehicle, with your preferred date and service.'};
export const dynamic='force-dynamic';
export default async function Page(){const data=await pageData();return data?<Booking data={data}/>:<Unavailable/>;}
