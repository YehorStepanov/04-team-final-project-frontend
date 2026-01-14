'use client';

import css from './signUpForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Types
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

// Initial values
const initialValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
};

// Validation schema
const SignUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, 'Імʼя має бути коротшим за 32 символи')
    .required("Імʼя обов'язкове"),
  email: Yup.string()
    .max(64, 'Пошта має бути коротшою за 64 символи')
    .email('Невірний формат email')
    .required("Пошта обов'язкова"),
  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(128, 'Занадто великий пароль')
    .required("Пароль обов'язковий"),
});

// Component
export default function SignUpForm() {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const handleSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ) => {
    try {
      toast.info('Регистрация...');
      await register(values);
      toast.info('регистрация успешна!');
      actions.resetForm();
      router.push('/profile/edit');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Невідома помилка');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <Link className={css.logo} href="/">
        <svg className="logo-icon" width="30" height="30">
          <use href="/img/logo/sprite.svg#icon-logo"></use>
        </svg>
        <svg className="stork-icon" width="61" height="13">
          <use href="/img/logo/sprite.svg#icon-stork"></use>
        </svg>
      </Link>

      <div className={css.content}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={css.form}>
              <h1 className={css.formTitle}>Реєстрація</h1>

              {/* NAME */}
              <div className={css.formGroup}>
                <label htmlFor="name" className={css.label}>
                  Імʼя<span className={css.required}>*</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Ваше імʼя"
                  className={`${css.input} ${
                    errors.name && touched.name ? css.inputError : ''
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* EMAIL */}
              <div className={css.formGroup}>
                <label htmlFor="email" className={css.label}>
                  Пошта<span className={css.required}>*</span>
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="hello@leleka.com"
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* PASSWORD */}
              <div className={css.formGroup}>
                <label htmlFor="password" className={css.label}>
                  Пароль<span className={css.required}>*</span>
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.actions}>
                <button
                  type="submit"
                  className={css.submitButton}
                  disabled={isSubmitting}
                >
                  Зареєструватись
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className={css.nav}>
          <p className={css.description}>Вже маєте акаунт?</p>
          <Link className={css.link} href="/sign-in">
            Увійти
          </Link>
        </div>
      </div>
      <Image
        className={css.img}
        src="/img/registrationPage.png"
        alt="registration"
        width={720}
        height={900}
      />
    </main>
  );
}
