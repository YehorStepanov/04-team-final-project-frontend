'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser, updateUser } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import css from './ProfileEditForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(32, "Ім'я повинно містити максимум 32 символи"),
  email: Yup.string().email('Невірний формат email'),
  childGender: Yup.string().oneOf(['male', 'female', 'neutral']),
  dueDate: Yup.date().min(
    new Date(),
    'Дата народження повинна бути в майбутньому',
  ),
});

interface FormValues {
  name: string;
  email: string;
  childGender: 'male' | 'female' | 'neutral' | '';
  dueDate: string;
}

export default function ProfileEditForm() {
  const { user, setUser } = useAuthStore();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ( user) {
      setIsLoadingData(false);
    }
  }, [ user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [ user, setUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const initialValues: FormValues = {
    name: user?.name || '',
    email: user?.email || '',
    childGender: (user?.gender as 'male' | 'female' | 'neutral') || '',
    dueDate: user?.dueDate || '',
  };

  const handleSubmit = async (values: FormValues) => {
    if (!user) return;

    const updates: Partial<User> = {};
    if (values.name !== user.name) updates.name = values.name;
    if (values.email !== user.email) updates.email = values.email;
    if (values.childGender !== user.gender) updates.gender = values.childGender;
    if (values.dueDate !== user.dueDate) updates.dueDate = values.dueDate;

    if (Object.keys(updates).length === 0) {
      return;
    }

    try {
      const updatedUser = await updateUser(updates);
      setUser(updatedUser);
      console.log('User updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, resetForm, values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="name" className={css.label}>
              Ім&apos;я
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Ганна"
              className={css.input}
              disabled={isLoadingData}
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="email" className={css.label}>
              Пошта
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              className={css.input}
              disabled={isLoadingData}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="childGender" className={css.label}>
              Стать дитини
            </label>
            <div className={css.selectWrapper} ref={selectRef}>
              <div
                className={`${css.select} ${isSelectOpen ? css.selectOpen : ''} ${isLoadingData ? css.selectDisabled : ''}`}
                onClick={() => !isLoadingData && setIsSelectOpen(!isSelectOpen)}
              >
                <span className={css.selectValue}>
                  {isLoadingData ? (
                    'Завантаження...'
                  ) : (
                    <>
                      {values.childGender === 'neutral' && 'Не визначено'}
                      {values.childGender === 'male' && 'Хлопчик'}
                      {values.childGender === 'female' && 'Дівчинка'}
                      {!values.childGender && 'Оберіть стать'}
                    </>
                  )}
                </span>
                <span
                  className={`${css.arrow} ${isSelectOpen ? css.arrowOpen : ''}`}
                >
                  ▼
                </span>
              </div>
              {isSelectOpen && !isLoadingData && (
                <div className={css.optionsList}>
                  <div
                    className={css.option}
                    onClick={() => {
                      setFieldValue('childGender', 'neutral');
                      setIsSelectOpen(false);
                    }}
                  >
                    Не визначено
                  </div>
                  <div
                    className={css.option}
                    onClick={() => {
                      setFieldValue('childGender', 'male');
                      setIsSelectOpen(false);
                    }}
                  >
                    Хлопчик
                  </div>
                  <div
                    className={`${css.option} ${css.optionLast}`}
                    onClick={() => {
                      setFieldValue('childGender', 'female');
                      setIsSelectOpen(false);
                    }}
                  >
                    Дівчинка
                  </div>
                </div>
              )}
            </div>
            <ErrorMessage
              name="childGender"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="dueDate" className={css.label}>
              Планова дата пологів
            </label>
            <Field
              type="date"
              id="dueDate"
              name="dueDate"
              className={css.dateInput}
              disabled={isLoadingData}
            />
            <ErrorMessage
              name="dueDate"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.buttons_container}>
            <button
              type="button"
              className={css.button}
              onClick={() => resetForm()}
              disabled={isLoadingData}
            >
              Відмінити зміни
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingData}
              className={css.button + ' ' + css.button_save}
            >
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
