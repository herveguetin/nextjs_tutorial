import { QueryResultRow, sql } from "@vercel/postgres";
import { getSessionData } from './session'
import { UUID } from "node:crypto";

export async function getCartId(): Promise<UUID | undefined> {
  const session = await getSessionData()
  return session?.cart?.id
}

export async function fetchCartLines() {
  const cartId = await getCartId()
  try {
    return await sql`
      SELECT *
      FROM cart_lines
             JOIN products ON cart_lines.sku = products.sku
      WHERE cart_lines.cart_id = ${cartId}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cart lines data.');
  }
}

export async function fetchCheckoutData() {
  const cartLines = await fetchCartLines()
  const itemsCount: number = cartLines.rows.reduce((accumulator: number, currentValue: QueryResultRow) => accumulator + currentValue.qty, 0);
  const discountRate: number = 10
  const total: number = cartLines.rows.reduce((accumulator: number, currentValue: QueryResultRow) => accumulator + currentValue.qty * currentValue.price, 0);
  const discount: number = total * discountRate / 100
  const shipping: number = 6.99
  const grandTotal: number = total - discount + shipping
  const tax: number = total * 0.2

  let productLines: any = {}
  cartLines.rows.map(cartLine => {
    const isNew = !productLines[cartLine.sku]
    productLines[cartLine.sku] = isNew ? cartLine : productLines[cartLine.sku]
    productLines[cartLine.sku].qty += isNew ? 0 : cartLine.qty
  })

  return {
    totals: {
      itemsCount: itemsCount, total: total, discount: discount, shipping: shipping, tax: tax, grandTotal: grandTotal
    }, cartLines: cartLines.rows, productLines: productLines
  };
}

export async function addToCart(sku: string, qty: number) {
  try {
    const cartId = await getCartId()
    await sql`
      INSERT INTO cart_lines (cart_id, sku, qty)
      VALUES (${cartId}, ${sku}, ${qty})`
    return await fetchCheckoutData()
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart.');
  }
}

export async function removeFromCart(sku: string) {
  try {
    const cartId = await getCartId()
    await sql`
      DELETE
      FROM cart_lines
      WHERE cart_id = ${cartId}
        AND sku = ${sku}`
    return await fetchCheckoutData()
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart.');
  }
}
