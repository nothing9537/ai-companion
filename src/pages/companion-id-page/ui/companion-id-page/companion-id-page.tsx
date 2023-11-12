import { FC } from 'react';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CompanionForm } from '@/features/companion-form';
import { checkSubscription } from '@/shared/lib/subscription';
import { db } from '@/shared/lib/db';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  }
}

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  const { userId } = auth();
  const isPro = await checkSubscription();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await db.category.findMany();

  if (!isPro) {
    return redirect('/');
  }

  return (
    <CompanionForm
      categories={categories}
      initialData={companion}
    />
  );
};

export default CompanionIdPage;
