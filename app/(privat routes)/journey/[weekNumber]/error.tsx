'use client';

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <p>Could not fetch journey details. {error.message}</p>
    </div>
  );
};

export default Error;
