'use client';

import { FC, memo } from 'react';
import { Avatar, AvatarImage } from '@/shared/shadcn-ui/ui/avatar';

interface BotAvatarProps {
  src: string;
}

export const BotAvatar: FC<BotAvatarProps> = memo(({ src }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
});
