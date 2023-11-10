'use client';

import { FC, ReactElement, memo } from 'react';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcn-ui/ui/button';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { OpenMobileSidebar } from '@/features/open-mobile-sidebar';

const font = Poppins({ weight: '600', subsets: ['latin'] });

interface NavbarProps {
  sheetContent: ReactElement;
}

export const Navbar: FC<NavbarProps> = memo(({ sheetContent }) => {
  return (
    <nav className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <OpenMobileSidebar sidebar={sheetContent} />
        <Link href="/">
          <h1 className={cn('hidden md:block text-xl md:text-3xl font-bold text-primary', font.className)}>
            AI.Companion
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <ThemeSwitcher />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
});
