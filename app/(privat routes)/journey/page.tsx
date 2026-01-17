import { fetchCurrentWeekJourneyServer } from '@/lib/api/serverApi';
import { Week } from '@/types/week';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function JourneyPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['journey'],
    queryFn: () => fetchCurrentWeekJourneyServer(),
  });

  const data = queryClient.getQueryData<Week>(['journey']);
  if (!data) {
    return null;
  }

  const weekNumber = data.weekNumber;
  redirect(`/journey/${weekNumber}`);

  return null;
}
