'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export default function Header() {
  const pathname = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigator_header}>
          <Link className={styles.logo_link} href="/">
            <svg className={styles.logo_header} width="105" height="45">
              <use href="#icon-logo"></use>
            </svg>
            </Link>
          <ul className={styles.desktop_nav}>
            <li
              className={clsx(styles.nav_item, {
                [styles.active]: pathname === '/',
              })}
            >
              <Link className={styles.nav_link_modal} href="/">
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
              <Link className={styles.nav_link_modal} href="/journey">
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
              <Link className={styles.nav_link_modal} href="/diary">
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
              <Link className={styles.nav_link_modal} href="/profile">
                <svg width="24" height="24">
                  <use href="#icon-account_circle"></use>
                </svg>
                Профіль
              </Link>
            </li>
            <li className={clsx(styles.nav_item)}>
              <Link className={styles.nav_link_modal} href="/sign-up">
                <svg width="24" height="24">
                  <use href="#icon-account_circle"></use>
                </svg>
                Зареєстуватись
              </Link>
            </li>
            <li className={clsx(styles.nav_item)}>
              <Link className={styles.nav_link_modal} href="/sign-in">
                <svg width="24" height="24">
                  <use href="#icon-account_circle"></use>
                </svg>
                Увійти
              </Link>
            </li>
          </ul>
          <div className={styles.menu_box}>
            <button
              onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
              type="button"
              className={styles.menu_mobile}
              aria-label="menu button"
            >
              <svg width="32" height="32">
                <use href="#icon-menu"></use>
              </svg>
            </button>
          </div>
        </nav>
      </header>
      {isOpenModal && <BurgerMenu onClose={() => setIsOpenModal(false)} />}
    </>
  );
}
