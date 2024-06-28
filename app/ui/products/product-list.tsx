import { fetchProducts } from "@/app/lib/products/data";
import AddToCartButton from '@/app/ui/add-to-cart'
import { formatCurrency } from "@/app/lib/utils";
import ResponsiveImage from '@/app/ui/image';

export default async function ProductList() {
  const products = await fetchProducts()
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <ResponsiveImage
            desktop={{ src: product.image, width: 550, height: 600 }}
            mobile={{ src: product.image, width: 550, height: 600 }}
            alt={product.name}
          />
          <div className="mt-4 text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
            {product.name}
          </div>
          <ul className="mt-2 flex items-center gap-4">
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
              </svg>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.sku}</p>
            </li>
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{formatCurrency(product.price * 100)}</p>
            <AddToCartButton sku={product.sku}/>
          </div>
        </div>
      ))}
    </div>)
}
