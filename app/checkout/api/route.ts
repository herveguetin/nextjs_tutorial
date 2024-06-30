import { addToCart, removeFromCart } from '@/app/lib/checkout/data'
import { assertCart } from '@/app/lib/checkout/session'

export async function POST(request: Request) {
  await assertCart()
  const payload = await request.json()
  const checkoutData = await addToCart(payload.sku, payload.qty)
  return Response.json(checkoutData)
}

export async function DELETE(request: Request) {
  const payload = await request.json()
  const checkoutData = await removeFromCart(payload.sku)
  return Response.json(checkoutData)
}

