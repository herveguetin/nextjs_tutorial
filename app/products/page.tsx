import { lusitana } from '@/app/ui/fonts';
import { Suspense } from "react";
import DashboardSkeleton from '@/app/ui/skeletons';
import ProductList from "@/app/ui/products/product-list";
import Indicator from "@/app/ui/minicart/indicator";
export default async function Page() {
  return (<main>
    <div className="flex">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Products
      </h1>
      <div className="ml-auto mr-0">
        <Indicator/>
      </div>
    </div>
    <div className="mx-auto max-w-screen-xl">
      <Suspense fallback={<DashboardSkeleton/>}>
        <ProductList/>
      </Suspense>
    </div>
  </main>);
}
