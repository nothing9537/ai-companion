'use client';

import { FC, ReactNode, memo, useCallback, useState } from 'react';

import { cn } from '@/shared/lib/utils';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
  onChange?: (value?: string) => void;
  value?: string;
  defaultValue?: string;
  resetLabel?: string;
}

export const Tabs: FC<TabsProps> = memo(({ items, className, onChange, value, defaultValue, resetLabel }) => {
  const defaultTabItem = items.find((item) => item.value === (value || defaultValue));

  const [tabItem, setTabItem] = useState<TabItem | undefined>(defaultTabItem);
  const tabItemClassName = 'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition';

  const onReset = useCallback(() => {
    onChange?.(undefined);
    setTabItem(undefined);
  }, [onChange]);

  const onChangeTab = useCallback((tab: TabItem) => () => {
    setTabItem(tab);
    onChange?.(tab.value);

    if (tabItem?.value === tab.value) {
      onReset();
    }
  }, [onChange, onReset, tabItem?.value]);

  return (
    <div
      className={cn('w-full overflow-x-auto space-x-2 flex p-1', className)}
    >
      {resetLabel && (
        <button
          type="button"
          className={cn(tabItemClassName, (!value) && 'bg-primary/25')}
          onClick={onReset}
        >
          {resetLabel}
        </button>
      )}
      {items.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={cn(tabItemClassName, tabItem?.value === tab.value && 'bg-primary/25')}
          onClick={onChangeTab(tab)}
        >
          {tab.content}
        </button>
      ))}
    </div>
  );
});
