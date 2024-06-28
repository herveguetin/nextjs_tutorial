'use client'

import { QueryResultRow } from "@vercel/postgres";
import { useEffect, useState } from "react";
import { CheckoutData } from "@/app/lib/checkout/definitions";

export default function CartCount({ sku, checkoutData }: { sku: string; checkoutData: CheckoutData }) {

  const [loadedData, setLoadedData] = useState(checkoutData)
  const [isVisible, setIsVisible] = useState(getSkuCount(loadedData.cartLines) > 0)

  function getSkuCount(lines: QueryResultRow[] | []) {
    return lines.reduce((accumulator: number, currentValue: any) => {
      return currentValue.sku === sku ? accumulator + currentValue.qty : accumulator;
    }, 0);
  }

  useEffect(() => {
    function update(event: CustomEventInit) {
      setLoadedData(event.detail.checkoutData)
      setIsVisible(getSkuCount(event.detail.checkoutData.cartLines) > 0)
    }

    window.addEventListener('checkout:updated', update);
    return () => {
      window.removeEventListener('checkout:updated', update);
    };
  })

  if (isVisible) {
    return (<span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {getSkuCount(loadedData.cartLines)} in cart
  </span>)
  }
}
