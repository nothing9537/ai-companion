'use client';

import { FC, memo } from 'react';
import { Companion } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { MessagesSquare } from 'lucide-react';
import { Card, CardFooter, CardHeader } from '@/shared/shadcn-ui/ui/card';

interface CompanionCardProps {
  companion: Companion;
  messageCount?: number;
}

export const CompanionCard: FC<CompanionCardProps> = memo(({ companion, messageCount }) => {
  return (
    <Card className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0">
      <Link href={`/chat/${companion.id}`}>
        <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
          <div className="relative w-32 h-32">
            <Image
              fill
              src={companion.imageUrl}
              className="rounded-xl object-cover"
              alt={companion.name}
            />
          </div>
          <p className="font-bold">
            {companion.name}
          </p>
          <p className="text-sm">
            {companion.description}
          </p>
        </CardHeader>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <p className="lowercase">
            @
            {companion.userName}
          </p>
          {(messageCount !== null || messageCount !== undefined) && (
            <div className="flex items-center ">
              <MessagesSquare className="w-4 h-3 mr-1" />
              {messageCount}
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
});
