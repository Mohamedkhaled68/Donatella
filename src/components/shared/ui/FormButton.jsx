import React from "react";

const FormButton = ({ disabled, text, className }) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`${
                disabled ? "cursor-not-allowed bg-[#494B4E]" : "bg-blue-primary"
            } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200 ${className}`}
        >
            {text}
        </button>
    );
};

export default FormButton;
