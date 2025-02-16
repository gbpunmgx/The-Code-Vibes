// components/ThemeToggleInDialog.tsx
import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggleInDialog = ({ isActive, setIsActive }: { isActive: boolean; setIsActive: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="flex items-center justify-between space-x-4 py-4">
            <label htmlFor="is-active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Is Active
            </label>
            <button
                id="is-active"
                onClick={() => setIsActive(!isActive)}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ease-in-out 
          ${isActive ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gray-300'}`}
            >
                {/* Background and transition */}
                <div
                    className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ease-in-out
          ${isActive ? 'opacity-100' : 'opacity-60'}`}
                />

                {/* Toggle Knob */}
                <div
                    className={`bg-white w-7 h-7 rounded-full absolute top-0 left-0 transition-all duration-300 ease-in-out shadow-md
          ${isActive ? 'transform translate-x-8' : 'transform translate-x-0'}`}
                />

                {/* Sun and Moon icons */}
                <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-between px-1 transition-all duration-300 ease-in-out`}>
                    <Sun
                        className={`w-5 h-5 text-yellow-500 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
                    />
                    <Moon
                        className={`w-5 h-5 text-blue-500 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
            </button>
        </div>
    );
};

export default ThemeToggleInDialog;
