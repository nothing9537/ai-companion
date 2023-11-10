'use client';

import { FC, memo } from 'react';
import { CompanionWithMessagesAndMessagesCount } from '@/shared/types/companions';
import { ChatHeader } from '../chat-header/chat-header';

interface ChatProps {
  companion: CompanionWithMessagesAndMessagesCount;
}

export const Chat: FC<ChatProps> = memo(({ companion }) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      Chat
    </div>
  );
});
