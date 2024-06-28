import { fetchCheckoutData } from "@/app/lib/checkout/data";
import IndicatorClient from "@/app/ui/minicart/client/indicator";

export default async function Indicator() {
  const checkoutData = await fetchCheckoutData();
  return (<>
    <IndicatorClient checkoutData={checkoutData}/>
  </>);
}
