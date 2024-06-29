'use client'

import { CheckoutData } from "@/app/lib/checkout/definitions";
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import pubSub from "@/app/lib/utils/pubsub";

export default function Indicator({ checkoutData }: { checkoutData: CheckoutData }) {
  const [loadedData, setLoadedData] = useState(checkoutData);
  pubSub.on('checkout:updated', (event: CustomEventInit) => setLoadedData(event.detail.checkoutData))

  return (<div className="relative inline-flex items-center px-1 text-sm font-medium text-center">
      <ShoppingCartIcon className="h-8 w-8"/>
      <div
        className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
        {loadedData.items.count}
      </div>
    </div>);
}
