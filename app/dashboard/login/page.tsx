import {redirect} from 'next/navigation';
import {hasAdminSession} from '@/lib/admin-auth';
import {AdminLogin} from '@/components/admin-login';
export const dynamic='force-dynamic';
export const metadata={title:'Dashboard login',robots:{index:false,follow:false}};
export default async function Page(){if(await hasAdminSession())redirect('/dashboard');return <AdminLogin/>;}
