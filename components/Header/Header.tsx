'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

import AuthBar from '../AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigator_header}>
          {/* LOGO */}
          <Link className={styles.logo_link} href="/">
            <svg className={styles.logo_header} width="105" height="45">
              <use href="#icon-logo" />
            </svg>
          </Link>

          {/* NAV */}
          <ul className={styles.desktop_nav}>
            <li
              className={clsx(
                styles.nav_item,
                pathname === '/' && styles.active,
              )}
            >
              <Link className={styles.nav_link} href="/">
                <svg width="24" height="24">
                  <use href="#icon-today" />
                </svg>
                Мій день
              </Link>
            </li>

            <li
              className={clsx(
                styles.nav_item,
                pathname.startsWith('/journey') && styles.active,
              )}
            >
              <Link className={styles.nav_link} href="/journey">
                <svg width="24" height="24">
                  <use href="#icon-conversion_path" />
                </svg>
                Подорож
              </Link>
            </li>

            <li
              className={clsx(
                styles.nav_item,
                pathname.startsWith('/diary') && styles.active,
              )}
            >
              <Link className={styles.nav_link} href="/diary">
                <svg width="24" height="24">
                  <use href="#icon-book_2" />
                </svg>
                Щоденник
              </Link>
            </li>

            <li
              className={clsx(
                styles.nav_item,
                pathname.startsWith('/profile') && styles.active,
              )}
            >
              <Link className={styles.nav_link} href="/profile">
                <svg width="24" height="24">
                  <use href="#icon-account_circle" />
                </svg>
                Профіль
              </Link>
            </li>
          </ul>

          {/* AUTH / USER */}
          <div className={styles.footer}>
            {user ? <UserBar /> : <AuthBar />}
          </div>

          {/* BURGER */}
          <div className={styles.menu_box}>
            <button
              onClick={() => setIsOpenModal((v) => !v)}
              className={styles.menu_mobile}
              aria-label="menu"
            >
              <svg width="32" height="32">
                <use href="#icon-menu" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {isOpenModal && <BurgerMenu onClose={() => setIsOpenModal(false)} />}
    </>
  );
}
