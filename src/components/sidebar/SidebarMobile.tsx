import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Menu } from 'lucide-react';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarMobileProps {
  className: string;
}

function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <Menu />
      </SheetTrigger>
      <SheetContent className='md:hidden' side={'top'}>
        <SheetHeader>
          <SheetTitle>CareBear</SheetTitle>
          <SidebarLinkGroup mobile />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
