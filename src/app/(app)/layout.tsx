import Sidebar from '@/components/sidebar/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex bg-background px-6'>
      <Sidebar />
      {children}
    </main>
  );
}

export default AppLayout;
