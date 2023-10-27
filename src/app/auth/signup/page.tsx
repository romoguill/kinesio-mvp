import AuthProviderButton from '@/components/auth/AuthProviderButton';
import SignupForm from '@/components/auth/SignupForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthContainer from '../AuthContainer';

async function SignUp() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <AuthContainer>
      <SignupForm />
      <div className='my-8 relative'>
        <hr className='h-[2px] border-none bg-neutral-600/20' />
        <p className='absolute top-[1px] leading-none left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white px-4 text-sm'>
          or
        </p>
      </div>
      <AuthProviderButton size={20} provider='google'>
        Sign Up with Google
      </AuthProviderButton>
    </AuthContainer>
  );
}

export default SignUp;
