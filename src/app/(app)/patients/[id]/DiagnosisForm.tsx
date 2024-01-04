'use client';

import FormInputControls from '@/components/forms/FormInputControls';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/lib/supabase/database.types';
import { updatePatient } from '@/lib/supabase/queries';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface DiagnosisFormProps {
  patient:
    | Database['public']['Functions']['get_patients']['Returns'][number]
    | null;
}

function DiagnosisForm({ patient }: DiagnosisFormProps) {
  const [editMode, setEditMode] = useState(false);
  const [diagnosis, setDiagnosis] = useState(patient?.diagnosis ?? '');
  const lastSavedContent = useRef(patient?.medical_record ?? '');

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (patient?.diagnosis) {
      setDiagnosis(patient?.diagnosis);
      lastSavedContent.current = patient?.diagnosis;
    }
  }, [patient]);

  const handleUpdate = async () => {
    if (!patient?.id) return;

    const { error } = await updatePatient(patient?.id, { diagnosis });

    if (error) {
      toast.error("Couldn't update diagnosis. Try again later");
      return;
    }

    setEditMode(false);
    lastSavedContent.current = diagnosis;
  };

  const handleCancel = () => {
    setEditMode(false);
    setDiagnosis(lastSavedContent.current);
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
          className='disabled:cursor-default disabled:text-white disabled:opacity-80'
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DiagnosisForm;
