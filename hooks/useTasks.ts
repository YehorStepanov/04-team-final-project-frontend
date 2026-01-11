import {
  fetchTasks,
  FetchTasksResponse,
  UpdateTaskStateRequest,
  updateTaskStatus,
} from '@/lib/api/clientApi';
import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useFetchTasks = () => {
  const {
    data: tasksResponse,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<FetchTasksResponse>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',
    retry: 1,
  });
  return { tasksResponse, isLoading, isSuccess, isError };
};

export const useTaskStatusUpdate = (queryClient: QueryClient) => {
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
