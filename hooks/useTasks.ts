import {
  fetchTasks,
  FetchTasksResponse,
  UpdateTaskStateRequest,
  updateTaskStatus,
} from '@/lib/api/clientApi';
import { User } from '@/types/user';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useFetchTasks = (user: User | null) => {
  const {
    data: tasksResponse,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<FetchTasksResponse>({
    queryKey: ['tasks', user?._id],
    queryFn: fetchTasks,
    enabled: Boolean(user?._id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',
    retry: 1,
  });
  return { tasksResponse, isLoading, isSuccess, isError };
};

export const useTaskStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ checked, id }: UpdateTaskStateRequest) =>
      updateTaskStatus({ checked, id }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      toast.success('Статус завдання успішно оновлено');
    },
    onError() {
      toast.error('Не вдалося оновити статус завдання');
    },
  });
};
