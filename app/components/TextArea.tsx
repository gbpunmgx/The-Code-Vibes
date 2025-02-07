import React from "react";

interface TextAreaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
                                               id,
                                               label,
                                               value,
                                               onChange,
                                               placeholder,
                                               required = false,
                                               className = "",
                                           }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`mt-1 block w-full pt-2 px-4 py-14 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
            ></textarea>
        </div>
    );
};

export default TextArea;
