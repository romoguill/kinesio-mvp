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
import useAuth from '@/hooks/useAuth';

interface PendingInvitationProps {
  pendingDetails: PendingDetails[];
}

function PendingInvitation({ pendingDetails }: PendingInvitationProps) {
  const supabase = createClientComponentClient<Database>();
  const [pending, setPending] = useState(pendingDetails);
  const { user } = useAuth();

  if (!user) return;

  const deleteInvitation = async (id: string) => {
    const { error } = await supabase.from('invites').delete().eq('id', id);

    if (error) return;

    setPending(pending.filter((invite) => invite.invitationId !== id));
  };

  const handleDeclineInvitation = async (id: string) => {
    await deleteInvitation(id);
  };

  const handleAcceptInvitation = async (id: string) => {
    const therapistId = pending.find(
      (invite) => invite.invitationId === id
    )?.therapistId;

    if (!therapistId) return;

    await deleteInvitation(id);

    const { error } = await supabase.from('patients').insert({
      patient: user?.id,
      therapist: therapistId,
    });

    console.log(error);

    if (error) return;

    toast.success('The therapist can now start with your treatment');
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
                  <Button
                    variant={'default'}
                    onClick={() => handleAcceptInvitation(invite.invitationId)}
                  >
                    Accept
                  </Button>
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
