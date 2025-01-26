"use client";

import { useState } from "react";
// import LoginSignupPage from "./LoginSignupPage";

import {
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Settings,
  Mail,
  Phone,
  FileText,
  DollarSign,
  Truck,
  Moon,
  Bell,
  UserRound,
} from "lucide-react";

const features = [
  { id: "dashboard", name: "Dashboard", icon: <Home size={24} /> },
  { id: "products", name: "Products", icon: <Package size={24} /> },
  { id: "orders", name: "Orders", icon: <ShoppingCart size={24} /> },
  { id: "customers", name: "Customers", icon: <Users size={24} /> },
  { id: "analytics", name: "Analytics", icon: <BarChart size={24} /> },
  { id: "marketing", name: "Marketing", icon: <Mail size={24} /> },
  { id: "settings", name: "Settings", icon: <Settings size={24} /> },
];

const subFeatures = {
  dashboard: [
    { id: "overview", name: "Overview", icon: <Home size={20} /> },
    { id: "sales", name: "Sales", icon: <DollarSign size={20} /> },
    { id: "traffic", name: "Traffic", icon: <BarChart size={20} /> },
  ],
  products: [
    { id: "product-list", name: "Product List", icon: <Package size={20} /> },
    { id: "add-product", name: "Add Product", icon: <Package size={20} /> },
    { id: "inventory", name: "Inventory", icon: <Truck size={20} /> },
    { id: "categories", name: "Categories", icon: <ShoppingCart size={20} /> },
  ],
  orders: [
    { id: "all-orders", name: "All Orders", icon: <ShoppingCart size={20} /> },
    {
      id: "pending-orders",
      name: "Pending Orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      id: "completed-orders",
      name: "Completed Orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      id: "order-history",
      name: "Order History",
      icon: <FileText size={20} />,
    },
  ],
  customers: [
    { id: "customer-list", name: "Customer List", icon: <Users size={20} /> },
    {
      id: "customer-segmentation",
      name: "Customer Segmentation",
      icon: <Users size={20} />,
    },
    {
      id: "loyalty-program",
      name: "Loyalty Program",
      icon: <Users size={20} />,
    },
  ],
  analytics: [
    {
      id: "sales-analytics",
      name: "Sales Analytics",
      icon: <BarChart size={20} />,
    },
    {
      id: "product-performance",
      name: "Product Performance",
      icon: <Package size={20} />,
    },
    {
      id: "customer-analytics",
      name: "Customer Analytics",
      icon: <Users size={20} />,
    },
    {
      id: "traffic-sources",
      name: "Traffic Sources",
      icon: <BarChart size={20} />,
    },
  ],
  marketing: [
    {
      id: "email-campaigns",
      name: "Email Campaigns",
      icon: <Mail size={20} />,
    },
    { id: "sms-campaigns", name: "SMS Campaigns", icon: <Phone size={20} /> },
    {
      id: "discount-coupons",
      name: "Discount Coupons",
      icon: <DollarSign size={20} />,
    },
    {
      id: "referral-program",
      name: "Referral Program",
      icon: <Users size={20} />,
    },
  ],
  settings: [
    {
      id: "site-settings",
      name: "Site Settings",
      icon: <Settings size={20} />,
    },
    {
      id: "payment-settings",
      name: "Payment Settings",
      icon: <DollarSign size={20} />,
    },
    {
      id: "shipping-settings",
      name: "Shipping Settings",
      icon: <Truck size={20} />,
    },
    {
      id: "user-permissions",
      name: "User Permissions",
      icon: <Users size={20} />,
    },
  ],
};

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [selectedSubFeature, setSelectedSubFeature] = useState<string | null>(
    null
  );

  const handleFeatureClick = (featureId: string) => {
    if (expandedFeature === featureId) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(featureId);
    }
    setSelectedFeature(featureId);
    setSelectedSubFeature(null);
  };

  const handleSubFeatureClick = (subFeatureId: string) => {
    setSelectedSubFeature(subFeatureId);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-20 bg-[#F0F4F7] text-black flex flex-col items-center p-4 relative">
        <button onClick={() => setExpandedFeature(null)}></button>

        {features.map((feature) => (
          <div
            key={feature.id}
            className={`relative group flex flex-col items-center justify-center mb-6 cursor-pointer ${
              selectedFeature === feature.id
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            } p-3 rounded-md`}
            onClick={() => handleFeatureClick(feature.id)}
          >
            <div
              className={`${
                selectedFeature === feature.id
                  ? "text-white"
                  : "group-hover:text-white"
              } text-gray-800`}
            >
              {feature.icon}
            </div>
            <div className="absolute left-20 bg-gray-700 text-white text-sm px-2 py-1 rounded-md hidden group-hover:block">
              {feature.name}
            </div>
          </div>
        ))}
      </div>

      {expandedFeature && (
        <div className=" w-74 bg-white text-black p-6 flex flex-col ">
          {/* Logo at the top */}
          <div className="mb-6 flex items-center">
            <h1 className="text-2xl font-bold text-black mb-6">
              MULTI{" "}
              <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent text-4xl animate-glow">
                X
              </span>
            </h1>
          </div>

          <h2 className="text-lg font-semibold mb-4 capitalize">
            {expandedFeature}
          </h2>
          <div className="flex flex-col gap-4">
            {(
              subFeatures[expandedFeature as keyof typeof subFeatures] || []
            ).map((subFeature) => (
              <button
                key={subFeature.id}
                className={`group flex items-center gap-4 p-3 rounded-md
          ${
            selectedSubFeature === subFeature.id
              ? "bg-gray-700"
              : "hover:bg-gray-600"
          }
        `}
                onClick={() => handleSubFeatureClick(subFeature.id)}
              >
                {/* Icon */}
                <div
                  className={`rounded-md
            ${
              selectedSubFeature === subFeature.id
                ? "bg-gray-700 text-white"
                : "group-hover:bg-gray-700 group-hover:text-white text-gray-800"
            }
          `}
                >
                  {subFeature.icon}
                </div>
                {/* Text */}
                <span
                  className={`text-sm font-medium
            ${
              selectedSubFeature === subFeature.id
                ? "text-white"
                : "group-hover:text-white text-gray-800"
            }
          `}
                >
                  {subFeature.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col min-h-screen flex-grow">
        <div className="flex items-center justify-between bg-white p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black">
              <Moon size={24} />
            </button>
            <button className="text-gray-600 hover:text-black">
              <Bell size={24} />
            </button>
            <UserRound size={24} />
          </div>
        </div>
        <div className="flex-grow bg-[#F0F4F7] p-8 m-4 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-black mb-6">
            {expandedFeature
              ? selectedSubFeature
                ? `${expandedFeature.toUpperCase()} / ${selectedSubFeature.toUpperCase()}`
                : expandedFeature.toUpperCase()
              : ""}
          </h1>
          {/* <LoginSignupPage /> */}
        </div>
      </div>
    </div>
  );
}
