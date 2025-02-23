import React, {JSX} from "react";
import AddProduct from "@/app/product/product_list/ProductView";
import {subFeatures} from "@/app/dashboard/models/FeaturesDataProvider";
import OrderTable from "@/app/product/OrderTable";
import ProductCategory from "@/app/product/category/ProductCategoryView";
import UserProfileForm from "@/app/user/UserView";
import RoleList from "@/app/user/UserRoleView";
import UserPermissions from "@/app/settings/user_permission/UserPermissions";
import InventoryView from "@/app/product/inventory/InventoryView";
import DiscountCouponsView from "@/app/campaigns/discount_coupon/DiscountCouponsView";
import ReferralProgramView from "@/app/campaigns/referral_program/ReferralProgramView";
import SmsCampaignView from "@/app/campaigns/sms_campaings/SmsCampaignView";
import AllOrders from "@/app/product_order/all_product_order/ProductOrder";
import PendingOrdersView from "@/app/product_order/pending_order/PendingOrderView";
import CompletedOrdersView from "@/app/product_order/completed_order/CompletedOrderView";
import OrderHistoryView from "@/app/product_order/order_history/OrderHistoryView";
import CustomerListView from "@/app/customer/customer_list/CustomerListView";
import CustomerSegmentationView from "@/app/customer/customer_segmentation/CustomerSegmentationView";
import LoyaltyProgramView from "@/app/customer/loyalty_program/LoyaltyProgramView";
import SiteSettingsView from "@/app/settings/site_setting/SiteSettingsView";
import PaymentSettingsView from "@/app/settings/payment_setting/PaymentSettingView";
import DashboardOverview from "@/app/dashboard/dashboard_overview/DashboardOverview";
import SalesDashboard from "@/app/dashboard/sales/SalesDashboardView";

interface AddProductProps {
    selectedSubFeature: string | null;
}

const FeatureContent: React.FC<AddProductProps> = ({selectedSubFeature}) => {
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
        return <div className="text-red-500">Unknown Sub Feature</div>;
    }

    const featureContentLookup: { [key: string]: JSX.Element } = {
        overview: <div className="p-6"><DashboardOverview/></div>,
        sales: <div className="p-6"><SalesDashboard/></div>,
        traffic: <div className="p-6">This is the UI for Traffic</div>,

        "add-product": (
            <div className="p-6">
                <AddProduct/>
            </div>
        ),
        inventory: (
            <div className="p-6"><InventoryView/></div>
        ),
        categories: (
            <div className="p-6"><ProductCategory/></div>
        ),

        // Orders Sub-Features
        "all-orders": (
            <div className="p-6">
                <AllOrders/>
            </div>
        ),
        "pending-orders": (
            <div className="p-6"><PendingOrdersView/></div>
        ),
        "completed-orders": (
            <div className="p-6"><CompletedOrdersView/></div>
        ),
        "order-history": (
            <div className="p-6"><OrderHistoryView/></div>
        ),

        // Customers Sub-Features
        "customer-list": (
            <div className="p-6"><CustomerListView/></div>
        ),
        "customer-segmentation": (
            <div className="p-6"><CustomerSegmentationView/></div>
        ),
        "loyalty-program": (
            <div className="p-6"><LoyaltyProgramView/></div>
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
            <div className="p-6"><SmsCampaignView/></div>
        ),
        "discount-coupons": (
            <div className="p-6"><DiscountCouponsView/></div>
        ),
        "referral-program": (
            <div className="p-6"><ReferralProgramView/>></div>
        ),
        "user": (
            <div className="p-6"><UserProfileForm/></div>
        ), "role": (
            <div className="p-6"><RoleList/></div>
        ),

        // Settings Sub-Features
        "site-settings": (
            <div className="p-6"><SiteSettingsView/></div>
        ),
        "payment-settings": (
            <div className="p-6"><PaymentSettingsView/></div>
        ),
        "shipping-settings": (
            <div className="p-6">This is the UI for Shipping Settings</div>
        ),
        "user-permissions": (
            <div className="p-6"><UserPermissions/></div>
        ),
    };

    const renderFeatureUI = featureContentLookup[selectedSubFeature] || (
        <div className="p-6">Default Content for {feature.name}</div>
    );

    return (
        <div className="rounded-2xl bg-white overflow-y-auto h-screen max-h-[calc(97vh-200px)]">
            {renderFeatureUI}
        </div>
    );
};

export default FeatureContent;