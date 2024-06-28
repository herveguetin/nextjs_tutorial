import { addToCart } from '@/app/lib/checkout/data'

export async function POST(request: Request) {
  const payload = await request.json()
  const checkoutData = await addToCart(payload.qty)
  return Response.json(checkoutData)
}
