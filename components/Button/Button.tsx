import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  btnStyle?: 'btnPrimary' | 'btnSecondary';
  children: ReactNode;
}

const Button = ({
  type = 'button',
  children,
  className,
  btnStyle = 'btnPrimary',
  ...rest
}: ButtonProps) => {
  const btnStyleClasses = clsx(
    btnStyle === 'btnPrimary' &&
      `block text-[var(--color-scheme-text)]
    bg-[var(--color-scheme-foreground-alt)]
    border-b-4 border-[var(--color-scheme-accent)]
    rounded-[100px]
    cursor-pointer

    transition-all
    duration-250
    ease-[cubic-bezier(0.4,0,0.2,1)]

    hover:bg-[var(--color-scheme-background)]
    hover:border-[var(--color-scheme-border)]

    focus:bg-[var(--color-scheme-background)]
    focus:border-[var(--color-scheme-border)]

    active:bg-[var(--color-neutral-light)]
    active:border-b-0

    disabled:bg-[var(--color-scheme-foreground-alt)]
    disabled:opacity-30
    disabled:border-b-4
    disabled:border-[var(--color-scheme-accent)]
  `,
  );
  return (
    <button
      type={type}
      {...rest}
      className={`${[btnStyleClasses]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
