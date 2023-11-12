import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/shared/lib/db';
import { stripe } from '@/shared/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error) {
      return new NextResponse(`Webhook error: ${error}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!session?.metadata?.userId) {
        return new NextResponse('User ID is required', { status: 400 });
      }

      await db.userSubscription.create({
        data: {
          userId: session?.metadata?.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }

    if (event.type === 'invoice.payment_succeeded') {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

      await db.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('[WEBHOOK_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
