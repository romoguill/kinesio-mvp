import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Database } from '@/lib/supabase/database.types';
import { PendingDetails } from './page';
import { Button } from '@/components/ui/button';

interface PendingInvitationProps {
  pendingDetails: PendingDetails[];
}

function PendingInvitation({ pendingDetails }: PendingInvitationProps) {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>You have a pending invitation</AccordionTrigger>
        <AccordionContent>
          <ul>
            {pendingDetails.map((invite) => (
              <li
                key={invite.invitationId}
                className='flex justify-between items-center'
              >
                <p>
                  {invite.therapistName} would like to add you as their patient
                </p>
                <div className='flex gap-4'>
                  <Button variant={'default'}>Accept</Button>
                  <Button variant={'destructive'}>Decline</Button>
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
