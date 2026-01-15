'use client';

import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import Loader from '@/components/Loader/Loader';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import { fetchWeek } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import css from './DashboardPage.module.css';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';

function DashboardPageClient() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['week'],
    queryFn: fetchWeek,
  });

  console.log(data);
  if (isLoading) return <Loader />;
  if (isError || !data) return null;

  return (
    <>
      <div className={css.blockWrapper}>
        <div className={css.firstBlock}>
          <StatusBlock
            weekNumber={data.weekNumber}
            dayToBirth={data.daysToBirth}
          />
          <BabyTodayCard baby={data.baby} />
          <MomTipCard mom={data.mom} />
        </div>
        <div className={css.secondBlock}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </>
  );
}

export default DashboardPageClient;
