import Link from 'next/link';
import ContactForm from './ContactForm';

function Landing() {
  return (
    <div className='min-h-screen bg-slate-800 '>
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

        <div className='px-10 flex justify-between py-10'>
          <div>
            <h1 className='text-6xl text-neutral-200'>KINESIO APP</h1>
            <h2 className='text-3xl mt-2 text-neutral-300'>
              App para centralizar tu tratamiento en un solo lugar
            </h2>
            <h2 className='text-4xl text-orange-600 mt-10'>
              SITIO EN CONSTRUCCION
            </h2>
          </div>
        </div>
        <div className='flex flex-col md:grid md:grid-cols-3 gap-2 px-10 w-full py-4'>
          <div className=' bg-slate-700 rounded-md p-4'>
            <h4 className='text-2xl text-neutral-200 mb-3'>Pacientes</h4>
            <ul className='space-y-4'>
              <li className='text-neutral-300 text-lg ml-2'>
                Plan de entrenamiento
              </li>
              <li className='text-neutral-300 text-lg ml-2'>
                Explicativo de ejercicios
              </li>
              <li className='text-neutral-300 text-lg ml-2'>Ver progreso</li>
            </ul>
          </div>
          <div className='bg-slate-700 rounded-md p-4'>
            <h4 className='text-2xl text-neutral-200 mb-3'>Profesionales</h4>
            <ul className='space-y-4'>
              <li className='text-neutral-300 text-lg ml-2'>
                Seguimiento de pacientes
              </li>
              <li className='text-neutral-300 text-lg ml-2'>
                Uso y creacion de planes personalizados
              </li>
              <li className='text-neutral-300 text-lg ml-2'>
                Historial clinica de pacientes
              </li>
            </ul>
          </div>
          <div className='bg-slate-700 rounded-md p-4'>
            <h4 className='text-2xl text-neutral-200 mb-3'>Consultorios</h4>
            <ul className='space-y-4'>
              <li className='text-neutral-300 text-lg ml-2'>
                Gestion de turnos
              </li>
              <li className='text-neutral-300 text-lg ml-2'>
                Gestion de profesionales
              </li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Landing;
