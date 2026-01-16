import type { Metadata } from 'next';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { lato, comfortaa } from './fonts';
import Sprite from '@/public/img/header/sprite';
import Toaster from '@/components/Toaster/Toaster';
import '@/lib/validation/yup';
export const metadata: Metadata = {
  title: 'Leleka',
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
          <Sprite />
          {children}
          <Toaster  />
        </TanStackProvider>
      </body>
    </html>
  );
}
