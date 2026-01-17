import React from 'react';
import styles from './GreetingBlock.module.css';

interface GreetingBlockProps {
  userName: string;
}

const GreetingBlock: React.FC<GreetingBlockProps> = ({ userName }) => {
  return (
    <div className={styles.greeting}>
      Вітаю, <span className={styles.name}>{userName}!</span>
    </div>
  );
};

export default GreetingBlock;