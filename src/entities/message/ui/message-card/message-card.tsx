'use client';

import { FC, memo } from 'react';
import { useTheme } from 'next-themes';
import { Role } from '@prisma/client';
import { Copy } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { useToast } from '@/shared/shadcn-ui/ui/use-toast';

import { cn } from '@/shared/lib/utils';
import { BotAvatar } from '@/shared/ui/bot-avatar';
import { UserAvatar } from '@/shared/ui/user-avatar';

import { Button } from '@/shared/shadcn-ui/ui/button';
import { AppMessage } from '../../model/types';

export interface MessageCardProps extends AppMessage {
  isLoading?: boolean;
  imageUrl?: string;
}

export const MessageCard: FC<MessageCardProps> = memo(({ role, content, imageUrl, isLoading }) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = async () => {
    if (!content) {
      return;
    }

    await navigator.clipboard.writeText(content);

    toast({ description: 'Message copied to clipboard' });
  };

  const userClasses = 'justify-end';
  const systemClasses = '';

  return (
    <div
      className={cn('group flex items-start gap-x-3 py-4 w-full', role === Role.system ? systemClasses : userClasses)}
    >
      {role !== Role.user && imageUrl && <BotAvatar src={imageUrl} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader color={theme === 'light' ? 'black' : 'White'} size={5} />
        ) : (
          <p>{content}</p>
        )}
      </div>
      {role === Role.user && <UserAvatar />}
      {role !== Role.user && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
});
