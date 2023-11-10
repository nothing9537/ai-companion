import { db } from '@/shared/lib/db';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { CompanionFormSchemaValues } from '@/entities/companion';

export async function PATCH(req: Request, { params }: { params: { companionId: string } }) {
  try {
    const { companionId } = params;
    const body = await req.json() as CompanionFormSchemaValues;
    const user = await currentUser();
    const { name, description, instructions, seed, categoryId, imageUrl } = body;

    if (!companionId) {
      return new NextResponse("Mandatory parameter 'companionId' missed", { status: 400 });
    }

    if (!user || !user.id || !user.username) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!body) {
      return new NextResponse('Mandatory data missed', { status: 400 });
    }

    // TODO Check for subscription

    const companion = await db.companion.update({
      where: {
        id: companionId,
      },
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
    console.error('[COMPANION_PATCH]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { companionId: string } }) {
  try {
    const { companionId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const companion = await db.companion.delete({
      where: {
        id: companionId,
        userId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.error('COMPANION_DELETE', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
