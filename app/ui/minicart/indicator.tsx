import { fetchCheckoutData } from "@/app/lib/checkout/data";
import IndicatorContent from "@/app/ui/minicart/indicator-content";

export default async function Indicator() {
  const checkoutData = await fetchCheckoutData();
  return (<>
    <IndicatorContent checkoutData={checkoutData}/>
  </>);
}
