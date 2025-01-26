import { BarChart, DollarSign, Package, Users } from "lucide-react";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  const data = [
    {
      title: "Total Views",
      value: "2.450",
      percentageChange: 0.43,
      icon: <BarChart size={24} />,
      iconColor: "bg-blue-500",
    },
    {
      title: "Total Profit",
      value: "$42.2K",
      percentageChange: 4.35,
      icon: <DollarSign size={24} />,
      iconColor: "bg-green-500",
    },
    {
      title: "Total Products",
      value: "2.450",
      percentageChange: 2.59,
      icon: <Package size={24} />,
      iconColor: "bg-purple-500",
    },
    {
      title: "Total Users",
      value: "3.465",
      percentageChange: -0.95,
      icon: <Users size={24} />,
      iconColor: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            percentageChange={item.percentageChange}
            icon={item.icon}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
