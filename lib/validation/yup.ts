import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'strictEmail', function (message) {
  return this.test('strict-email', message, (value) => {
    if (!value) return false;

    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return EMAIL_REGEX.test(value);
  });
});
