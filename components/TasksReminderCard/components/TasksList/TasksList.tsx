import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Task } from '@/types/task';
import css from '../../TasksReminderCard.module.css';
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

  return (
    <div className={css.tasksListContainer}>
      <h3 className={css.tasksListTitle}>{title}</h3>
      <ul className={css.tasksList}>
        {tasks.map((task) => (
          <li key={task._id} className={css.taskItem}>
            <span className={css.taskDate}>{task.date}</span>
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
