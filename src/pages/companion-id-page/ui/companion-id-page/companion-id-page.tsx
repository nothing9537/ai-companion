import { FC } from 'react';

import { db } from '@/shared/lib/db';
import { CompanionForm } from '@/widgets/companion-form';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  }
}

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await db.category.findMany();

  return (
    <div>
      <CompanionForm
        categories={categories}
        initialData={companion}
      />
    </div>
  );
};

export default CompanionIdPage;
