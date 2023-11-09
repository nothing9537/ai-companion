import { FC } from 'react';
import { SearchInput } from '@/features/search-input';

const RootPage: FC = () => {
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
    </div>
  );
};

export default RootPage;
