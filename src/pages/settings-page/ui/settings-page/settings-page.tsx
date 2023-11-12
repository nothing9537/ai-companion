import { FC } from 'react';
import { Metadata } from 'next';

import { checkSubscription } from '@/shared/lib/subscription';
import { SubscriptionButton } from '@/features/subscription-button';

export const metadata: Metadata = {
  title: 'AI Companion / Settings',
  description: 'Manage your AI Companion subscription',
};

interface SettingsPageProps {

}

export const SettingsPage: FC<SettingsPageProps> = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
      <h3 className="text-lg font-medium">
        Settings
      </h3>
      <div className="text-muted-foreground text-sm">
        {isPro ? (
          'You are currently on a Pro plan.'
        ) : (
          'You are currently on a Free plan.'
        )}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};
