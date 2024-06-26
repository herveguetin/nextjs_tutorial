import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

type CardType = 'invoices' | 'customers' | 'pending' | 'collected';

export default async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices
  } = await fetchCardData();

  let cards: ({ title: string; type: CardType; value: string | number })[];
  cards = [
    {
      title: "Collected",
      value: totalPaidInvoices,
      type: "collected"
    },
    {
      title: "Pending",
      value: totalPendingInvoices,
      type: "pending"
    },
    {
      title: "Total invoices",
      value: numberOfInvoices,
      type: "invoices"
    },
    {
      title: "Total customers",
      value: numberOfCustomers,
      type: "customers"
    },
  ];

  return (
    <>
      {cards?.map((card) => (
        <div key={card.type}>
          <Card title={card.title} value={card.value} type={card.type}/>
        </div>
      ))}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: CardType;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
