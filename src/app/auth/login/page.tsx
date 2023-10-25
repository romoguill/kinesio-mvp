import AuthForm from '@/components/auth/AuthForm';
import SigninForm from '@/components/auth/LoginForm';
import AuthContainer from '../AuthContainer';
import LoginForm from '@/components/auth/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    </AuthContainer>
  );
}

export default Login;
