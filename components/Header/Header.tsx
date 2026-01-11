import Link from 'next/link';
import styles from './Header.module.css';
export default function Header() {
  return (
    <header className={styles.header}>
      <h1>My App Header</h1>
      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li>
            <Link href="/">My_day</Link>
          </li>
          <li>Journey</li>
          <li>
            <Link href="/diary">Diary</Link>
          </li>
          <li>Profile</li>
          <li>
            <button>Exit</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
