import { Check, FileEdit, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';

interface FormInputControlsProps {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  onDiscard: () => void;
}

function FormInputControls({
  editMode,
  setEditMode,
  onConfirm,
  onDiscard,
}: FormInputControlsProps) {
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
            className='p-1 px-2  h-7 flex gap-2 text-xs'
            onClick={onConfirm}
          >
            <Check size={18} />
            Save
          </Button>
          <Button
            variant={'destructive'}
            className='p-1 px-2 e h-7 flex gap-2 text-xs'
            onClick={onDiscard}
          >
            <X size={18} />
            Discard
          </Button>
        </>
      )}
    </div>
  );
}

export default FormInputControls;
