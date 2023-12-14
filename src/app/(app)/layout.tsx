import Sidebar from '@/components/sidebar/Sidebar';
import PageContainer from '@/components/utils/PageContainer';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1 bg-background px-2 sm:px-4 max-w-7xl mx-auto w-full'>
      <Sidebar />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}

export default AppLayout;
