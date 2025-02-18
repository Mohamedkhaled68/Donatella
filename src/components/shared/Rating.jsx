import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Rating = ({ maxRating = 5, size = 20, rating }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => {
                return i < rating ? (
                    <FaStar
                        className="text-white-base"
                        key={i}
                        size={size}
                    />
                ) : (
                    <CiStar
                        className="text-white-base"
                        key={i}
                        size={size}
                    />
                );
            })}
        </div>
    );
};

export default Rating;
