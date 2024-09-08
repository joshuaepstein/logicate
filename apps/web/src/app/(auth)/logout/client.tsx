'use client';

import { signOut } from 'next-auth/react';
import { useEffectOnce } from 'react-use';

export default function LogoutClient() {
  useEffectOnce(() => {
    signOut();
  });

  return <></>;
}
