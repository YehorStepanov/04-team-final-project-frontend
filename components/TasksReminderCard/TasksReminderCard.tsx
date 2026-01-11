'use client';

import css from './TasksReminderCard.module.css';
import { useEffect, useMemo } from 'react';
import { TasksGroup } from '../../types/task';
import { groupTasks, sortByDate } from './utils/tasks';
import { useFetchTasks } from '@/hooks/useTasks';
import Loader from '../Loader/Loader';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import TasksList from './components/TasksList/TasksList';
import Button from '../Button/Button';

interface TasksReminderCardProps {
  page: 'dashboardPage' | 'journeyPage';
}

const TasksReminderCard = ({
  page = 'dashboardPage',
}: TasksReminderCardProps) => {
  const user = useAuthStore((state) => state.user);
  const { tasksResponse, isLoading, isSuccess, isError } = useFetchTasks();

  const { past, today, future } = useMemo<TasksGroup>(() => {
    if (!isSuccess || !tasksResponse) {
      return { past: [], today: [], future: [] };
    }

    return groupTasks(tasksResponse.data);
  }, [isSuccess, tasksResponse]);

  const pastSorted = useMemo(() => past.toSorted(sortByDate('desc')), [past]);
  const todaySorted = useMemo(
    () => today.toSorted(sortByDate('desc')),
    [today],
  );
  const futureSorted = useMemo(
    () => future.toSorted(sortByDate('asc')),
    [future],
  );

  const hasTasks = past.length > 0 || today.length > 0 || future.length > 0;

  useEffect(() => {
    if (user && isError) {
      toast.error('Не вдалося завантажити завдання');
    }
  }, [isError, user]);

  return (
    <section className={`${css.tasksCard} ${css?.[page]} `}>
      <div className={css.tasksCardHeader}>
        <h2 className={css.tasksCardTitle}>Важливі завдання</h2>
        <button type="button" className={css.tasksCardAddBtn}>
          <svg className={css.checkmark} width={24} height={24}>
            <use href="img/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>
      {/* isLoading */}
      {isLoading && <Loader />}

      {/* Tasks */}
      <div className={`${css.tasksLists} ${!hasTasks ? css.empty : ''}`}>
        {isSuccess && hasTasks && (
          <>
            {/* Today tasks */}
            {todaySorted.length > 0 && (
              <TasksList
                tasks={todaySorted}
                title="Сьогодні"
                name="today-task"
              />
            )}

            {/* Future tasks */}
            {futureSorted.length > 0 && (
              <TasksList
                tasks={futureSorted}
                title="Найближчий тиждень"
                name="future-task"
              />
            )}

            {/* Past tasks */}
            {pastSorted.length > 0 && (
              <TasksList
                tasks={pastSorted}
                title="Попередні завдання"
                name="past-task"
              />
            )}
          </>
        )}
        {/* Create tasks */}
        {!isLoading && !hasTasks && (
          <div className={css.tasksListCreateContainer}>
            <h3 className={css.tasksListCreateTitle}>
              Наразі немає жодних завдань:
            </h3>
            <p className={css.tasksListCreateText}>
              Створіть мершій нове завдання!
            </p>
            <Button className={css.tasksListCreateBtn} btnStyle="btnPrimary">
              Створити завдання
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksReminderCard;
