import styles from './page.module.css';
import { lato } from './fonts';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <h1 className={lato.className}>Welcome to My Next.js App!</h1> */}
      <TasksReminderCard />
    </main>
  );
}
