import React from "react";

const UserProfileForm = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                User Profile
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="input-group-1"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    Your Email
                </label>
                <input
                    type="email"
                    id="input-group-1"
                    className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="elonmusk"
                />
            </div>

            <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                    />
                </div>

                <div className="flex-1">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    Role
                </label>
                <select
                    id="role"
                    className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 dark:hover:bg-blue-400"
            >
                Save Profile
            </button>
        </div>
    );
};

export default UserProfileForm;
