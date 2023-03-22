import React from 'react';

const Button = (props: any) => {
    const { children, ...rest } = props;
    return (
        <button
            {...rest}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
            {children}
        </button>
    );
};

export default Button;
