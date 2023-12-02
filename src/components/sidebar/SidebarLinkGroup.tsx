import { SIDEBAR_OPTIONS } from '@/utils/constants';
import SidebarLink from './SidebarLink';

function SidebarLinkGroup() {
  return (
    <ul className='flex flex-col gap-4'>
      {SIDEBAR_OPTIONS.map((link) => (
        <li key={link.option} className=''>
          <SidebarLink link={link} />
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinkGroup;
