import AuthForm from '@/components/auth/AuthForm';
import SigninForm from '@/components/auth/LoginForm';
import AuthContainer from '../AuthContainer';
import LoginForm from '@/components/auth/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthProviderButton from '@/components/auth/AuthProviderButton';

async function Login() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <AuthContainer>
      <LoginForm />
      <div className='my-8 relative'>
        <hr className='h-[2px] border-none bg-neutral-600/20' />
        <p className='absolute top-[1px] leading-none left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white px-4 text-sm'>
          or
        </p>
      </div>
      <AuthProviderButton size={20} provider='google'>
        Signin with Google
      </AuthProviderButton>
    </AuthContainer>
  );
}

export default Login;
