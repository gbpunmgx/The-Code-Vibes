import React from 'react';

const InputField = ({ id, label, placeholder, icon, error }) => {
    return (
        <div className="max-w-sm mx-auto mt-10">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div className="relative mb-6">
                {icon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-green-500">
                        {icon}
                    </div>
                )}
                <input
                    type="text"
                    id={id}
                    className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder={placeholder}
                />
            </div>
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
