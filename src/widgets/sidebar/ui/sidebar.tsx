'use client';

import { FC, memo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/lib/hooks/use-modal';

import { SideBarItems } from '../consts/sidebar-items';
import { SidebarItem } from '../types';

interface SidebarProps {
  isPro: boolean;
}

export const Sidebar: FC<SidebarProps> = memo(({ isPro }) => {
  const pathname = usePathname();
  const { onOpen } = useModal();
  const router = useRouter();

  const onTravel = useCallback((item: SidebarItem) => () => {
    if (item.pro && !isPro) {
      return onOpen('pro-modal');
    }

    return router.push(item.href);
  }, [isPro, router, onOpen]);

  return (
    <section className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 justify-center flex">
        <div className="space-y-2 flex flex-col gap-y-1">
          {SideBarItems.map((item) => (
            <Link
              href={(item.pro && !isPro) ? '/' : item.href}
              key={item.href}
              onClick={onTravel(item)}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === item.href && 'bg-primary/10 text-primary',
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});
