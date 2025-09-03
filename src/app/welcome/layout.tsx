import { ReactNode } from 'react';
import HeaderNoBreadcrumbs from '@/components/HeaderNoBreadcrumbs';

interface WelcomeLayoutProps {
  children: ReactNode;
}

export default function WelcomeLayout({ children }: WelcomeLayoutProps) {
  return (
    <>
      <HeaderNoBreadcrumbs />
      {children}
    </>
  );
}