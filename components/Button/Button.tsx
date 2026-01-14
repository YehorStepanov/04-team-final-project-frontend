import { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';

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
  return (
    <button
      type={type}
      {...rest}
      className={`${css?.[btnStyle]} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
