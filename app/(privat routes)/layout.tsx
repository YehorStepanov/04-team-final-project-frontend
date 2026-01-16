import Header from '@/components/Header/Header';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main >
        <Breadcrumbs />
         {children}
      </main>
    </>
  );
}
