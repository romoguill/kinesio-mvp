import Link from 'next/link';
import SidebarMobile from '../sidebar/SidebarMobile';

function Header() {
  return (
    <header className='sticky top-0 border-b border-slate-600/30 py-4 z-49'>
      <div className='px-6 sm:px-8 lg:px-6 max-w-7xl mx-auto w-full flex items-center justify-between'>
        <Link href={'/'}>
          <h2 className='tracking-wider font-bold text-2xl text-blue-800'>
            CareBear
          </h2>
        </Link>
        <SidebarMobile />
      </div>
    </header>
  );
}

export default Header;
