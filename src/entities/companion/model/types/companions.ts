import { Companion, Message } from '@prisma/client';

export type CompanionWithMessagesCount = Companion & {
  _count: {
    messages: number;
  }
};

export type CompanionWithMessagesAndMessagesCount = Companion & {
  messages: Message[];
  _count: {
    messages: number;
  }
};
