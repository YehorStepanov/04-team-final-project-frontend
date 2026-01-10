'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser, updateUser } from '@/lib/api/clientApi';
import css from './ProfileEditForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(32, "Ім'я повинно містити максимум 32 символи"),
  email: Yup.string().email('Невірний формат email'),
  childGender: Yup.string().oneOf(['male', 'female', 'neutral']),
  expectedBirthDate: Yup.date().min(
    new Date(),
    'Дата народження повинна бути в майбутньому',
  ),
});

interface FormValues {
  name: string;
  email: string;
  childGender: 'male' | 'female' | 'neutral' | '';
  expectedBirthDate: string;
}

export default function ProfileEditForm() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [user, setUser]);

  const initialValues: FormValues = {
    name: user?.name || '',
    email: user?.email || '',
    childGender: (user?.gender as 'male' | 'female' | 'neutral') || '',
    expectedBirthDate: user?.dueDate || '',
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const updatedUser = await updateUser({
        name: values.name,
        email: values.email,
        gender: values.childGender,
        dueDate: values.expectedBirthDate,
      });
      setUser(updatedUser);
      console.log('User updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, resetForm }) => (
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
            />
            <ErrorMessage name="name" component="div" />
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
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className={css.field}>
            <label htmlFor="childGender" className={css.label}>
              Стать дитини
            </label>
            <Field
              as="select"
              id="childGender"
              name="childGender"
              className={css.input}
              placeholder="Виберіть стать"
            >
              <option value="neutral">Не визначено</option>
              <option value="male">Хлопчик</option>
              <option value="female">Дівчинка</option>
            </Field>
            <ErrorMessage name="childGender" component="div" />
          </div>

          <div className={css.field}>
            <label htmlFor="expectedBirthDate" className={css.label}>
              Планова дата пологів
            </label>
            <Field
              type="date"
              id="expectedBirthDate"
              name="expectedBirthDate"
              className={css.input}
            />
            <ErrorMessage name="expectedBirthDate" component="div" />
          </div>

          <div className={css.buttons_container}>
            <button
              type="button"
              className={css.button_cancel}
              onClick={() => resetForm()}
            >
              Відмінити зміни
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
