import { Check, FileEdit, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';

interface FormInputControlsProps {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

function FormInputControls({ editMode, setEditMode }: FormInputControlsProps) {
  return (
    <div className='flex gap-4'>
      {!editMode ? (
        <Button
          variant={'ghost'}
          className='p-1 hover:bg-inherit hover:text-white h-7'
          onClick={() => setEditMode(true)}
        >
          <FileEdit />
        </Button>
      ) : (
        <>
          <Button
            variant={'secondary'}
            className='p-1 px-2  h-7 flex gap-2'
            onClick={() => setEditMode(false)}
          >
            <Check />
            Save
          </Button>
          <Button
            variant={'destructive'}
            className='p-1 px-2 e h-7 flex gap-2'
            onClick={() => setEditMode(false)}
          >
            <X />
            Discard
          </Button>
        </>
      )}
    </div>
  );
}

export default FormInputControls;
