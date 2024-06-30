import { QueryResultRow } from "@vercel/postgres";

export type CheckoutData = {
  totals: {
    itemsCount: number,
    total: number,
    discount: number,
    shipping: number,
    tax: number,
    grandTotal: number
  }
  cartLines: QueryResultRow[] | [],
  [productLines: string]: any
};
