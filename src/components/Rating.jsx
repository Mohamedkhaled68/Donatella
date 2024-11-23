import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
// import { useGetCurrentUser } from "../../hooks/auth/useGetCurrentUser";
// import useRating from "../../hooks/songs/useRating";
// import { useModalContext } from "./ModalProvider";

const Rating = ({ maxRating = 5, size = 20 }) => {
    // Modal States
    // const { setIsModalVisible, setSelectedSong } = useModalContext();

    const [rating, setRating] = useState(0);
    // const { data } = useGetCurrentUser();
    // const { mutateAsync } = useRating();

    const handleRating = (i) => {
        setRating(i + 1);
        // setIsModalVisible(true);
        // setSelectedSong(song);
    };

    // useEffect(() => {
    //     console.log({ ...song, userId: data?._id, rating });
    // }, [rating]);

    return (
        <div className="flex items-center">
            {Array.from({ length: maxRating }, (_, i) => {
                return i < rating ? (
                    <FaStar
                        onClick={async () => {
                            handleRating(i);
                            console.log(rating);
                            mutateAsync({ ...song, userId: data?._id, rating });
                        }}
                        className="text-white-base cursor-pointer"
                        key={i}
                        size={size}
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

export default Rating;
