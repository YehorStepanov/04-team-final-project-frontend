'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number | string;
  maxWidth?: number | string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width,
  maxWidth = 'min(92vw, 640px)',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Dialog'}
    >
      <div className={css.modal} style={{ width, maxWidth }}>
        <div className={css.header}>
          <h2 className={css.title}>{title ?? ''}</h2>

          <button
            type="button"
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
