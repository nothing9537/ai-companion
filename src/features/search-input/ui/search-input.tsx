'use client';

import qs from 'query-string';
import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import { Input } from '@/shared/shadcn-ui/ui/input';
import { useDebounce } from '@/shared/lib/hooks/use-debounce';

interface SearchInputProps {

}

export const SearchInput: FC<SearchInputProps> = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams?.get('categoryId');
  const name = searchParams?.get('name');

  const [searchValue, setSearchValue] = useState<string>(name || '');

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const debouncedUpdateUrl = useDebounce((newSearchValue: string) => {
    const query = { name: newSearchValue, categoryId };

    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query,
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, 1000);

  useEffect(() => {
    debouncedUpdateUrl(searchValue);
  }, [searchValue, debouncedUpdateUrl]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-4 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="pl-10 bg-primary/10"
      />
    </div>
  );
});
