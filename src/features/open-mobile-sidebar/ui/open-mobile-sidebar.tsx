'use client';

import { FC, ReactElement, memo } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/shadcn-ui/ui/sheet';
import { Menu } from 'lucide-react';

interface OpenMobileSidebarProps {
  sidebar: ReactElement;
}

export const OpenMobileSidebar: FC<OpenMobileSidebarProps> = memo(({ sidebar }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        {sidebar}
      </SheetContent>
    </Sheet>
  );
});
