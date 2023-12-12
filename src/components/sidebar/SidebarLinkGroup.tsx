'use client';

import { SIDEBAR_OPTIONS, SidebarOption } from '@/utils/constants';
import SidebarLink from './SidebarLink';
import { getUserDetails } from '@/lib/supabase/supabase-server';
import { Role } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import useAuth from '@/hooks/useAuth';

interface SidebarLinkGroupProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  mobile?: boolean;
}

function SidebarLinkGroup({ setOpen, mobile = false }: SidebarLinkGroupProps) {
  const auth = useAuth();

  // Some links like "admin" will be hidden based on public.users.role
  const filterRoles = (link: SidebarOption) => {
    if (!link.roles) return true;
    if (!auth.user?.details) return false;

    return link.roles.includes(auth.user.details.role);
  };

  return (
    <ul className='flex flex-col gap-4'>
      {SIDEBAR_OPTIONS.filter(filterRoles).map((link) => (
        <li key={link.option} className=''>
          <SidebarLink link={link} mobile={mobile} setOpen={setOpen} />
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinkGroup;
