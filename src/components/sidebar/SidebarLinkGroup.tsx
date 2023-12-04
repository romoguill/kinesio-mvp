import { SIDEBAR_OPTIONS, SidebarOption } from '@/utils/constants';
import SidebarLink from './SidebarLink';
import { getUserDetails } from '@/lib/supabase/supabase-server';
import { Role } from '@/utils/types';

interface SidebarLinkGroupProps {
  mobile?: boolean;
}

async function SidebarLinkGroup({ mobile = false }: SidebarLinkGroupProps) {
  const user = await getUserDetails();

  // Some links like "admin" will be hidden based on public.users.role
  const filterRoles = (link: SidebarOption) => {
    if (!link.roles) return true;
    if (!user || !user.role) return false;

    return link.roles.includes(user.role);
  };

  return (
    <ul className='flex flex-col gap-4'>
      {SIDEBAR_OPTIONS.filter(filterRoles).map((link) => (
        <li key={link.option} className=''>
          <SidebarLink link={link} mobile={mobile} />
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinkGroup;
