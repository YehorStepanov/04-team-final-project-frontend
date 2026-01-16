'use client';

import css from './DiaryId.module.css';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchDiaryById } from '@/lib/api/clientApi';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/Diary/ErrorMessage/ErrorMessage';

export default function DiaryIdClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: diary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['diaries', id],
    queryFn: () => fetchDiaryById(id),
    refetchOnMount: false,
  });
  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message || 'Щось пішло не так'} />}
      {!!diary && (
        <div className={css.entryDetailsContainer}>
          <DiaryEntryDetails diary={diary} />
        </div>
      )}
    </div>
  );
}
