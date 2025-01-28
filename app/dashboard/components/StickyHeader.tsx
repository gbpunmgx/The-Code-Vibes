import React from "react";
import { Moon, Bell, User } from "lucide-react";

const StickyHeader = () => {
    return (
        <div className="sticky top-0 flex items-center justify-between bg-white p-4">
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
                <User size={24} className="text-gray-600" />
            </div>
        </div>
    );
};

export default StickyHeader;
