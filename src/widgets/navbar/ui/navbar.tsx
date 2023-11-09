'use client';

import { FC, memo } from 'react';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

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

            )}
          >
            AI.Companion
          </h1>
        </Link>
      </div>
    </nav>
  );
});
