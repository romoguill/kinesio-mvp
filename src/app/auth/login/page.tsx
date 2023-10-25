import AuthForm from '@/components/auth/AuthForm';
import SigninForm from '@/components/auth/LoginForm';
import AuthContainer from '../AuthContainer';
import LoginForm from '@/components/auth/LoginForm';

function Login() {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
}

export default Login;
