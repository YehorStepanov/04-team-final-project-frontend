'use client';
import { motion } from 'framer-motion';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import css from './WeekSelector.module.css';

const WeekSelector = ({
  currentWeek,
  weekNumber,
}: {
  currentWeek: number;
  weekNumber: number;
}) => {
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentWeek]);

  return (
    <nav className={css.week_selector_container}>
      {weeks.map((num) => {
        const isFuture = num > currentWeek;
        const isSelected = num === weekNumber;

        return (
          <Link
            key={num}
            href={isFuture ? '#' : `/journey/${num}`}
            className={`
        ${css.week_item} 
        ${isSelected ? css.active : ''} 
        ${isFuture ? css.disabled : ''}
      `}
            onClick={(e) => isFuture && e.preventDefault()}
          >
            <span className={css.week_number}>{num}</span>
            <span className={css.week_label}>Тиждень</span>

            {isSelected && (
              <motion.div
                layoutId="active-highlight"
                className={css.active_pill}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
export default WeekSelector;
