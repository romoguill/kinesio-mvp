interface PageContainerProps {
  children: React.ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <main className='px-4 mt-4 lg:ml-[220px] max-w-5xl mb-8'>{children}</main>
  );
}

export default PageContainer;
