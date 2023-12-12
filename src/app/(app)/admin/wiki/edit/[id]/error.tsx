'use client';

import { useEffect } from 'react';

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <div>Error {error.message}</div>;
}

export default Error;
