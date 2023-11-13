'use client';

import { FC, FormEvent, memo } from 'react';

import { Role } from '@prisma/client';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';

import { ChatForm } from '@/features/chat-form';
import { AppMessage } from '@/entities/message';
import { CompanionWithMessagesAndMessagesCount } from '@/entities/companion/model/types/companions';

import { useCompanionMessages } from '../../model/use-messages';
import { ChatMessages } from '../companion-chat-messages/companion-chat-messages';
import { ChatHeader } from '../companion-chat-header/chat-header';

interface ChatProps {
  companion: CompanionWithMessagesAndMessagesCount;
}

export const CompanionChat: FC<ChatProps> = memo(({ companion }) => {
  const router = useRouter();
  const { messages, addNewMessages, setMessages } = useCompanionMessages();

  const onFinish = (prompt: string, completion: string) => {
    const systemMessage: AppMessage = {
      role: Role.system,
      content: completion,
    };

    addNewMessages([systemMessage]);
    setInput('');

    router.refresh();
  };

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({ api: `/api/chat/${companion.id}`, onFinish });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: AppMessage = {
      role: Role.user,
      content: input,
    };

    addNewMessages([userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader setMessages={setMessages} companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        input={input}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
    </div>
  );
});
