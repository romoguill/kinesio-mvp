import LoginForm from '@/components/auth/LoginForm';
import AuthContainer from '../AuthContainer';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm';

async function PasswordRecovery() {
  return (
    <AuthContainer>
      <PasswordRecoveryForm />
    </AuthContainer>
  );
}

export default PasswordRecovery;
