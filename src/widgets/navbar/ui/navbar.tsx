'use client';

import { FC, memo } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ThemeSwitcher } from '@/features/theme-switcher';

const font = Poppins({ weight: '600', subsets: ['latin'] });

interface NavbarProps {

}

export const Navbar: FC<NavbarProps> = memo(() => {
  return (
    <nav className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className,
            )}
          >
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
        <UserButton />
      </div>
    </nav>
  );
});
