import { Ghost } from 'lucide-react';

function NotFound() {
  return (
    <main className='flex items-center justify-center h-full p-8'>
      <div className='flex flex-col items-center gap-8 text-2xl text-neutral-300'>
        <Ghost size={50} />
        <p className='text-center'>The requested resource doesn&apos;t exist</p>
      </div>
    </main>
  );
}

export default NotFound;
