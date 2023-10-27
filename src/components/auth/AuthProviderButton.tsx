import { IconType } from 'react-icons';
import { Button } from '../ui/button';

type AuthProviderButtonProps = {
  icon: IconType;
  children: React.ReactNode;
  size: number;
};

function AuthProviderButton({
  icon: Icon,
  children,
  size,
}: AuthProviderButtonProps) {
  return (
    <Button
      className='flex flex-row gap-2 items-center justify-center'
      variant='secondary'
    >
      <Icon size={size} />
      <p>{children}</p>
    </Button>
  );
}

export default AuthProviderButton;
