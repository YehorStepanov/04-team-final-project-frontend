'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDataByWeekNumber } from '@/lib/api/serverApi';
import { PregnancyWeek } from '@/types/week';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import css from './JourneyClient.module.css';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

interface Props {
  weekNumber: number;
}

function JourneyPageClient({ weekNumber }: Props) {
  const { data, isLoading } = useQuery<PregnancyWeek>({
    queryKey: ['week', weekNumber],
    queryFn: () => fetchDataByWeekNumber(weekNumber),
  });

  if (isLoading) return <p>Loading...</p>;

  const currentWeek: number = 5; /* тимчасово, треба Zustand */

  return (
    <div className={css.page}>
      <WeekSelector currentWeek={currentWeek} weekNumber={weekNumber} />
      {data?.mom.feelings.sensationDescr}

      <JourneyDetails weekNumber={weekNumber} />
      {/* {data && <JourneyDetails data={data} />} */}
    </div>
  );
}

export default JourneyPageClient;
