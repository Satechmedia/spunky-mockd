import ProtectedRoute from '@/components/ProtectedRoute';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

const inter = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpunkySDX',
  description: 'SpunkySDX Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-secondaryDark`}>
        <div className="text-primary">
          <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

