import { fetchCheckoutData } from "@/app/lib/checkout/data";
import DrawerClient from "@/app/ui/minicart/client/drawer";

export default async function Indicator() {
  const checkoutData = await fetchCheckoutData();
  return (<>
    <DrawerClient checkoutData={checkoutData}/>
  </>);
}
