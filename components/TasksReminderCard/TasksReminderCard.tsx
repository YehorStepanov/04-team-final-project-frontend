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
import clsx from 'clsx';

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
  const { tasksResponse, isLoading, isSuccess, isError } = useFetchTasks(user);

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

  const isEmpty = !isLoading && (!hasTasks || !hasActiveTasks);

  const taskSections = [
    { title: 'Сьогодні', tasks: todaySorted, name: 'today-task' },
    { title: 'Найближчий тиждень', tasks: futureSorted, name: 'future-task' },
    { title: 'Попередні завдання', tasks: pastSorted, name: 'past-task' },
  ];

  const onCreateTaskClick = () => {
    if (user) {
      openAddTaskModal();
    } else {
      router.push('/sign-up');
    }
  };

  useEffect(() => {
    if (user && isError) {
      toast.error('Не вдалося завантажити завдання');
    }
  }, [isError, user]);

  //* Styles *//
  const cardClasses = clsx(
    'flex flex-col p-6 mx-auto w-full bg-[var(--color-scheme-foreground)] rounded-[32px]',
    'min-w-[311px] max-w-[335px]',

    !isEmpty && 'h-[688px]',

    'md:max-w-[704px]',
    !isEmpty && 'md:h-[671px]',

    'lg:w-[390px] lg:pt-6 lg:px-6 lg:pb-4',
    !isEmpty && 'lg:h-[499px]',

    !isEmpty &&
      page === 'dashboardPage' &&
      'h-[688px] md:h-[671px] lg:h-[499px]',
    !isEmpty && page === 'journeyPage' && 'h-[705px] md:h-[671px] lg:h-[499px]',

    isEmpty && 'h-[209px] lg:h-[499px]',
  );

  const tasksCardTitleClasses =
    '[font-family:var(--second-family)] text-xl font-bold leading-[1.4] tracking-[0.01em] [text-[var(--color-scheme-text)] lg:text-[1.5rem]';

  const tasksListCreateBtnClasses =
    'min-w-[173px] h-[42px]  [font-family:var(--font-family)] font-medium text-[0.875rem] leading-[1.6] [text-[var(--color-scheme-text)] md:min-w-[173px] lg:min-w-[191px] lg:h-[46px] lg:text-[1rem]';

  const tasksListCreateTitleClasses =
    'mb-1 [font-family:var(--font-family)] font-bold text-[0.875rem] leading-[1.6] text-(--color-scheme-text) lg:text-[1rem]';

  const tasksListCreateTextClasses =
    'mb-4 [font-family:var(--font-family)] font-normal text-[0.875rem] leading-6 text-(--color-scheme-text) lg:text-[1rem]';

  return (
    <section className={cardClasses}>
      <div className={'mb-4 flex justify-between items-center'}>
        <h2 className={tasksCardTitleClasses}>Важливі завдання</h2>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center group cursor-pointer"
          onClick={onCreateTaskClick}
        >
          <svg
            className="fill-current group-hover:fill-(--color-red)"
            width={24}
            height={24}
          >
            <use href="/img/tasksReminderCard/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>
      {/* isLoading */}
      {isLoading && <Loader />}

      {/* Tasks */}
      <div
        className={clsx(
          'flex flex-col gap-4',
          !isEmpty && `overflow-y-auto ${css.tasksScrollbar}`,
        )}
      >
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
        {isEmpty && (
          <div className="overflow-y-auto">
            <h3 className={tasksListCreateTitleClasses}>
              Наразі немає жодних завдань:
            </h3>
            <p className={tasksListCreateTextClasses}>
              Створіть мершій нове завдання!
            </p>
            <Button
              className={tasksListCreateBtnClasses}
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
