import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentageChange: number;
  icon: ReactNode;
  iconColor: string;
}

const DashboardCard = ({
  title,
  value,
  percentageChange,
  icon,
  iconColor,
}: DashboardCardProps) => {
  const isPositive = percentageChange >= 0;
  const percentageClass = isPositive ? "text-green-500" : "text-red-500";
  const arrowIcon = isPositive ? "↑" : "↓";

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-700">{title}</div>
        {/* Icon with rounded background */}
        <div
          className={`p-4 ${iconColor} text-white rounded-full flex items-center justify-center`}
          style={{ width: "50px", height: "50px" }}
        >
          {icon}
        </div>
      </div>

      <div className="text-4xl font-bold text-gray-900">{value}</div>

      <div className="flex items-center space-x-2 text-sm">
        <span className={`font-medium ${percentageClass}`}>
          {arrowIcon} {Math.abs(percentageChange)}%
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
