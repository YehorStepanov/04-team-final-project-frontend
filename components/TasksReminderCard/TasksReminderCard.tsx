'use client';

import css from './TasksReminderCard.module.css';
import { useEffect, useMemo } from 'react';
import { groupTasks, sortByDate } from './utils/tasks';
import { useFetchTasks } from '@/hooks/useTasks';
import Loader from '../Loader/Loader';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import TasksList from './components/TasksList/TasksList';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

interface TasksReminderCardProps {
  page: 'dashboardPage' | 'journeyPage';
  openAddTaskModal: () => void;
}

const TasksReminderCard = ({
  page = 'dashboardPage',
  openAddTaskModal,
}: TasksReminderCardProps) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { tasksResponse, isLoading, isSuccess, isError } = useFetchTasks();

  const { pastSorted, todaySorted, futureSorted } = useMemo(() => {
    if (!isSuccess || !tasksResponse) {
      return { pastSorted: [], todaySorted: [], futureSorted: [] };
    }

    const { past, today, future } = groupTasks(tasksResponse.data);

    return {
      pastSorted: past.toSorted(sortByDate('desc')),
      todaySorted: today.toSorted(sortByDate('desc')),
      futureSorted: future.toSorted(sortByDate('asc')),
    };
  }, [isSuccess, tasksResponse]);

  const hasTasks =
    pastSorted.length > 0 || todaySorted.length > 0 || futureSorted.length > 0;

  const hasActiveTasks =
    pastSorted.some((task) => !task.isDone) ||
    todaySorted.some((task) => !task.isDone) ||
    futureSorted.some((task) => !task.isDone);

  const showEmptyState = !isLoading && (!hasTasks || !hasActiveTasks);

  const taskSections = [
    { title: 'Сьогодні', tasks: todaySorted, name: 'today-task' },
    { title: 'Найближчий тиждень', tasks: futureSorted, name: 'future-task' },
    { title: 'Попередні завдання', tasks: pastSorted, name: 'past-task' },
  ];

  const onCreateTaskClick = () => {
    if (user) {
      openAddTaskModal();
    } else {
      router.push('/auth/register');
    }
  };

  useEffect(() => {
    if (user && isError) {
      toast.error('Не вдалося завантажити завдання');
    }
  }, [isError, user]);

  return (
    <section className={`${css.tasksCard} ${css?.[page]} `}>
      <div className={css.tasksCardHeader}>
        <h2 className={css.tasksCardTitle}>Важливі завдання</h2>
        <button
          type="button"
          className={css.tasksCardAddBtn}
          onClick={onCreateTaskClick}
        >
          <svg className={css.checkmark} width={24} height={24}>
            <use href="/img/tasksReminderCard/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>
      {/* isLoading */}
      {isLoading && <Loader />}

      {/* Tasks */}
      <div className={`${css.tasksLists} ${showEmptyState ? css.empty : ''}`}>
        {isSuccess &&
          hasTasks &&
          taskSections.map(
            (section) =>
              section.tasks.length > 0 && (
                <TasksList
                  key={section.name}
                  tasks={section.tasks}
                  title={section.title}
                  name={section.name}
                />
              ),
          )}

        {/* Create tasks */}
        {showEmptyState && (
          <div className={css.tasksListCreateContainer}>
            <h3 className={css.tasksListCreateTitle}>
              Наразі немає жодних завдань:
            </h3>
            <p className={css.tasksListCreateText}>
              Створіть мершій нове завдання!
            </p>
            <Button
              className={css.tasksListCreateBtn}
              btnStyle="btnPrimary"
              onClick={onCreateTaskClick}
            >
              Створити завдання
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksReminderCard;
