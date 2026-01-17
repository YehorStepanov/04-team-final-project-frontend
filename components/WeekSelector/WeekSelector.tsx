'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import css from './WeekSelector.module.css';
import { useJourneyStore } from '@/lib/store/journeyStore';

const WeekSelector = ({ weekNumber }: { weekNumber: number }) => {
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWeek = useJourneyStore((s) => s.currentWeek);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (activeRef.current && !isDragging) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [weekNumber, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <nav
      ref={containerRef}
      className={`${css.week_selector_container} ${isDragging ? css.dragging : ''}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      {weeks.map((num) => {
        const isFuture = currentWeek ? num > currentWeek : false;
        const isSelected = num === weekNumber;

        return (
          <Link
            key={num}
            href={isFuture ? '#' : `/journey/${num}`}
            ref={isSelected ? activeRef : null}
            onClick={(e) => {
              if (isDragging || isFuture) e.preventDefault();
            }}
            draggable={false}
            className={`
        ${css.week_item} 
        ${isSelected ? css.active : ''} 
        ${isFuture ? css.disabled : ''}
      `}
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
