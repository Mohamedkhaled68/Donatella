import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const ToRating = ({ maxRating = 5, size = 20, rating, setRating }) => {
    const handleRating = (i) => {
        setRating(i + 1);
    };

    return (
        <div className="flex items-center ">
            {Array.from({ length: maxRating }, (_, i) => {
                return i < rating ? (
                    <FaStar
                        onClick={() => handleRating(i)}
                        className="text-white-base cursor-pointer mr-1"
                        key={i}
                        size={size - 2}
                    />
                ) : (
                    <CiStar
                        onClick={() => handleRating(i)}
                        className="text-white-base cursor-pointer"
                        key={i}
                        size={size}
                    />
                );
            })}
        </div>
    );
};

export default ToRating;
