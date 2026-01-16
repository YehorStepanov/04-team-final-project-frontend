import 'yup';

declare module 'yup' {
  interface StringSchema {
    strictEmail(message?: string): StringSchema;
  }
}
