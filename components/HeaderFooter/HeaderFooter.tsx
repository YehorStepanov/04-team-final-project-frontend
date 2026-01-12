import Link from 'next/link';
import styles from './HeaderFooter.module.css';

export default function HeaderFooter() {
  return <div className={styles.boxFooter}>
    <Link href="/sign-up" className={styles.signUpLinkFooter}>Зареєстуватись</Link>
    <Link href="/sign-in" className={styles.signInLinkFooter}>Увійти</Link>
  </div>;
}