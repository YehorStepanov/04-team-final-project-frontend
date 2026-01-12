'use client';

import styles from './BurgerMenu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface BurgerMenuProps {
  onClose: () => void;
}

export default function BurgerMenu({ onClose }: BurgerMenuProps) {
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);
  return (
    <div onClick={handleBackdropClick} className={styles.backdrop}>
      <nav className={styles.navigator_header}>
        <div className={styles.menu_box}>
          <Link className={styles.logo_link} href="/" onClick={handleClose}>
            <svg className={styles.logo_header} width="105" height="45">
              <use href="#icon-logo"></use>
            </svg>
            </Link>
          <button
            onClick={handleClose}
            type="button"
            className={styles.menu_mobile}
            aria-label="menu button"
          >
            <svg width="32" height="32">
              <use href="#icon-close"></use>
            </svg>
          </button>
        </div>
        <ul className={styles.desktop_nav}>
          <li
            className={clsx(styles.nav_item, {
              [styles.active]: pathname === '/',
            })}
          >
            <Link className={styles.nav_link_modal} href="/" onClick={handleClose}>
              <svg width="24" height="24">
                <use href="#icon-today"></use>
              </svg>
              Мій день
            </Link>
          </li>
          <li
            className={clsx(styles.nav_item, {
              [styles.active]: pathname.startsWith('/journey'),
            })}
          >
            <Link className={styles.nav_link_modal} href="/journey" onClick={handleClose}>
              <svg width="24" height="24">
                <use href="#icon-conversion_path"></use>
              </svg>
              Подорож
            </Link>
          </li>
          <li
            className={clsx(styles.nav_item, {
              [styles.active]: pathname.startsWith('/diary'),
            })}
          >
            <Link className={styles.nav_link_modal} href="/diary" onClick={handleClose}>
              <svg width="24" height="24">
                <use href="#icon-book_2"></use>
              </svg>
              Щоденник
            </Link>
          </li>
          <li
            className={clsx(styles.nav_item, {
              [styles.active]: pathname.startsWith('/profile'),
            })}
          >
            <Link className={styles.nav_link_modal} href="/profile" onClick={handleClose}>
              <svg width="24" height="24">
                <use href="#icon-account_circle"></use>
              </svg>
              Профіль
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
