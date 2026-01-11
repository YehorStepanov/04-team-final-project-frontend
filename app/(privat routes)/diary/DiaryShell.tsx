'use client';

import DiaryList from './DiaryList';
import styles from './DiaryShell.module.css';

export default function DiaryShell({
  hasEntryId,
  children,
}: {
  hasEntryId: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <aside
        className={`${styles.list} ${hasEntryId ? styles.hideOnMobile : ''}`}
      >
        <DiaryList />
      </aside>

      <main
        className={`${styles.details} ${!hasEntryId ? styles.hideOnMobile : ''}`}
      >
        {children}
      </main>
    </div>
  );
}
