'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InviteForm from './InviteForm';
import { useState } from 'react';

function InviteModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className='self-end'>
          Invite new patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a patient</DialogTitle>
          <DialogDescription>
            Send invite to add them as a patient. They must accept the request.
          </DialogDescription>
        </DialogHeader>

        <div>
          <InviteForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
