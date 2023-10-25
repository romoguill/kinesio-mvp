import AuthForm from '@/components/auth/AuthForm';
import AuthContainer from '../AuthContainer';
import SignupForm from '@/components/auth/SignupForm';

function SignUp() {
  return (
    <AuthContainer>
      <SignupForm />
    </AuthContainer>
  );
}

export default SignUp;
