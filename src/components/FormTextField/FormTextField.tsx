import React, { FC } from 'react';

export type IFormTextField = {
    type: 'text' | 'email' | 'password';
    label?: string;
    required: boolean;
    [key: string]: any;
};

const FormTextField: FC<IFormTextField> = ({ label, required, type, ...rest }) => {
    return (
        <div className="form-text-field">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                {label}
            </label>
            <input
                {...rest}
                required={required}
                type={type}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
        </div>
    );
};

export default FormTextField;
