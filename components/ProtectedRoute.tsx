'use client';

import { ThemeProvider } from '@/app/ThemeProvider';
import { SessionProvider, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import BottomBar from './BottomBar';
import NavBar from './NavBar';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const unprotectedRoute = ['/register', '/login', '/forgot-password'];

  const isProtectedRoute = !unprotectedRoute.includes(usePathname());

  useSession({
    required: true,
    onUnauthenticated() {
      isProtectedRoute && redirect('/login');
    },
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isProtectedRoute && <NavBar />}
      {isProtectedRoute ? (
        <div className="mt-[10vh] pb-[10vh] lg:mt-[14vh] h-[85vh] overflow-scroll lg:overflow-auto lg:w-3/4 xl:w-4/5 lg:ml-auto">
          {children}
        </div>
      ) : (
        <div className="md:container md:h-screen md:mx-auto md:flex items-center justify-center">
          {children}
        </div>
      )}
      {isProtectedRoute && <BottomBar />}
    </ThemeProvider>
  );
};

export default ProtectedRoute;

