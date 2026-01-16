'use client';

import { useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import styles from './AddTaskModal.module.css';

interface Props {
  onClose: () => void;
}

export default function AddTaskModal({ onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} >
        <button className={styles.close} onClick={onClose} aria-label="Close modal">×</button>
        <h2 className={styles.title}>Нове завдання</h2>

        <AddTaskForm onSuccess={onClose} />
      </div>
    </div>
  );
}
