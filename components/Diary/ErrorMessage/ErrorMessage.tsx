'use client';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
  handleReset?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message,
  handleReset,
  className,
}: ErrorMessageProps) {
  return (
    <div className={className}>
      <p className={css.text}>
        {message ? message : 'There was an error, please try again...'}
        {!!handleReset && (
          <button className={css.button} onClick={handleReset}>
            Try again
          </button>
        )}
      </p>
    </div>
  );
}
