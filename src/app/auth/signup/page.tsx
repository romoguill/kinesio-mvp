import AuthForm from '@/components/auth/AuthForm';
import AuthContainer from '../AuthContainer';
import SignupForm from '@/components/auth/SignupForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
    </AuthContainer>
  );
}

export default SignUp;
