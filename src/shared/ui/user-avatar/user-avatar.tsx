'use client';

import { FC, memo } from 'react';
import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarImage } from '@/shared/shadcn-ui/ui/avatar';
import { cn } from '@/shared/lib/utils';

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = memo(({ className }) => {
  const { user } = useUser();

  return (
    <Avatar className={cn('h-12 w-12', className)}>
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
});
