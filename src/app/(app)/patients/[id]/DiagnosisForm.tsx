'use client';

import FormInputControls from '@/components/forms/FormInputControls';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileEdit } from 'lucide-react';
import { useState } from 'react';

function DiagnosisForm() {
  const [diagnosisEditMode, setDiagnosisEditMode] = useState(false);

  return (
    <div className='my-6'>
      <div className='flex justify-between items-center'>
        <Label htmlFor='diagnosis' className='text-lg'>
          Diagnosis
        </Label>
        <FormInputControls
          editMode={diagnosisEditMode}
          setEditMode={setDiagnosisEditMode}
        />
      </div>
      <Textarea id='diagnosis' disabled={!diagnosisEditMode} />
    </div>
  );
}

export default DiagnosisForm;
