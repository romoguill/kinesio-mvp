import { SidebarOption } from '@/utils/constants';
import Link from 'next/link';

interface SidebarLinkProps {
  link: SidebarOption;
}

function SidebarLink({ link }: SidebarLinkProps) {
  return (
    <Link
      href={link.path}
      className='flex gap-4 items-center p-2 rounded-md text-foreground'
    >
      {<link.icon />}
      <p className='flex-grow font-semibold'>{link.option}</p>
    </Link>
  );
}

export default SidebarLink;
