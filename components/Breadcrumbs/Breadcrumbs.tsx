'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') return null;

  const segments = pathname.split('/').filter(Boolean);

  const labelsMap: Record<string, string> = {
    diary: 'Щоденник',
    journey: 'Подорож',
    profile: 'Профіль',
    
  };

  const fullSegments = ['Лелека', ...segments.map(s => labelsMap[s] || s)];

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {fullSegments.map((label, index) => {
        const href = '/' + segments.slice(0, index).join('/'); // перший сегмент "Лелека" → '/'
        const isLast = index === fullSegments.length - 1;

        return (
          <span key={index} className={styles.item}>
            {isLast ? (
              <span className={styles.current}>{label}</span>
            ) : (
              <>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
                <span className={styles.separator}>{'>'}</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
