import AuthForm from '@/components/auth/AuthForm';
import SigninForm from '@/components/auth/SigninForm';
import AuthContainer from '../AuthContainer';

function Login() {
  return (
    <AuthContainer>
      <AuthForm view='sign_in' />
    </AuthContainer>
  );
}

export default Login;
