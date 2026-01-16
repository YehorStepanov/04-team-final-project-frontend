'use client';

import ErrorMessage from '@/components/Diary/ErrorMessage/ErrorMessage';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return <ErrorMessage message={error.message} handleReset={reset} />;
};

export default Error;
