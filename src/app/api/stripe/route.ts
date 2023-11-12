import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';
import { absoluteUrl } from '@/shared/lib/utils';
import { db } from '@/shared/lib/db';
import { stripe } from '@/shared/lib/stripe';

const settingsUrl = absoluteUrl('/settings');

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!user || !userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const subscription = await db.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (subscription && subscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Companion PRO',
              description: 'Create custom AI Companions',
            },
            unit_amount: 999,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.error('STRIPE_GET', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
