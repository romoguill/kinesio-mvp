'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

const iconProviders = [
  {
    provider: 'google',
    icon: FcGoogle,
  },
];

type AuthProviderButtonProps = {
  provider: 'google';
  children: React.ReactNode;
  size: number;
};

function AuthProviderButton({
  provider,
  children,
  size,
}: AuthProviderButtonProps) {
  const supabase = createClientComponentClient();

  const handleClick = () => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const Icon = iconProviders.find((item) => item.provider === provider)?.icon;

  return (
    <Button
      className='flex flex-row gap-2 items-center justify-center'
      variant='secondary'
      onClick={handleClick}
    >
      <Icon size={size} />
      <p>{children}</p>
    </Button>
  );
}

export default AuthProviderButton;
