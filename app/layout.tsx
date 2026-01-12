import type { Metadata } from 'next';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import { lato, comfortaa } from './fonts';
import Sprite from '@/public/img/header/sprite';

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
        </TanStackProvider>
      </body>
    </html>
  );
}
