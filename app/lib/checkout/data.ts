import { getSessionData } from './session'
import type { CartLine } from "@prisma/client"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getCartId(): Promise<string> {
  const session = await getSessionData()
  return session?.cart?.id.toString()
}

export async function fetchCartLines() {
  const cartId = await getCartId()
  return cartId ?
    prisma.cartLine.findMany({
      where: { cart_id: { equals: cartId } },
      include: { product: true }
    })
    : [];
}

export async function fetchCheckoutData() {
  const cartLines = await fetchCartLines()
  const itemsCount: number = cartLines.reduce((accumulator: number, currentValue: CartLine) => accumulator + currentValue.qty, 0);
  const discountRate: number = 10
  // @ts-ignore
  const total: number = cartLines.reduce((accumulator: number, currentValue: CartLine) => accumulator + currentValue.qty * currentValue.product.price, 0);
  const discount: number = total * discountRate / 100
  const shipping: number = 6.99
  const grandTotal: number = total - discount + shipping
  const tax: number = total * 0.2

  let productLines: any = {}
  cartLines.map((cartLine: any) => {
    const isNew = !productLines[cartLine.sku]
    productLines[cartLine.sku] = isNew ? cartLine : productLines[cartLine.sku]
    productLines[cartLine.sku].qty += isNew ? 0 : cartLine.qty
  })

  return {
    totals: {
      itemsCount: itemsCount, total: total, discount: discount, shipping: shipping, tax: tax, grandTotal: grandTotal
    }, cartLines: cartLines, productLines: productLines
  };
}

export async function addToCart(sku: string, qty: number) {
  const cartId = await getCartId()
  await prisma.cartLine.create({
    data: {
      cart_id: cartId,
      sku: sku,
      qty: qty
    },
  })
  return await fetchCheckoutData()
}

export async function removeFromCart(sku: string) {
  const cartId = await getCartId()
  console.log(cartId)
  await prisma.$queryRaw`
    DELETE
    FROM "CartLine"
    WHERE cart_id::text = ${cartId}
      AND sku = ${sku}`
  return await fetchCheckoutData()
}
