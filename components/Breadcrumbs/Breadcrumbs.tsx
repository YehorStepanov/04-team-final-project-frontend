'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const SEGMENT_LABELS: Record<string, string> = {
  diary: 'Щоденник',
  'my-day': 'Мій день',
  journey: 'Мій шлях',
  profile: 'Профіль',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = ['Лелека', ...segments.map(s => SEGMENT_LABELS[s] || s)];

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul>
        {crumbs.map((label, index) => {
          const isLast = index === crumbs.length - 1;

          const href =
            index === 0
              ? '/' 
              : '/' + segments.slice(0, index).join('/');

          return (
            <li key={label} className={styles.item}>
              {isLast ? (
                <span className={styles.current}>{label}</span>
              ) : (
                <>
                  <Link href={href || '/'} className={styles.link}>
                    {label}
                  </Link>
                  <span className={styles.separator}></span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
