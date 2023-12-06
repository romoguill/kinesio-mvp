'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface SearchInput {
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function SearchInput({ className, value, setValue }: SearchInput) {
  const debouncedValue = useDebounce<string>(value);

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
