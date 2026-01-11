import styles from './page.module.css';
import { lato } from './fonts';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={lato.className}>Home page. Welcome to Next.js App!</h1>
    </main>
  );
}
