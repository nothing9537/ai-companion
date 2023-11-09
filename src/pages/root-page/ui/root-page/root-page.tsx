import { FC } from 'react';

import { SearchInput } from '@/features/search-input';
import { CategoryTabs } from '@/features/category-tabs';
import { db } from '@/shared/lib/db';

const RootPage: FC = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <CategoryTabs categories={categories} />
    </div>
  );
};

export default RootPage;
