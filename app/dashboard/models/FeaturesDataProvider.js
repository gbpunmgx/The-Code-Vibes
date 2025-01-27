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
        { id: "pending-orders", name: "Pending Orders", icon: <ShoppingCart size={20} /> },
        { id: "completed-orders", name: "Completed Orders", icon: <ShoppingCart size={20} /> },
        { id: "order-history", name: "Order History", icon: <FileText size={20} /> },
    ],
    customers: [
        { id: "customer-list", name: "Customer List", icon: <Users size={20} /> },
        { id: "customer-segmentation", name: "Customer Segmentation", icon: <Users size={20} /> },
        { id: "loyalty-program", name: "Loyalty Program", icon: <Users size={20} /> },
    ],
    analytics: [
        { id: "sales-analytics", name: "Sales Analytics", icon: <BarChart size={20} /> },
        { id: "product-performance", name: "Product Performance", icon: <Package size={20} /> },
        { id: "customer-analytics", name: "Customer Analytics", icon: <Users size={20} /> },
        { id: "traffic-sources", name: "Traffic Sources", icon: <BarChart size={20} /> },
    ],
    marketing: [
        { id: "email-campaigns", name: "Email Campaigns", icon: <Mail size={20} /> },
        { id: "sms-campaigns", name: "SMS Campaigns", icon: <Phone size={20} /> },
        { id: "discount-coupons", name: "Discount Coupons", icon: <DollarSign size={20} /> },
        { id: "referral-program", name: "Referral Program", icon: <Users size={20} /> },
    ],
    settings: [
        { id: "site-settings", name: "Site Settings", icon: <Settings size={20} /> },
        { id: "payment-settings", name: "Payment Settings", icon: <DollarSign size={20} /> },
        { id: "shipping-settings", name: "Shipping Settings", icon: <Truck size={20} /> },
        { id: "user-permissions", name: "User Permissions", icon: <Users size={20} /> },
    ],
};

export { features, subFeatures };
