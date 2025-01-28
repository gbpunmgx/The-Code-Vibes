import React, { JSX } from "react";
import {
  subFeatures,
  features,
} from "@/app/dashboard/models/FeaturesDataProvider";

interface AddProductProps {
  selectedSubFeature: string | null;
}

const AddProduct: React.FC<AddProductProps> = ({ selectedSubFeature }) => {
  if (!selectedSubFeature) {
    return (
      <div className="p-4 text-gray-600">
        Select a sub-feature to view its content.
      </div>
    );
  }

  const feature = Object.values(subFeatures)
    .flat()
    .find((sf) => sf.id === selectedSubFeature);

  if (!feature) {
    return <div className="p-4 text-red-500">Unknown Sub Feature</div>;
  }

  const featureContentLookup: { [key: string]: JSX.Element } = {
    // Dashboard Sub-Features
    overview: <div className="p-6">This is the UI for Overview</div>,
    sales: <div className="p-6">This is the UI for Sales</div>,
    traffic: <div className="p-6">This is the UI for Traffic</div>,

    // Products Sub-Features
    "product-list": <div className="p-6">This is the UI for Product List</div>,
    "add-product": (
      <div className="p-6">This is the UI for Adding a Product</div>
    ),
    inventory: (
      <div className="p-6">This is the UI for Inventory Management</div>
    ),
    categories: (
      <div className="p-6">This is the UI for Managing Categories</div>
    ),

    // Orders Sub-Features
    "all-orders": <div className="p-6">This is the UI for All Orders</div>,
    "pending-orders": (
      <div className="p-6">This is the UI for Pending Orders</div>
    ),
    "completed-orders": (
      <div className="p-6">This is the UI for Completed Orders</div>
    ),
    "order-history": (
      <div className="p-6">This is the UI for Order History</div>
    ),

    // Customers Sub-Features
    "customer-list": (
      <div className="p-6">This is the UI for Customer List</div>
    ),
    "customer-segmentation": (
      <div className="p-6">This is the UI for Customer Segmentation</div>
    ),
    "loyalty-program": (
      <div className="p-6">This is the UI for Loyalty Program</div>
    ),

    // Analytics Sub-Features
    "sales-analytics": (
      <div className="p-6">This is the UI for Sales Analytics</div>
    ),
    "product-performance": (
      <div className="p-6">This is the UI for Product Performance</div>
    ),
    "customer-analytics": (
      <div className="p-6">This is the UI for Customer Analytics</div>
    ),
    "traffic-sources": (
      <div className="p-6">This is the UI for Traffic Sources</div>
    ),

    // Marketing Sub-Features
    "email-campaigns": (
      <div className="p-6">This is the UI for Email Campaigns</div>
    ),
    "sms-campaigns": (
      <div className="p-6">This is the UI for SMS Campaigns</div>
    ),
    "discount-coupons": (
      <div className="p-6">This is the UI for Discount Coupons</div>
    ),
    "referral-program": (
      <div className="p-6">This is the UI for Referral Program</div>
    ),

    // Settings Sub-Features
    "site-settings": (
      <div className="p-6">This is the UI for Site Settings</div>
    ),
    "payment-settings": (
      <div className="p-6">This is the UI for Payment Settings</div>
    ),
    "shipping-settings": (
      <div className="p-6">This is the UI for Shipping Settings</div>
    ),
    "user-permissions": (
      <div className="p-6">This is the UI for User Permissions</div>
    ),
  };

  const renderFeatureUI = featureContentLookup[selectedSubFeature] || (
    <div className="p-6">Default Content for {feature.name}</div>
  );

  return (
    <div className="p-4 border rounded-2xl bg-white">
      {renderFeatureUI}
    </div>
  );
};

export default AddProduct;
