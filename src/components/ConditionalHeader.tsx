'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import HeaderNoBreadcrumbs from './HeaderNoBreadcrumbs';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Use HeaderNoBreadcrumbs for welcome page
  if (pathname === '/welcome') {
    return <HeaderNoBreadcrumbs />;
  }
  
  // Use regular Header for all other pages
  return <Header />;
}