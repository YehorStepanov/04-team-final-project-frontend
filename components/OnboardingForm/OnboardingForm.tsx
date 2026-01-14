'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { completeOnboarding } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { OnboardingFormValues } from '@/types/onboarding';
import styles from './OnboardingForm.module.css';

const validationSchema = Yup.object().shape({
  avatar: Yup.mixed<File>()
    .nullable()
    .test('fileSize', 'Файл занадто великий (макс. 5MB)', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Підтримуються тільки зображення', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type);
    }),
  dueDate: Yup.string()
    .required('Дата вагітності обов\'язкова')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата має бути у форматі YYYY-MM-DD')
    .test('validDate', 'Дата має бути від 1 тижня до 40 тижнів від сьогодні', (value) => {
      if (!value) return false;
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 7); // +1 week
      
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 7 * 40); // +40 weeks
      
      return date >= minDate && date <= maxDate;
    }),
  gender: Yup.string()
    .oneOf(['boy', 'girl', 'unknown', null], 'Оберіть стать дитини')
    .nullable(),
});

const initialValues: OnboardingFormValues = {
  avatar: null,
  dueDate: '',
  gender: 'unknown',
};

const genderOptions = [
  { value: '', label: 'Оберіть стать' },
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' }, // 'unknown' для UI, конвертується в null для API
];

export default function OnboardingForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (user) => {
      setUser(user);
      toast.success('Онбординг успішно завершено!');
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Помилка при збереженні даних');
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Давайте познаймимось ближче</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await mutation.mutateAsync(values);
          } catch (error) {
            // Помилка обробляється в onError
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={styles.form}>
            {/* Аватар секція */}
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                {values.avatar ? (
                  <img
                    src={URL.createObjectURL(values.avatar)}
                    alt="Avatar preview"
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.avatarIcon}
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label htmlFor="avatar" className={styles.uploadButton}>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    setFieldValue('avatar', file);
                  }}
                  className={styles.fileInput}
                />
                Завантажити фото
              </label>
              <ErrorMessage name="avatar" component="div" className={styles.error} />
            </div>

            {/* Поля форми */}
            <div className={styles.fields}>
              {/* Поле статі дитини */}
              <div className={styles.field}>
                <label htmlFor="gender" className={styles.label}>
                  Стать дитини
                </label>
                <Field
                  id="gender"
                  name="gender"
                  as="select"
                  className={styles.select}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="gender" component="div" className={styles.error} />
              </div>

              {/* Поле дати */}
              <div className={styles.field}>
                <label htmlFor="dueDate" className={styles.label}>
                  Планова дата пологів
                </label>
                <Field
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  className={styles.input}
                />
                <ErrorMessage name="dueDate" component="div" className={styles.error} />
              </div>
            </div>

            {/* Кнопка збереження */}
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className={styles.submitButton}
            >
              {isSubmitting || mutation.isPending ? 'Збереження...' : 'Зберегти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}