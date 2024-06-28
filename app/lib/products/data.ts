import { sql } from "@vercel/postgres";

export async function fetchProducts() {
  try {
    const result = await sql`
      SELECT *
      FROM products`;
    return result.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch prooducts.');
  }
}
