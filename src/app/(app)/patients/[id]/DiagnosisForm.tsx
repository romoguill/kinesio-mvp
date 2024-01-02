'use client';

import FormInputControls from '@/components/forms/FormInputControls';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/lib/supabase/database.types';
import { updatePatient } from '@/lib/supabase/queries';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface DiagnosisFormProps {
  patient:
    | Database['public']['Functions']['get_patients']['Returns'][number]
    | null;
}

function DiagnosisForm({ patient }: DiagnosisFormProps) {
  const [editMode, setEditMode] = useState(false);
  const [diagnosis, setDiagnosis] = useState(patient?.diagnosis ?? '');
  const [lastSavedContent, setLastSavedContent] = useState(
    patient?.diagnosis ?? ''
  );
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (patient?.diagnosis) setDiagnosis(patient?.diagnosis);
  }, [patient]);

  const handleUpdate = async () => {
    if (!patient?.id) return;

    const { error } = await updatePatient(patient?.id, { diagnosis });

    if (error) {
      toast.error("Couldn't update diagnosis. Try again later");
      return;
    }

    setEditMode(false);
    setLastSavedContent(diagnosis);
  };

  const handleCancel = () => {
    setEditMode(false);
    setDiagnosis(lastSavedContent);
  };

  return (
    <div className='my-6'>
      <div className='flex justify-between items-center mb-4'>
        <Label htmlFor='diagnosis' className='text-lg'>
          Diagnosis
        </Label>
        <FormInputControls
          editMode={editMode}
          setEditMode={setEditMode}
          onConfirm={handleUpdate}
          onDiscard={handleCancel}
        />
      </div>
      <div onDoubleClick={() => setEditMode(true)}>
        <Textarea
          id='diagnosis'
          disabled={!editMode}
          className='disabled:cursor-default'
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DiagnosisForm;
