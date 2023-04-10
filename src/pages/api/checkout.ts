import { stripe } from '@/lib/stripe';
import {NextApiRequest, NextApiResponse} from 'next';
import Stripe from 'stripe';
interface BodyProps{
    ids: string[]
}

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    const {ids} = req.body as BodyProps;
    if(req.method !== 'POST')
            return res.status(405).json({message: 'Method not allowed'})
    
    if(!ids)
        return res.status(400).json({message: 'Price not found'})
    
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const lineItems = ids.map(id =>  ({price: id, quantity: 1 })) as Stripe.Checkout.SessionCreateParams.LineItem[];
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: lineItems
    });

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}