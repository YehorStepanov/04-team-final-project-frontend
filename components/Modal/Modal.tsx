'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, onSubmit, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        <button
          className={css.saveButton}
          onClick={onSubmit}
          aria-label="Close modal"
        >
          Save
        </button>
      </div>
    </div>,
    document.body,
  );
}
