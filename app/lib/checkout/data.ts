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
      WHERE cart_id = ${cartId}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cart lines data.');
  }
}

export async function fetchCheckoutData() {
  const cartLines = await fetchCartLines()
  const sumQty: number = cartLines.rows.reduce((accumulator: number, currentValue: QueryResultRow) => accumulator + currentValue.qty, 0);
  return { items: { count: sumQty }, cartLines: cartLines.rows };
}

export async function addToCart(sku: string, qty: number) {
  try {
    let cartLines = await fetchCartLines()
    const cartId = cartLines.rows.length ? cartLines.rows[0].cart_id : await getCartId()

    await sql`
        INSERT INTO cart_lines (cart_id, sku, qty)
        VALUES (${cartId}, ${sku}, ${qty})`

    return await fetchCheckoutData()
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart.');
  }
}
