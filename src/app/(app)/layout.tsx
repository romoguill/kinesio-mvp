import Sidebar from '@/components/sidebar/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex bg-background px-2 sm:px-4'>
      <Sidebar />
      {children}
    </main>
  );
}

export default AppLayout;
