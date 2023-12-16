import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function PendingInvitation() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>You have a pending invitation</AccordionTrigger>
        <AccordionContent>Hello</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default PendingInvitation;
