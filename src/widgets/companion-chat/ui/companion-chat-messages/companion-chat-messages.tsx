'use client';

import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Companion, Role } from '@prisma/client';

import { AppMessage, MessageCard } from '@/entities/message';

interface ChatMessagesProps {
  companion: Companion;
  isLoading: boolean;
  messages: AppMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = memo(({ companion, isLoading, messages }) => {
  const [fakeLoading, setFakeLoading] = useState(!messages.length);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const renderMessage = useCallback(({ content, role }: AppMessage) => (
    <MessageCard
      key={content}
      role={role}
      content={content}
      imageUrl={companion.imageUrl}
    />
  ), [companion.imageUrl]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <MessageCard
        isLoading={fakeLoading}
        imageUrl={companion.imageUrl}
        role={Role.system}
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map(renderMessage)}
      {isLoading && (
        <MessageCard
          role={Role.system}
          imageUrl={companion.imageUrl}
          isLoading={isLoading}
        />
      )}
    </div>
  );
});
