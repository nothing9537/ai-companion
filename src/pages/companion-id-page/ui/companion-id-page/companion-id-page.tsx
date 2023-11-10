import { FC } from 'react';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import { CompanionForm } from '@/features/companion-form';
import { db } from '@/shared/lib/db';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  }
}

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  const { userId } = auth();

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

  return (
    <CompanionForm
      categories={categories}
      initialData={companion}
    />
  );
};

export default CompanionIdPage;
