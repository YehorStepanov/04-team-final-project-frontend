import type { Metadata } from 'next';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { lato, comfortaa } from './fonts';
import { Toaster } from 'react-hot-toast';
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
