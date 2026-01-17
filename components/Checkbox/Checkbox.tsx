'use client';

import React from 'react';
import css from './Checkbox.module.css';
import { UpdateTaskStateRequest } from '@/lib/api/clientApi';

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

  return (
    <label
      htmlFor={id}
      className={`${css.label} ${disabled ? css.disabled : ''} ${className}`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        className={css.checkbox}
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
      <span className={css.checkboxContainer} aria-hidden="true">
        <svg className={css.checkmark} width="14" height="11">
          <use href="/img/tasksReminderCard/sprite.svg#icon-check-mark" />
        </svg>
      </span>
      {label && <span className={css.labelText}>{label}</span>}
    </label>
  );
};
