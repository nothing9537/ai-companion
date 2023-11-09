'use client';

import { FC, memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { SideBarItems } from '../consts/sidebar-items';

interface SidebarProps {

}

export const Sidebar: FC<SidebarProps> = memo(() => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 justify-center flex">
        <div className="space-y-2 flex flex-col gap-y-1">
          {SideBarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                  pathname === item.href && 'bg-primary/10 text-primary',
                )}
              >
                <div className="flex flex-col gap-y-2 items-center flex-1">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
