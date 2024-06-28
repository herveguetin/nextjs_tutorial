import { QueryResultRow, sql } from "@vercel/postgres";

export async function fetchCartLines() {
    try {
        return await sql`
            SELECT *
            FROM cart_lines
            WHERE cart_id = 1`;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cart lines data.');
    }
}

export async function fetchCheckoutData() {
    const cartLines = await fetchCartLines()
    const sumQty: number = cartLines.rows.reduce((accumulator: number, currentValue: QueryResultRow) => accumulator + currentValue.qty, 0);
    return { items: { count: sumQty } };
}

export async function addToCart(qty: number) {
    try {
        let cartLines = await fetchCartLines()
        let firstLine = cartLines.rows[0]

        await sql`
            UPDATE cart_lines
            SET qty = ${firstLine.qty + qty}
            WHERE id = ${firstLine.id}`;

        return await fetchCheckoutData()
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add to cart.');
    }
}
