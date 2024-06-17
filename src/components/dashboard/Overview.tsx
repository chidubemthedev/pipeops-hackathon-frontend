import { WalletIcon, OrdersIcon, BriefcaseIcon } from "../../assets/icons";
import Card from "../Utils/Card";

const Overview = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 my-10 gap-8">
      <Card
        icon={<BriefcaseIcon />}
        number={3000}
        title="Total no. of Businesses"
        color="#2F80ED1A"
        textColor="#2F80ED"
      />
      <Card
        icon={<OrdersIcon />}
        number={28000}
        title="Total no. of Orders"
        color="#F2994A1A"
        textColor="#F2994A"
      />
      <Card
        icon={<WalletIcon />}
        number={558000}
        title="Total Transactions Amount"
        color="#2196531A"
        textColor="#219653"
        currency
      />
    </div>
  );
};

export default Overview;
