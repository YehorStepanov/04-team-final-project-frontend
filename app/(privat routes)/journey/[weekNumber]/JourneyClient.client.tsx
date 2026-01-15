'use client';

import { useQuery } from '@tanstack/react-query';
import { PregnancyWeek } from '@/types/week';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import css from './JourneyClient.module.css';
import { fetchWeekClient } from '@/lib/api/clientApi';
import Image from 'next/image';

interface Props {
  weekNumber: number;
}

function JourneyPageClient({ weekNumber }: Props) {
  const { data, isLoading } = useQuery<PregnancyWeek>({
    queryKey: ['week', weekNumber],
    queryFn: () => fetchWeekClient(weekNumber),
  });

  if (isLoading) return <p>Loading...</p>;

  const currentWeek: number = 5; /* тимчасово, треба Zustand */

  return (
    <div className={css.page}>
      <WeekSelector currentWeek={currentWeek} weekNumber={weekNumber} />
      {data?.weekNumber}
      {data?.daysToBirth}
      {data?.mom.feelings.sensationDescr}
      <Image
        src={data!.baby!.image as string}
        alt="Baby photo"
        width={300}
        height={300}
      />
    </div>
  );
}

export default JourneyPageClient;
