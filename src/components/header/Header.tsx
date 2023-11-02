import Link from 'next/link';
import UserAvatar from './UserAvatar';
import UserMenu from './UserMenu';

function Header() {
  return (
    <header className='sticky h-20 flex items-center justify-between p-8'>
      <Link href={'/'}>
        <h2 className='tracking-wider font-bold text-2xl text-blue-800'>
          CareBear
        </h2>
      </Link>
      <UserMenu />
    </header>
  );
}

export default Header;
