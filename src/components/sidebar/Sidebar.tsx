import SessionManagement from './SessionManagement';
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar() {
  return (
    <aside className='w-[220px] bg-background border-r border-slate-600/30 h-[calc(100%-5rem)] max-h-full hidden lg:flex lg:flex-col justify-between pt-4 pb-8 lg:pr-4 flex-shrink-0 fixed'>
      <SidebarLinkGroup />
      <SessionManagement />
    </aside>
  );
}

export default Sidebar;
