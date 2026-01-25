import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Task } from '@/types/task';
import { useState } from 'react';
import { UpdateTaskStateRequest } from '@/lib/api/clientApi';
import { useTaskStatusUpdate } from '@/hooks/useTasks';

interface TasksListProps {
  tasks: Task[];
  title: string;
  name: string;
}

const TasksList = ({ tasks, title, name }: TasksListProps) => {
  const updateTaskMutation = useTaskStatusUpdate();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleChangeStatus = ({ checked, id }: UpdateTaskStateRequest) => {
    setUpdatingId(id);
    updateTaskMutation.mutate(
      { checked, id },
      { onSettled: () => setUpdatingId(null) },
    );
  };

  const taskListTitleClasses =
    'mb-1 [font-family:var(--font-family)] font-bold text-[0.875rem] leading-[1.6] [text-[var(--color-scheme-text)] lg:text-[1rem]';
  const taskDateClasses =
    'ml-6.5 [font-family:var(--font-family)] text-[0.625rem] leading-[1.6] color: var(--color-neutral-darkest) lg:text-[0.75rem]';

  return (
    <div>
      <h3 className={taskListTitleClasses}>{title}</h3>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex flex-col">
            <span className={taskDateClasses}>{task.date}</span>
            <Checkbox
              id={task._id}
              name={name}
              label={task.name}
              checked={task.isDone}
              disabled={updateTaskMutation.isPending && updatingId === task._id}
              onChange={handleChangeStatus}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
