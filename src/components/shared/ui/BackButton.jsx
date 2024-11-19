import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = ({ size = 25, className }) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        return navigate(-1);
    };
    return (
        <>
            <FaArrowLeft
                className={`text-blue-primary cursor-pointer ${className}`}
                onClick={handleGoBack}
                size={size}
            />
        </>
    );
};

export default BackButton;
