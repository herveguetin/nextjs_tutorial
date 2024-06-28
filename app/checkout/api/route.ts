import { addToCart } from '@/app/lib/checkout/data'
import { getSessionData } from "@/app/lib/checkout/session";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

async function assertCart() {
  const session = await getSessionData()
  if (!session?.cart?.id) {
    session.cart = { id: uuidv4() }
    await session.save();
  }
}

export async function POST(request: Request) {
  await assertCart()
  const payload = await request.json()
  const checkoutData = await addToCart(payload.sku, payload.qty)
  return Response.json(checkoutData)
}
