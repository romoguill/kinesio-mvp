'use client';

import { Database } from '@/lib/supabase/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

type AdminExcerciseCardProps =
  Database['public']['Functions']['search_excercises']['Returns'][number];

function AdminExcerciseCard({
  id,
  name,
  tags,
  thumbnail_url,
  modified_at,
}: AdminExcerciseCardProps) {
  const parseDateModified = (dateDB: string) => {
    return {
      date: dateDB.split('T')[0],
      time: dateDB.slice(11, 19),
    };
  };
  return (
    <Card className='flex relative h-40'>
      <div className='grid grid-cols-[160px_minmax(300px,2fr)_minmax(180px,3fr)] h-full w-full justify-items-center items-center gap-4'>
        <Image
          src={thumbnail_url}
          alt={`Thumbnail of excercise ${id}`}
          width={160}
          height={160}
          className='object-cover h-40 rounded-lg'
          onError={console.log}
        />
        <div className='justify-self-start p-3'>
          <CardTitle>{name}</CardTitle>
          <p className='text-sm'>{id}</p>
        </div>

        <div className='text-sm'>
          <p>last modified</p>
          <p>
            {parseDateModified(modified_at).date}{' '}
            {parseDateModified(modified_at).time}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default AdminExcerciseCard;
