'use client'

import { Card } from "@/app/ui/dashboard/cards";
import AddToCartButton from '@/app/ui/minicart/add-to-cart'
import { CheckoutData } from "@/app/lib/checkout/definitions";
import { useEffect, useState } from 'react';

export default function MinicartContent({ checkoutData }: { checkoutData: CheckoutData }) {
  const [loadedData, setLoadedData] = useState(checkoutData);

  useEffect(() => {
    function update(event: CustomEventInit) {
      setLoadedData(event.detail.checkoutData)
    }

    window.addEventListener('checkout:updated', update);
    return () => {
      window.removeEventListener('checkout:updated', update);
    };
  })

  return (<>
      <Card title="Minicart" value={`${loadedData.items.count} items`} type="invoices"/>
      <AddToCartButton/>
    </>);
}
