'use client';

import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';
import Image from 'next/image';
import * as Yup from 'yup';
import 'izitoast/dist/css/iziToast.min.css';
import { AxiosError } from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { login } from '@/lib/api/clientApi';
import iziToast from 'izitoast';

interface OrderFormValues {
  email: string;
  password: string;
}

const initialValues: OrderFormValues = {
  email: '',
  password: '',
};

const OrderFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Пошта занадто довга')
    .email('Некоректна пошта')
    .required('Введіть пошту'),
  password: Yup.string()
    .min(8, 'Пароль занадто корткий')
    .max(128, 'Пароль занадто довгий')
    .required('Введіть пароль'),
});

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    try {
      const user = await login(values);
      console.log(user);

      if (user) {
        setUser(user);
        router.push('/');
        actions.resetForm();
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      iziToast.error({
        title: 'Помилка',
        message:
          axiosError.response?.data?.message || 'Невірна пошта або пароль',
        position: 'topRight',
      });
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
          onSubmit={handleSubmit}
          validationSchema={OrderFormSchema}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.formTitle}>Вхід</h1>

              <div className={css.formGroup}>
                <Field
                  id="email"
               
                  name="email"
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
              
                  placeholder="Пошта"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <Field
                  id="password"
                 
                  name="password"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
             
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.actions}>
                <button type="submit" className={css.submitButton}>
                  Увійти
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className={css.nav}>
          <p className={css.description}>Немає аккаунту?</p>
          <Link className={css.link} href="/sign-up">
            Зареєструватися
          </Link>
        </div>
      </div>
      <Image
        className={css.img}
        src="/img/loginPage.png"
        alt="login"
        width={720}
        height={900}
      />
    </main>
  );
}
