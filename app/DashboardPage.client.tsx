'use client';

import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import Loader from '@/components/Loader/Loader';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import { useQuery } from '@tanstack/react-query';
import css from './DashboardPage.module.css';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import {
  fetchCurrentWeekDashboardClient,
  fetchWeekDashboardClient,
} from '@/lib/api/clientApi';

interface DashboardPageClientProps {
  isLoggedIn: boolean;
}

function DashboardPageClient({ isLoggedIn }: DashboardPageClientProps) {
  const apiFunction = isLoggedIn
    ? fetchCurrentWeekDashboardClient
    : fetchWeekDashboardClient;

  const { data, isError, isLoading } = useQuery({
    queryKey: ['week'],
    queryFn: apiFunction,
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
