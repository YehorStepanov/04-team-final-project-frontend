'use client';

import css from './DiaryEntryDetails.module.css';
import { Diary } from '@/types/diary';
import { getFormattedDate } from '@/app/helpers/utils';

interface DiaryEntryDetailsProps {
  diary: Diary;
}

export default function DiaryEntryDetails({ diary }: DiaryEntryDetailsProps) {
  return (
    <>
      <div className={css.header}>
        <div className={css.title}>
          <h2 className={css.titleText}>{diary.title}</h2>
          <button className={css.editButton}>
            <svg className={css.editSvgIcon} width="21" height="21">
              <use href="/img/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>
        <div className={css.date}>
          <span className={css.dateText}>{getFormattedDate(diary.date)}</span>
          <button className={css.deleteButton}>
            <svg className={css.deleteSvgIcon} width="24" height="24">
              <use href="/img/sprite.svg#icon-delete"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.description}>
        <p>{diary.description}</p>
      </div>
      <div className={css.labels}>
        {diary.emotions.map((emotion) => (
          <span className={css.label} key={emotion._id}>
            {emotion.title}
          </span>
        ))}
      </div>
    </>
  );
}
