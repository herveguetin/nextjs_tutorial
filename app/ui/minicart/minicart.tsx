import Content from "@/app/ui/minicart/content";
import { fetchCheckoutData } from "@/app/lib/checkout/data";


export default async function Minicart() {
  const checkoutData = await fetchCheckoutData();
  return (<>
      <Content checkoutData={checkoutData}/>
    </>);
}
