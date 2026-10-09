import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'Vector Motorworks | Care for every mile.',template:'%s | Vector Motorworks'},description:'Independent vehicle servicing, diagnostics and repair. Explore transparent starting prices, repair projects and request an appointment.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
