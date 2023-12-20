'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Database } from '@/lib/supabase/database.types';
import { PendingDetails } from './page';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

interface PendingInvitationProps {
  pendingDetails: PendingDetails[];
}

function PendingInvitation({ pendingDetails }: PendingInvitationProps) {
  const supabase = createClientComponentClient<Database>();
  const [pending, setPending] = useState(pendingDetails);

  const handleDeclineInvitation = async (id: string) => {
    const { error } = await supabase.from('invites').delete().eq('id', id);

    if (error) return;

    setPending(pending.filter((invite) => invite.invitationId !== id));
  };

  const handleAcceptInvitation = async (id: string) => {
    // const { error } = await supabase.from('invites').
  };

  if (pending.length === 0) return;

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>You have a pending invitation</AccordionTrigger>
        <AccordionContent>
          <ul>
            {pending.map((invite) => (
              <li
                key={invite.invitationId}
                className='flex justify-between items-center'
              >
                <p>
                  {invite.therapistName} would like to add you as their patient
                </p>
                <div className='flex gap-4'>
                  <Button variant={'default'}>Accept</Button>
                  <Button
                    variant={'destructive'}
                    onClick={() => handleDeclineInvitation(invite.invitationId)}
                  >
                    Decline
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default PendingInvitation;
