'use client';

import { FC, memo, useCallback, useState } from 'react';
import { AxiosError } from 'axios';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/shadcn-ui/ui/dialog';
import { useModal } from '@/shared/lib/hooks/use-modal';
import { Separator } from '@/shared/shadcn-ui/ui/separator';
import { Button } from '@/shared/shadcn-ui/ui/button';
import { useToast } from '@/shared/shadcn-ui/ui/use-toast';

import { subscriptionAPI } from '@/shared/api/subscription-api';

interface ProModalProps {

}

export const ProModal: FC<ProModalProps> = memo(() => {
  const { type, isOpen, onClose } = useModal();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === 'pro-modal';

  const onSubscribe = useCallback(async () => {
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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4 ">
          <DialogTitle className="text-center">
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create
            {' '}
            <span className="text-sky-500 font-medium">Custom AI</span>
            {' '}
            companions
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between ">
          <p className="text-2xl font-medium">
            $4
            <span className="text-sm font-normal">
              .99 / month
            </span>
          </p>
          <Button variant="premium" onClick={onSubscribe} disabled={isLoading}>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
