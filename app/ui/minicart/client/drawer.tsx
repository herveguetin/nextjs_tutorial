'use client'

import { CheckoutData } from "@/app/lib/checkout/definitions";
import { useState } from 'react';
import pubSub from "@/app/lib/utils/pubsub";
import clsx from 'clsx';
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ResponsiveImage from '@/app/ui/image';
import { formatCurrency } from "@/app/lib/utils";
import { removeFromCart } from "@/app/lib/checkout/ajax";
import { useLockBodyScroll, useToggle } from 'react-use'

export default function Drawer({ checkoutData }: { checkoutData: CheckoutData }) {
  const [loadedData, setLoadedData] = useState(checkoutData);
  const [isVisible, setIsVisible] = useState(false);
  const [locked, toggleLocked] = useToggle(false)

  useLockBodyScroll(locked)

  pubSub.on('checkout:updated', (event: CustomEventInit) => {
    setLoadedData(event.detail.checkoutData)
    setIsVisible(true)
    toggleLocked()
  })
  pubSub.on('minicart:drawer:toggle', (event: CustomEventInit) => {
    setIsVisible(event.detail)
    toggleLocked()
  })

  const onClose = () => {
    toggleLocked()
    setIsVisible(false)
  }
  const remove = async (sku: string) => {
    const checkoutData = await removeFromCart(sku)
    setLoadedData(checkoutData)
    pubSub.emit()('checkout:updated', { detail: { checkoutData: checkoutData } })
  }

  function EmptyCart() {
    return (<>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
        Cart is empty.
      </div>
    </>)
  }

  function CartContent() {
    return (<>
      {/* Product lines */}
      {Object.values(loadedData.productLines).map((productLine: any) => (<div key={productLine.id}>
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between gap-6 space-y-0">
            <ResponsiveImage
              desktop={{ src: productLine.product.image, width: 40, height: 40 }}
              mobile={{ src: productLine.product.image, width: 40, height: 40 }}
              alt={productLine.product.name}
            />
            <div className="w-full min-w-0 flex-1 space-y-4 max-w-md">
              {productLine.qty} x {productLine.product.name}
              <div className="flex items-center gap-4">
                <button onClick={() => remove(productLine.sku)} type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline ">
                  <XMarkIcon className="h-5 w-5"/>
                  Remove
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-end order-4 w-20">
                <p
                  className="text-base font-bold text-gray-900 ">{formatCurrency(productLine.product.price * 100 * productLine.qty)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>))}

      {/* Totals */}
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 mt-4 shadow-sm">
        <div className="text-xl font-semibold text-gray-900 ">
          Order summary
          <div>
            <span
              className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">{loadedData.totals.itemsCount} item(s)</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 ">Total</dt>
              <dd
                className="text-base font-medium text-gray-900 ">{formatCurrency(loadedData.totals.total * 100)}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 ">Discount</dt>
              <dd
                className="text-base font-medium text-green-600">{formatCurrency(loadedData.totals.discount * 100 * -1)}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 ">Shipping</dt>
              <dd
                className="text-base font-medium text-gray-900 ">{formatCurrency(loadedData.totals.shipping * 100)}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 ">Tax</dt>
              <dd className="text-base font-medium text-gray-900 ">{formatCurrency(loadedData.totals.tax * 100)}</dd>
            </dl>
          </div>
          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
            <dt className="text-base font-bold text-gray-900 ">Grand total</dt>
            <dd
              className="text-base font-bold text-gray-900 ">{formatCurrency(loadedData.totals.grandTotal * 100)}</dd>
          </dl>
        </div>
        <a href="#"
           className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Proceed to Checkout
        </a>
      </div>
    </>)
  }

  return (<>
    <div id="drawer-right-example"
         className={clsx('fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-full border border-l-gray-200 shadow-xl md:w-[28rem]', {
           'translate-x-full': !isVisible, 'translate-x-0': isVisible,
         })}
         tabIndex={-1}
         aria-labelledby="drawer-right-label"
    >

      {/* Header */}
      <h5 id="drawer-right-label" className="inline-flex items-center mb-8 text-base font-semibold text-gray-500">
        <ShoppingCartIcon className="h-6 w-6 mr-2"/>
        Shopping cart
      </h5>
      <button onClick={onClose}
              type="button"
              aria-controls="drawer-right-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center">
        <XMarkIcon className="h-6 w-6"/>
        <span className="sr-only">Close menu</span>
      </button>

      {/* Content */}
      {loadedData.totals.itemsCount > 0 ? <CartContent/> : <EmptyCart/>}

    </div>
  </>);
}
