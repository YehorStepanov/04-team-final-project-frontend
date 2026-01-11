import { Task, TasksGroup } from '../../../types/task';

export const sortByDate = (a: Task, b: Task) => a.date.localeCompare(b.date);

export const groupTasks = (tasks: Task[]): TasksGroup => {
  const today = new Date().toISOString().split('T')[0];

  return tasks.reduce<TasksGroup>(
    (acc, task) => {
      if (task.date < today) {
        acc.past.push(task);
      } else if (task.date === today) {
        acc.today.push(task);
      } else {
        acc.future.push(task);
      }
      return acc;
    },
    {
      past: [],
      today: [],
      future: [],
    },
  );
};
