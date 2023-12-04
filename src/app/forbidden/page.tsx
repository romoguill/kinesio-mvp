import { Ban } from 'lucide-react';

function ForbiddenPage() {
  return (
    <main className='flex items-center justify-center h-full'>
      <div className='flex flex-col items-center gap-8 text-2xl text-neutral-300'>
        <Ban size={50} />
        Sorry, you don&apos;t have the required permissions
      </div>
    </main>
  );
}

export default ForbiddenPage;
