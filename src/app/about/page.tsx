import Link from 'next/link';
import ContactForm from './ContactForm';

function Landing() {
  return (
    <div className='min-h-screen bg-slate-600 '>
      <div className='max-w-5xl mx-auto'>
        <div className='flex justify-between items-center px-10 py-8 text-neutral-200'>
          <h3 className='text-2xl'>KINESIO APP</h3>
          <Link
            href={'/login'}
            className='bg-green-400 rounded-md px-4 py-2 text-neutral-800 font-medium'
          >
            LOGIN
          </Link>
        </div>

        <div className='px-10 flex justify-between'>
          <div className='basis-1/2 '>
            <h1 className='text-6xl text-neutral-200'>KINESIO APP</h1>
            <h2 className='text-3xl mt-2 text-neutral-300'>
              App para centralizar tu tratamiento en un solo lugar
            </h2>
            <h2 className='text-4xl text-orange-600 mt-10'>
              SITIO EN CONSTRUCCION
            </h2>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Landing;
