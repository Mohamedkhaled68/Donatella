import React from "react";

const Button = ({ className, children }) => {
    return (
        <>
            <button
                className={`py-3 px-6 rounded-md text-medium font-semibold font-body text-center ${className}`}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
