'use client';
import { useRouter } from 'next/navigation';
import css from './DiaryList.module.css';
import { Diary } from '@/types/diary';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import DiaryEmptyMessage from '../DiaryEmptyMessage/DiaryEmptyMessage';

interface DiaryListProps {
  diaries: Diary[];
  setSelectedDiaryIndex: (index: number) => void;
  isEmpty: boolean;
}

export default function DiaryList({
  diaries,
  setSelectedDiaryIndex,
  isEmpty,
}: DiaryListProps) {
  const router = useRouter();

  const handleNewEntryClick = (diary: Diary, index: number) => {
    const width = window.innerWidth;
    if (width < 1440) {
      return router.push(`/diary/${diary._id}`);
    }
    setSelectedDiaryIndex(index);
  };

  return (
    <div className={css.container}>
      <div className={css.listHeader}>
        <h2 className={css.listTitle}>Ваші записи</h2>
        <button className={css.newItemButton}>
          Новий запис
          <svg className={css.newItemSvgIcon} width="21" height="21">
            <use href="/img/sprite.svg#icon-plus"></use>
          </svg>
        </button>
      </div>
      <ul className={css.listContent}>
        {isEmpty ? (
          <DiaryEmptyMessage />
        ) : (
          diaries.map((diary: Diary, index: number) => (
            <DiaryEntryCard
              key={diary._id}
              diary={diary}
              onClick={() => handleNewEntryClick(diary, index)}
            />
          ))
        )}
      </ul>
    </div>
  );
}
