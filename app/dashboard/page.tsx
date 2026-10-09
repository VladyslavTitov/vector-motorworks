import {redirect} from 'next/navigation';
import {hasAdminSession} from '@/lib/admin-auth';
import {readContent} from '@/lib/storage';
import {Dashboard} from '@/components/dashboard';
import {Unavailable} from '@/components/unavailable';
export const metadata={title:'Workshop dashboard',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function Page(){if(!await hasAdminSession())redirect('/dashboard/login');try{const {data,version}=await readContent();return <Dashboard initial={data} initialVersion={version}/>;}catch{return <Unavailable/>;}}
