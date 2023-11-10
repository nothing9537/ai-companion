import { db } from '@/shared/lib/db';
import { Chat } from '@/widgets/chat';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface ChatIdPageProps {
  params: {
    chatId: string;
  }
}

const ChatIdPage: FC<ChatIdPageProps> = async ({ params }) => {
  const { chatId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect('/');
  }

  return (
    <div>
      <Chat companion={companion} />
    </div>
  );
};

export default ChatIdPage;
