'use client'

import { QueryResultRow } from "@vercel/postgres";
import { useState } from "react";
import { CheckoutData } from "@/app/lib/checkout/definitions";
import pubSub from "@/app/lib/utils/pubsub";

export default function CartCount({ sku, checkoutData }: { sku: string; checkoutData: CheckoutData }) {

  const [loadedData, setLoadedData] = useState(checkoutData)
  const [isVisible, setIsVisible] = useState(getSkuCount(loadedData.cartLines) > 0)

  pubSub.on('checkout:updated', (event: CustomEventInit) => {
    setLoadedData(event.detail.checkoutData)
    setIsVisible(getSkuCount(event.detail.checkoutData.cartLines) > 0)
  })

  function getSkuCount(lines: QueryResultRow[] | []) {
    return lines.reduce((accumulator: number, currentValue: any) => {
      return currentValue.sku === sku ? accumulator + currentValue.qty : accumulator;
    }, 0);
  }

  if (isVisible) {
    return (<span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {getSkuCount(loadedData.cartLines)} in cart
  </span>)
  }
}
