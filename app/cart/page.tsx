import { lusitana } from '@/app/ui/fonts';
import Minicart from '@/app/ui/minicart/minicart';
import { Suspense } from "react";
import { CardSkeleton } from '@/app/ui/skeletons';
export default async function Page() {
  return (<main>
    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Cart
    </h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardSkeleton/>}>
        <Minicart/>
      </Suspense>
    </div>
  </main>);
}
