'use client';

import { Database } from '@/lib/supabase/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image, { ImageLoader, ImageLoaderProps } from 'next/image';
import { FileEdit, MoreVertical, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteExcercise } from '@/lib/supabase/queries';

type AdminExcerciseCardProps =
  Database['public']['Functions']['search_excercises']['Returns'][number] & {
    handleDelete: (id: string) => Promise<void>;
  };

function AdminExcerciseCard({
  id,
  name,
  tags,
  thumbnail_url,
  modified_at,
  handleDelete,
}: AdminExcerciseCardProps) {
  const [imgError, setImgError] = useState(false);

  // Nextjs throws an error if can't parse src to http:// or https://. TODO: Find better solution than this
  const imageLoader: ImageLoader = ({ src }) => {
    if (!src.startsWith('http://') && !src.startsWith('https://')) {
      setImgError(true);
      return '/image-placeholder.jpeg';
    }

    return src;
  };

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
          className={`object-cover w-full h-40 rounded-lg row-span-2 col-span-1 md:row-span-1 ${
            imgError ? 'brightness-[0.25]' : ''
          }`}
          loader={imageLoader}
        />
        <div className='justify-self-start p-1 md:p-3 '>
          <CardTitle className='text-lg leading-6 md:text-2xl max-w-[8rem]'>
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
          className='absolute right-1 top-[18px] cursor-pointer'
        >
          <Button
            variant={'ghost'}
            size={'icon'}
            className='hover:bg-inherit hover:text-accent'
          >
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='end'
          className='flex flex-col w-32 p-0 bg-slate-700'
        >
          <Button
            asChild
            variant={'ghost'}
            className='justify-start hover:bg-blue-600/30'
          >
            <Link href={`/admin/wiki/edit/${id}`} className='flex gap-2'>
              <FileEdit />
              <p>Edit</p>
            </Link>
          </Button>
          <Button
            variant={'ghost'}
            className='flex gap-2 justify-start hover:bg-red-600/30'
            onClick={() => handleDelete(id)}
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
