import { SidebarOption } from '@/utils/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  link: SidebarOption;
  mobile?: boolean;
}

function SidebarLink({ link, mobile = false }: SidebarLinkProps) {
  return (
    <Link
      href={link.path}
      className={cn(
        'flex gap-4 items-center p-2 rounded-lg text-foreground hover:bg-neutral-100/10 mr-2'
      )}
    >
      {<link.icon />}
      <p
        className={cn(
          {
            'flex-grow-0': mobile,
            'flex-grow': !mobile,
          },
          'font-semibold '
        )}
      >
        {link.option}
      </p>
    </Link>
  );
}

export default SidebarLink;
