'use client'

import { QueryResultRow } from "@vercel/postgres";
import { useState } from "react";
import { CheckoutData } from "@/app/lib/checkout/definitions";
import pubSub from "@/app/lib/utils/pubsub";

export default function CartCount({ sku, checkoutData }: { sku: string; checkoutData: CheckoutData }) {

  const [loadedData, setLoadedData] = useState(checkoutData)
  const [isVisible, setIsVisible] = useState(loadedData.productLines[sku] !== undefined)

  pubSub.on('checkout:updated', (event: CustomEventInit) => {
    setLoadedData(event.detail.checkoutData)
    setIsVisible(event.detail.checkoutData.productLines[sku] !== undefined)
  })

  if (isVisible) {
    return (<span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {loadedData.productLines[sku].qty} in cart
  </span>)
  }
}
