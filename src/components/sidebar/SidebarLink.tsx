'use client';

import { SidebarOption } from '@/utils/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface SidebarLinkProps {
  link: SidebarOption;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  mobile?: boolean;
}

function SidebarLink({ link, setOpen, mobile = false }: SidebarLinkProps) {
  return (
    <Link
      href={link.path}
      className={cn(
        'flex gap-4 items-center p-2 rounded-lg text-foreground hover:bg-neutral-100/10'
      )}
      onClick={() => {
        setOpen && setOpen(false);
      }}
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
