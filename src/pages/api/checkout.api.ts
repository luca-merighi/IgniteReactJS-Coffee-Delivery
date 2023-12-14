import { NextApiRequest, NextApiResponse } from 'next'

export interface OrderProps {
    street: string,
    number: string,
    district: string,
    city: string,
    uf: string,
    paymentType: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { order } = req.body as { order: OrderProps}
    
    if(req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" })
    }
    
    return res.status(201).json({
        checkoutUrl: `http://localhost:3000/checkout-success/success?order=${order}`
    })
}