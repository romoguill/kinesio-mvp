import AuthForm from '@/components/auth/AuthForm';

function Login() {
  return (
    <div className='flex justify-center items-center h-full bg-black'>
      <div className='flex flex-col'>
        <h1 className='text-xl '>Login</h1>
        <AuthForm />
      </div>
    </div>
  );
}

export default Login;
