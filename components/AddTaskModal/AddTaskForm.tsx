'use client';

import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './AddTaskModal.module.css';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { createTask } from '@/lib/api/clientApi';

interface AddTaskFormProps {
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  date: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(96, 'Максимум 96 символів')
    .required('Введіть назву завдання'),
  date: Yup.date()
    .required('Оберіть дату')
    .min(today, 'Дата не може бути в минулому'),
});

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const initialValues: FormValues = {
    name: '',
    date: new Date().toISOString().split('T')[0],
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      await createTask(values);
      onSuccess();
    } catch {
      toast.error('Помилка створення завдання');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Назва завдання
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Дата
            <Field name="date" type="date" className={styles.input} />
            <ErrorMessage
              name="date"
              component="span"
              className={styles.error}
            />
          </label>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
