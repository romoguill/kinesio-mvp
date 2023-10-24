import AuthForm from '@/components/auth/AuthForm';
import AuthContainer from '../AuthContainer';

function SignUp() {
  return (
    <AuthContainer>
      <AuthForm view='sign_up' />
    </AuthContainer>
  );
}

export default SignUp;
