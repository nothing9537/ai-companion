import { Companion } from '@prisma/client';

export type CompanionWithMessagesCount = Companion & {
  _count: {
    messages: number;
  }
};
