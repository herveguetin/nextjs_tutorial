'use client'
import { addToCart } from '@/app/lib/checkout/ajax'
import { Button } from '@/app/ui/button';
import { ChangeEvent, useState } from "react";
import { CheckoutData } from "@/app/lib/checkout/definitions";
import pubSub from "@/app/lib/utils/pubsub";

type Props = {
  qty?: number; sku: string;
}

export default function AddToCart({ qty, sku }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [addedQty, setAddedQty] = useState(1)

  async function onButtonClick() {
    setIsLoading(true)
    const checkoutData: CheckoutData = await addToCart(sku, addedQty)
    pubSub.emit()('checkout:updated', { detail: { checkoutData } })
    setIsLoading(false)
  }

  function onQtyChange(event: ChangeEvent<HTMLSelectElement>) {
    setAddedQty(parseInt(event?.target?.value) || 1)
  }

  return (<>
      <select onChange={onQtyChange} id={`${sku}_qty`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <Button onClick={onButtonClick} disabled={isLoading}>Add to cart</Button>
    </>)
}
