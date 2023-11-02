import { cn } from '@/lib/utils';

type SubmitErrorMessageProps = {
  className?: string;
  children: React.ReactNode;
};

function SubmitErrorMessage({ children, className }: SubmitErrorMessageProps) {
  return (
    <div className={cn(className, 'text-sm font-medium text-destructive')}>
      {children}
    </div>
  );
}

export default SubmitErrorMessage;
