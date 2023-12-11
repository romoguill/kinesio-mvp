'use client';

import { Database } from '@/lib/supabase/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { FileEdit, MoreVertical, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import Link from 'next/link';

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
    <Card className='flex relative h-40 border-none'>
      <div className='grid grid-cols-[120px_1fr] xs:grid xs:grid-cols-[160px_1fr] md:grid-cols-[160px_minmax(290px,2fr)_minmax(170px,3fr)] grid-rows-[3fr_2fr] md:grid-rows-none h-full w-full justify-items-center items-center gap-2 xs:gap-4'>
        <Image
          src={thumbnail_url}
          alt={`Thumbnail of excercise ${id}`}
          width={160}
          height={160}
          className='object-cover w-full h-40 rounded-lg row-span-2 col-span-1 md:row-span-1'
          onError={console.log}
        />
        <div className='justify-self-start p-1 md:p-3 '>
          <CardTitle className='text-lg leading-6 md:text-2xl'>
            {name}
          </CardTitle>
          <p className='text-xs md:text-sm'>{id}</p>
        </div>

        <div className='text-xs md:text-sm justify-self-start md:justify-self-center px-1 md:px-3'>
          <p>last modified</p>
          <p>{parseDateModified(modified_at).date}</p>
          <p>{parseDateModified(modified_at).time}</p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger
          asChild
          className='absolute right-3 top-3 cursor-pointer'
        >
          <Button
            variant={'ghost'}
            size={'icon'}
            className='hover:bg-inherit hover:text-accent'
          >
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='end' className='flex flex-col w-32 p-0'>
          <Button
            asChild
            variant={'ghost'}
            className='justify-start hover:bg-blue-600/30'
          >
            <Link href={`/admin/wiki/edit/${id}`}>
              <FileEdit />
              <p>Edit</p>
            </Link>
          </Button>
          <Button
            variant={'ghost'}
            className='justify-start hover:bg-red-600/30'
          >
            <Trash2 />
            <p>Delete</p>
          </Button>
        </PopoverContent>
      </Popover>
    </Card>
  );
}

export default AdminExcerciseCard;
