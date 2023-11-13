'use client';

import { FC, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { AxiosError } from 'axios';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/shadcn-ui/ui/dropdown-menu';
import { CompanionWithMessagesAndMessagesCount } from '@/entities/companion/model/types/companions';
import { Button } from '@/shared/shadcn-ui/ui/button';
import { BotAvatar } from '@/shared/ui/bot-avatar';
import { useToast } from '@/shared/shadcn-ui/ui/use-toast';
import { companionAPI } from '@/entities/companion';
import { AppMessage } from '@/entities/message';

interface ChatHeaderProps {
  companion: CompanionWithMessagesAndMessagesCount;
  setMessages: (messages: AppMessage[]) => void;
}

export const ChatHeader: FC<ChatHeaderProps> = memo(({ companion, setMessages }) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onBack = useCallback(() => {
    setMessages([]);
    router.back();
  }, [router, setMessages]);
  const onEdit = useCallback(() => router.push(`/companion/${companion.id}`), [companion.id, router]);
  const onDelete = useCallback(async () => {
    const response = await companionAPI.deleteCompanion(companion.id);

    if (response instanceof AxiosError) {
      toast({ description: `Something went wrong when deleting ${companion.name} Companion`, variant: 'destructive' });
      return;
    }

    toast({ description: `Successfully deleted ${companion.name} Companion` });
    router.refresh();
    router.push('/');
  }, [companion.id, companion.name, toast, router]);

  return (
    <header className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={onBack}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.imageUrl} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-4 h-4 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by
            {' '}
            {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-rose-500" onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
});
