import { headers } from 'next/headers';

function NotFound() {
  const headersList = headers();
  const url = headersList.get('referer');

  const id = url?.substring(url?.lastIndexOf('/') + 1);

  return (
    <div className='px-2 md:px-4 w-full max-w-5xl'>
      <h3>The excercise with the id &quot;{id}&quot; was not found</h3>
    </div>
  );
}

export default NotFound;
