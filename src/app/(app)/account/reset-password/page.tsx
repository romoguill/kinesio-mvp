import AuthContainer from '@/app/auth/AuthContainer';
import PasswordForm from './PasswordForm';

function ResetPassword() {
  return (
    <AuthContainer>
      <h1 className='mb-4 text-xl text-center font-semibold text-muted-foreground'>
        Password Reset
      </h1>
      <PasswordForm />
    </AuthContainer>
  );
}

export default ResetPassword;
