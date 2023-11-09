'use client';

import qs from 'query-string';
import { FC, memo, useCallback, useMemo } from 'react';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { TabItem, Tabs } from '@/shared/ui/tabs';

interface CategoryTabsProps {
  categories: Category[];
}

export const CategoryTabs: FC<CategoryTabsProps> = memo(({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabItems = useMemo<TabItem[]>(() => (
    categories.map((category) => ({ value: category.id, content: category.name }))
  ), [categories]);

  const categoryId = searchParams?.get('categoryId');

  const onTabChange = useCallback((id?: string) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [router]);

  return (
    <Tabs
      value={categoryId || ''}
      items={tabItems}
      resetLabel="Newest"
      onChange={onTabChange}
    />
  );
});
