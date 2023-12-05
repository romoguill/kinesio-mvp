import { SIDEBAR_OPTIONS } from '@/utils/constants';
import SidebarLink from './SidebarLink';
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar() {
  return (
    <aside className='w-[220px] bg-background border-r border-gray-700 h-[calc(100vh-5rem)] hidden md:block flex-shrink-0'>
      <SidebarLinkGroup />
    </aside>
  );
}

export default Sidebar;
