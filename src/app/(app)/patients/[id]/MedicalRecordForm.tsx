'use client';

import FormInputControls from '@/components/forms/FormInputControls';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/lib/supabase/database.types';
import { updatePatient } from '@/lib/supabase/queries';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface MedicalRecordFormProps {
  patient:
    | Database['public']['Functions']['get_patients']['Returns'][number]
    | null;
}

function MedicalRecordForm({ patient }: MedicalRecordFormProps) {
  const [editMode, setEditMode] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState(
    patient?.medical_record ?? ''
  );
  const [lastSavedContent, setLastSavedContent] = useState(
    patient?.medical_record ?? ''
  );
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (patient?.medical_record) setMedicalRecord(patient?.medical_record);
  }, [patient]);

  const handleUpdate = async () => {
    if (!patient?.id) return;

    const { error } = await updatePatient(patient?.id, {
      medical_record: medicalRecord,
    });

    if (error) {
      toast.error("Couldn't update Medical Record. Try again later");
      return;
    }

    setEditMode(false);
    setLastSavedContent(medicalRecord);
  };

  const handleCancel = () => {
    setEditMode(false);
    setMedicalRecord(lastSavedContent);
  };

  return (
    <div className='my-6'>
      <div className='flex justify-between items-center mb-4'>
        <Label htmlFor='medicalRecord' className='text-lg'>
          Medical Record
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
          id='medicalRecord'
          disabled={!editMode}
          className='disabled:cursor-default h-48'
          value={medicalRecord}
          onChange={(e) => setMedicalRecord(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MedicalRecordForm;
