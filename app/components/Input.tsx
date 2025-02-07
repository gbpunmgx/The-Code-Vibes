import React from 'react';

interface InputProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    type?: string;
    error?: string; // Added error prop
}

const Input: React.FC<InputProps> = ({
                                         id,
                                         name,
                                         label,
                                         placeholder,
                                         value,
                                         onChange,
                                         className = '',
                                         type = 'text',
                                         error = '' // Default error to an empty string
                                     }) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={`px-4 py-3.5 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
            />
            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p> // Display error message
            )}
        </div>
    );
};

export default Input;
