import React from "react";

const SelectInput = ({ children, className, value, id, onChange }) => {
    return (
        <select
            onChange={onChange}
            value={value}
            id={id}
            className={`text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none ${className}`}
        >
            {children}
        </select>
    );
};

export default SelectInput;
