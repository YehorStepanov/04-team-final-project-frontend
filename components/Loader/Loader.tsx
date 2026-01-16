import css from './Loader.module.css';
import clsx from 'clsx';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <p className={clsx(css.text, className)}>Loading data, please wait...</p>
  );
}
