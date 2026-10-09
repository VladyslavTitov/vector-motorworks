import type { ComponentProps } from 'react';

// Full-document navigation preserves the private site's authentication flow
// and does not depend on client-side RSC transitions through the hosting proxy.
export default function SiteLink({ children, ...props }: ComponentProps<'a'>) {
  return <a {...props}>{children}</a>;
}
