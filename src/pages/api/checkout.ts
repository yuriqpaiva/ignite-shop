import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/contexts/CartContext';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }

  const products = req.body as Product[];

  const formattedProducts = products.map((product) => {
    return {
      price: product.defaultPriceId,
      quantity: product.quantity,
    };
  });

  if (!products) {
    return res.status(400).json({ error: 'Products are required' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: formattedProducts,
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
