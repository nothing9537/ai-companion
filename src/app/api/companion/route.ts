import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/shared/lib/db';
import { CompanionFormSchemaValues } from '@/entities/companion';
import { checkSubscription } from '@/shared/lib/subscription';

export async function POST(req: Request) {
  try {
    const body = await req.json() as CompanionFormSchemaValues;
    const user = await currentUser();
    const { name, description, instructions, seed, categoryId, imageUrl } = body;
    const isPro = await checkSubscription();

    if (!user || !user.id || !user.username) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!body) {
      return new NextResponse('Mandatory data missing', { status: 400 });
    }

    if (!isPro) {
      return new NextResponse('Unsubscribed', { status: 403 });
    }

    const companion = await db.companion.create({
      data: {
        userId: user.id,
        userName: user.username,
        instructions,
        description,
        categoryId,
        imageUrl,
        name,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.error('[COMPANION_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
