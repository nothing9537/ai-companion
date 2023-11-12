import { FC } from 'react';

import { SearchInput } from '@/features/search-input';
import { CategoryTabs } from '@/features/category-tabs';
import { db } from '@/shared/lib/db';
import { CompanionsList } from '@/entities/companion';

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

const RootPage: FC<RootPageProps> = async ({ searchParams }) => {
  const { categoryId, name } = searchParams;

  const categories = await db.category.findMany();
  const companions = await db.companion.findMany({
    where: {
      categoryId,
      name: { search: name },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <CategoryTabs categories={categories} />
      <CompanionsList companions={companions} />
    </div>
  );
};

export default RootPage;
