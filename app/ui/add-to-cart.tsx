'use client'
import { addToCart } from '@/app/lib/checkout/ajax'
import { Button } from '@/app/ui/button';
import { useState } from "react";
import { CheckoutData } from "@/app/lib/checkout/definitions";

let addedQty: number = 1

type Props = {
  qty?: number;
  sku: string;
}

export default function AddToCartButton({ qty, sku }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function onButtonClick() {
    setIsLoading(true)
    const checkoutData: CheckoutData = await addToCart(sku, addedQty)
    window.dispatchEvent(new CustomEvent('checkout:updated', { detail: { checkoutData: checkoutData } }))
    setIsLoading(false)
  }

  addedQty = qty || addedQty
  return (<Button onClick={onButtonClick} disabled={isLoading}>Add to cart</Button>)
}
