import { SIDEBAR_OPTIONS } from '@/utils/constants';
import SidebarLink from './SidebarLink';

interface SidebarLinkGroupProps {
  mobile?: boolean;
}

function SidebarLinkGroup({ mobile = false }: SidebarLinkGroupProps) {
  return (
    <ul className='flex flex-col gap-4'>
      {SIDEBAR_OPTIONS.map((link) => (
        <li key={link.option} className=''>
          <SidebarLink link={link} mobile={mobile} />
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinkGroup;
