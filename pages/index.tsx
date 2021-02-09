import { useRouter } from 'next/router';
import { useEffect } from 'react';

import LoadingSpinner from '../components/layout/loading';

export default function RootIndex() {
  const router = useRouter();

  router.push("/machines");

  return <LoadingSpinner />;
}
