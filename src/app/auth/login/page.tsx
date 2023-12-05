import AuthProviderButton from '@/components/auth/AuthProviderButton';
import LoginForm from '@/components/auth/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthContainer from '../AuthContainer';

async function Login() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <AuthContainer>
      <LoginForm />
      <p className='text-sm mt-3'>
        Don&apos;t have an account?{' '}
        <Link href={'/auth/signup'} className='text-blue-600 font-semibold'>
          Sign Up
        </Link>
      </p>
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
