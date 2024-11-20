import React from "react";
import Loading from "./Loading";

const FormButton = ({ disabled, text, className, loading }) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`${
                disabled || loading
                    ? "cursor-not-allowed bg-[#494B4E] pointer-events-none"
                    : "bg-blue-primary"
            } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200 ${className}`}
        >
            {loading ? <Loading /> : text}
        </button>
    );
};

export default FormButton;
