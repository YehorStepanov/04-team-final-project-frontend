import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchWeekServer } from '@/lib/api/serverApi';
import JourneyPageClient from './JourneyClient.client';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

async function JourneyPage({ params }: Props) {
  const resolvedParams = await params;
  const weekNumber = Number(resolvedParams.weekNumber);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['week', weekNumber],
    queryFn: () => fetchWeekServer(weekNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient weekNumber={weekNumber} />
    </HydrationBoundary>
  );
}
export default JourneyPage;
