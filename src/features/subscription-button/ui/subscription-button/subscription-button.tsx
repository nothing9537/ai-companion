'use client';

import { Sparkles } from 'lucide-react';
import { FC, memo, useCallback, useState } from 'react';
import { AxiosError } from 'axios';

import { Button } from '@/shared/shadcn-ui/ui/button';
import { subscriptionAPI } from '@/shared/api/subscription-api';
import { useToast } from '@/shared/shadcn-ui/ui/use-toast';

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: FC<SubscriptionButtonProps> = memo(({ isPro = false }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const onManageSubscription = useCallback(async () => {
    setIsLoading(true);

    const response = await subscriptionAPI.getSubscriptionUrl();

    if (response instanceof AxiosError) {
      toast({ variant: 'destructive', description: 'Something went wrong when subscribing.' });
      setIsLoading(false);
      return;
    }

    window.location.href = response.url;
  }, [toast]);

  return (
    <Button
      onClick={onManageSubscription}
      size="sm"
      variant={isPro ? 'default' : 'premium'}
      disabled={isLoading}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
});
