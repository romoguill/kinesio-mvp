type AuthContainerProps = {
  children: React.ReactNode;
};

function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className='w-64 sm:w-80 lg:w-96 mx-auto flex flex-col justify-center p-2 grow'>
      {children}
    </div>
  );
}

export default AuthContainer;
