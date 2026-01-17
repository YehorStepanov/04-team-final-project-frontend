import styles from './page.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import DashboardPageClient from './DashboardPage.client';
import Header from '@/components/Header/Header';
import {
  fetchWeekDashboardServer,
  fetchCurrentWeekDashboardServer,
} from '@/lib/api/serverApi';
import { cookies } from 'next/headers';

async function DashboardPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();

  const isLoggedIn = cookieStore.has('accessToken');

  const queryFn = isLoggedIn
    ? fetchCurrentWeekDashboardServer
    : fetchWeekDashboardServer;

  await queryClient.prefetchQuery({
    queryKey: ['week'],
    queryFn: queryFn,
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DashboardPageClient isLoggedIn={isLoggedIn} />
          </HydrationBoundary>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
