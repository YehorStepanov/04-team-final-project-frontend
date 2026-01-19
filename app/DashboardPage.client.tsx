'use client';

import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import Loader from '@/components/Loader/Loader';
import { MomTipCard } from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import { useQuery } from '@tanstack/react-query';
import css from './DashboardPage.module.css';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import {
  fetchCurrentWeekDashboardClient,
  fetchWeekDashboardClient,
} from '@/lib/api/clientApi';

import { useEffect, useState } from 'react';
import { useJourneyStore } from '@/lib/store/journeyStore';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';

interface DashboardPageClientProps {
  isLoggedIn: boolean;
}

function DashboardPageClient({ isLoggedIn }: DashboardPageClientProps) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const apiFunction = isLoggedIn
    ? fetchCurrentWeekDashboardClient
    : fetchWeekDashboardClient;

  const { data, isError, isLoading } = useQuery({
    queryKey: ['week'],
    queryFn: apiFunction,
  });

  const setCurrentWeek = useJourneyStore((s) => s.setCurrentWeek);

  useEffect(() => {
    if (data?.weekNumber) {
      setCurrentWeek(data.weekNumber);
    }
  }, [data, setCurrentWeek]);

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
          <TasksReminderCard
            page="dashboardPage"
            openAddTaskModal={openAddTaskModal}
          />
          <FeelingCheckCard />

          {isAddTaskModalOpen && <AddTaskModal onClose={closeAddTaskModal} />}
        </div>
      </div>
    </>
  );
}

export default DashboardPageClient;
