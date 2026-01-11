import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchDataByWeekNumber } from '@/lib/api/serverApi';
import axios from 'axios';
import JourneyPageClient from './JourneyClient.client';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

async function JourneyPage({ params }: Props) {
  await axios.post(
    'https://zero4-team-final-project-backend.onrender.com/api/auth/login',
    {
      email: 'testmax@mail.com',
      password: '12345678',
    },
    { withCredentials: true },
  );

  const resolvedParams = await params; // 👈 розгортаємо Promise
  const weekNumber = Number(resolvedParams.weekNumber);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['week', weekNumber],
    queryFn: () => fetchDataByWeekNumber(weekNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient weekNumber={weekNumber} />
    </HydrationBoundary>
  );
}
export default JourneyPage;
