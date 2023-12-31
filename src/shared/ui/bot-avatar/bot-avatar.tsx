'use client';

import { FC, memo } from 'react';
import { Avatar, AvatarImage } from '@/shared/shadcn-ui/ui/avatar';
import { cn } from '@/shared/lib/utils';

interface BotAvatarProps {
  src: string;
  className?: string;
}

export const BotAvatar: FC<BotAvatarProps> = memo(({ src, className }) => {
  return (
    <Avatar className={cn('h-12 w-12', className)}>
      <AvatarImage src={src} className="object-cover" />
    </Avatar>
  );
});
