interface PageContainerProps {
  children: React.ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return <div className='px-2 md:px-4 w-full max-w-5xl'>{children}</div>;
}

export default PageContainer;
