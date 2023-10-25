import UserAvatar from './UserAvatar';

function Header() {
  return (
    <header className='sticky h-20 flex items-center justify-between'>
      <h2>LOGO</h2>
      <UserAvatar />
    </header>
  );
}

export default Header;
