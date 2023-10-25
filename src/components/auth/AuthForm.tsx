'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

type AuthFormProps = {
  view: ViewType;
};

export default function AuthForm({ view }: AuthFormProps) {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view={view}
      appearance={{ theme: ThemeSupa }}
      theme='dark'
      showLinks={true}
      providers={['google']}
      redirectTo='http://localhost:3000'
    />
  );
}
