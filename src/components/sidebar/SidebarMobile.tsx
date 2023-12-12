'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarMobileProps {
  className: string;
}

function SidebarMobile({ className }: SidebarMobileProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className='lg:hidden'>
        <Menu />
      </SheetTrigger>
      <SheetContent className='lg:hidden' side={'top'}>
        <SheetHeader>
          <SheetTitle>CareBear</SheetTitle>
          <SidebarLinkGroup mobile setOpen={setOpen} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
