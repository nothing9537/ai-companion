'use client';

import { FC, memo, useCallback } from 'react';
import { CompanionWithMessagesCount } from '@/shared/types/companions';
import Image from 'next/image';

import { CompanionCard } from '../companion-card/companion-card';

interface CompanionsListProps {
  companions: CompanionWithMessagesCount[];
}

export const CompanionsList: FC<CompanionsListProps> = memo(({ companions }) => {
  const renderCompanion = useCallback((companion: CompanionWithMessagesCount) => (
    <CompanionCard
      messageCount={companion._count.messages}
      companion={companion}
      key={companion.id}
    />
  ), []);

  if (!companions.length) {
    return (
      <div className="p-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image
            fill
            className="grayscale"
            alt="Empty"
            src="/empty.png"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          No companions found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {companions.map(renderCompanion)}
    </div>
  );
});
