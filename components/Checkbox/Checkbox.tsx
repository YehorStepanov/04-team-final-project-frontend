'use client';

import React from 'react';
import { UpdateTaskStateRequest } from '@/lib/api/clientApi';
import clsx from 'clsx';

export interface CheckboxProps {
  id: string;
  name?: string;
  label?: string;

  /** Controlled */
  checked?: boolean;

  /** Uncontrolled */
  defaultChecked?: boolean;

  disabled?: boolean;
  required?: boolean;

  onChange?: ({ checked, id }: UpdateTaskStateRequest) => void;

  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked = false,
  defaultChecked = false,
  disabled = false,
  required = false,
  onChange,
  className = '',
}) => {
  const isControlled = typeof checked === 'boolean';

  const checkboxContainerClasses = clsx(
    'mt-[3px] mr-2 inline-flex items-center justify-center flex-shrink-0',
    'w-[18px] h-[18px] rounded-[4px]',
    'bg-[var(--opacity-neutral-darkest-5)] border border-[var(--opacity-transparent)]',
    'transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'peer-checked:bg-[var(--color-neutral-darkest)] peer-checked:border-[var(--color-neutral-darkest)]',
    'peer-focus-visible:border-[var(--color-pastel-pink)]',
    'hover:border-[var(--color-neutral-darkest)]',
    '[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100',
  );

  const checkmarkClasses =
    'w-[14px] h-[11px] fill-[var(--color-white)] transition-opacity duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]';

  const labelTextClasses = clsx(
    'font-sans font-normal text-[0.75rem] leading-[1.6] text-[var(--color-scheme-text)]',
    'peer-checked:line-through',
    'transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]',
    disabled && 'cursor-not-allowed opacity-60',
    'break-words select-none',
    'md:text-[0.875rem] lg:text-[0.875rem] lg:leading-[1.6]',
  );

  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex items-start cursor-pointer select-none wrap-break-word leading-[1.6] group',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        className="sr-only peer"
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        required={required}
        aria-checked={isControlled ? checked : undefined}
        aria-disabled={disabled}
        aria-required={required}
        onChange={(e) =>
          onChange?.({
            id,
            checked: e.currentTarget.checked,
          })
        }
      />
      <span className={checkboxContainerClasses} aria-hidden="true">
        <svg className={checkmarkClasses} width="14" height="11">
          <use href="/img/tasksReminderCard/sprite.svg#icon-check-mark" />
        </svg>
      </span>
      {label && <span className={labelTextClasses}>{label}</span>}
    </label>
  );
};
