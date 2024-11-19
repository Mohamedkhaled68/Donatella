import React from "react";

const TextInput = ({
    className,
    placeholder,
    type,
    onChange,
    value,
    id,
    name,
}) => {
    return (
        <input
            onChange={onChange}
            value={value}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full ${className}`}
        />
    );
};

export default TextInput;
