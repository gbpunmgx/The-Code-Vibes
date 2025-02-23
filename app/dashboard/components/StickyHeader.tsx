import React, {useState, useEffect} from "react";
import {Bell, ChevronDown} from "lucide-react";

const StickyHeader = () => {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest("#user-dropdown") &&
                !event.target.closest("#notification-dropdown")
            ) {
                setIsUserOpen(false);
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 flex justify-end px-6 py-3 relative z-50">
            <div className="flex items-center gap-6">
                <div
                    className="relative"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >

                    <button type="button"
                            className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white  rounded-lg">
                            <Bell size={28} className="text-gray-600 hover:text-black transition-colors duration-200"/>
                        <span className="sr-only">Notifications</span>
                        <div
                            className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">20
                        </div>
                    </button>

                    {isNotificationsOpen && (
                        <div
                            id="notification-dropdown"
                            className="absolute top-14 right-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-40"
                        >
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <p className="text-sm font-semibold text-gray-700">
                                    Notifications
                                </p>
                            </div>
                            <ul className="py-2 text-sm text-gray-700">
                                <li className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3"/>
                                    <span className="flex-1">New comment on your post</span>
                                    <span className="text-xs text-gray-500">5 min ago</span>
                                </li>
                                <li className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3"/>
                                    <span className="flex-1">New follower: John Doe</span>
                                    <span className="text-xs text-gray-500">10 min ago</span>
                                </li>
                                <li className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-3"/>
                                    <span className="flex-1">Your subscription is expiring soon</span>
                                    <span className="text-xs text-gray-500">1 hour ago</span>
                                </li>
                            </ul>
                            <div
                                className="px-4 py-2 text-center text-sm text-blue-500 cursor-pointer hover:bg-gray-50">
                                View All Notifications
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="relative flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    onClick={() => setIsUserOpen(!isUserOpen)}
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">Emirhan Boruch</span>
                    <ChevronDown size={20} className="text-gray-600"/>
                </div>

                {isUserOpen && (
                    <div
                        id="user-dropdown"
                        className="absolute top-20 right-6 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-40"
                    >
                        <div className="p-4 border-b">
                            <p className="text-sm font-semibold">Emirhan Boruch</p>
                            <p className="text-xs text-gray-500">emirhanboruch51@gmail.com</p>
                        </div>
                        <ul className="py-2 text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account Settings</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
                            <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer">Sign Out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StickyHeader;
