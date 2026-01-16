'use client';
import { getFormattedDate } from '@/app/helpers/utils';
import css from './DiaryEntryCard.module.css';
import { Diary } from '@/types/diary';

interface DiaryEntryCardProps {
  diary: Diary;
  onClick: (id: string) => void;
}

export default function DiaryEntryCard({
  diary,
  onClick,
}: DiaryEntryCardProps) {
  return (
    <li className={css.container}>
      <button className={css.button} onClick={() => onClick(diary._id)}>
        <div className={css.header}>
          <div className={css.title}>{diary.title}</div>
          <div className={css.date}>{getFormattedDate(diary.date)}</div>
        </div>
        {!!diary.emotions.length && (
          <ul className={css.labels}>
            {diary.emotions.map((emotion) => (
              <li className={css.label} key={emotion._id}>
                {emotion.title}
              </li>
            ))}
          </ul>
        )}
      </button>
    </li>
  );
}
