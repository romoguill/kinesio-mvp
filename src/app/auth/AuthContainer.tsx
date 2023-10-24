type AuthContainerProps = {
  children: React.ReactNode;
};

function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className='max-w-xs lg:max-w-md mx-auto h-screen flex flex-col justify-center p-2'>
      {children}
    </div>
  );
}

export default AuthContainer;
