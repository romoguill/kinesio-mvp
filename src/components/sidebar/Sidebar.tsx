import SessionManagement from './SessionManagement';
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar() {
  return (
    <aside className='w-[220px] bg-background border-r border-gray-700 h-[calc(100vh-5rem)] hidden md:flex md:flex-col justify-between pt-4 pb-8 md:pr-4 flex-shrink-0'>
      <SidebarLinkGroup />
      <SessionManagement />
    </aside>
  );
}

export default Sidebar;
