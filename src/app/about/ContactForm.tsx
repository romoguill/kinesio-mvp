function ContactForm() {
  return (
    <div className='basis-1/2 flex flex-col px-10 py-4'>
      <h3 className='text-neutral-200 text-2xl mb-2 font-semibold'>Contacto</h3>
      <form className='flex flex-col gap-2 grow'>
        <input
          name='email'
          type='email'
          placeholder='Email'
          className='px-3 py-2 rounded-md opacity-80'
        />
        <textarea
          name='content'
          placeholder='Mensaje'
          className='px-3 py-2 rounded-md opacity-80 h-40'
        />
        <button className='rounded-md p-2 text-neutral-200 bg-blue-500/50 mt-2'>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
