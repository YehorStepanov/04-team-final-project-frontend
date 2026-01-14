'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        const label =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={href}>
            {isLast ? (
              <span className={styles.current}>{label}</span>
            ) : (
              <>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
                <span className={styles.separator}> / </span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
