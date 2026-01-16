import { QueryClient } from '@tanstack/react-query';
import DiaryIdClient from './DiaryId.client';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchServerDiaryById } from '@/lib/api/serverApi';
import { Metadata } from 'next';

interface DiaryIdProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DiaryIdProps): Promise<Metadata> {
  const { id } = await params;
  const diary = await fetchServerDiaryById(id);

  return {
    title: `Погляд на запис: ${diary.title}`,
    description: `${diary.description.length > 30 ? diary.description.slice(0, 30).concat('...') : diary.description}`,
  };
}

export default async function DiaryIdPage({ params }: DiaryIdProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary', id],
    queryFn: () => fetchServerDiaryById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryIdClient />
    </HydrationBoundary>
  );
}
