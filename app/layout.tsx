import type { Metadata } from 'next';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { lato, comfortaa } from './fonts';
import Sprite from '@/public/img/header/sprite';
import Toaster from '@/components/Toaster/Toaster';
import '@/lib/validation/yup';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
export const metadata: Metadata = {
  title: 'Leleka',
  icons: {
    icon: '/favicon.svg',
  },

  description: 'Site for moms and dads about pregnancy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} ${comfortaa.className}`}>
        <TanStackProvider>
          <AuthProvider>
            <Sprite />
            {children}
            <Toaster />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
