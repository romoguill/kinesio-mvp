'use client';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';

interface SearchInput {
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function SearchInput({ className, value, setValue }: SearchInput) {
  return (
    <div className='relative'>
      <Search
        className='absolute top-1/2 -translate-y-1/2 translate-x-3 text-neutral-200'
        size={20}
      />
      <Input
        className={cn('pl-12 text-neutral-100', className)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
