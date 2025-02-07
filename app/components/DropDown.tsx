import React from "react";

interface SelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { id: string; name: string }[]; // Array of objects representing options
    required?: boolean;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
                                           id,
                                           label,
                                           value,
                                           onChange,
                                           options,
                                           required = false,
                                           className = "",
                                       }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
