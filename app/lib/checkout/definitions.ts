import { QueryResultRow } from "@vercel/postgres";

export type CheckoutData = {
  items: {
    count: number
  }
  cartLines: QueryResultRow[] | []
};
