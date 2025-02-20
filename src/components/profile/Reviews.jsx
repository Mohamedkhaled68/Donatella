import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Rating from "../shared/Rating";
import useGetReviews from "../../hooks/individuals/useGetReviews";
import { useUserStore } from "../../store/userStore";
import { formatReviewDate, textExpander } from "../../utils/helpers";
import { Navigation } from "swiper/modules";
// import "swiper/css/navigation";
import "swiper/css";
import toast from "react-hot-toast";

const Reviews = () => {
    const [reviews, setReviews] = useState(null);
    const [revPreview, setRevPreview] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null); // New state

    const handleSeeMore = (review) => {
        setSelectedReview(review);
        setRevPreview(true);
    };

    const { mutateAsync: getReviews } = useGetReviews();

    const { userStatus } = useUserStore((state) => state);

    const fetchReviews = async () => {
        const id = userStatus?.id;
        if (!id) return;
        try {
            const data = await getReviews(id);
            if (data && Array.isArray(data)) {
                setReviews(data);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Error fetching reviews"
            );
        }
    };

    useEffect(() => {
        if (!userStatus?.id) return;
        fetchReviews();
    }, [userStatus?.id]);

    useEffect(() => {
        if (selectedReview && revPreview) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }
        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [selectedReview, revPreview]);

    return (
        <>
            {revPreview && selectedReview && (
                <div
                    style={{
                        top: `${window.scrollY - 30}px`,
                    }}
                    className="absolute top-0 left-0 w-full h-[95vh] bg-black/70 z-[1000] flex justify-center items-center"
                >
                    <div className="bg-blue-primary p-4 rounded-md w-[60%]">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col mb-1">
                                <p className="font-bold font-body text-[28px] capitalize">
                                    {selectedReview?.organizationName}
                                </p>
                                <p className="font-light text-sm font-body text-white-base/50 -mt-[2px] mb-[5px]">
                                    {formatReviewDate(
                                        selectedReview?.createdAt
                                    )}
                                </p>
                                <p className="text-white-base">
                                    {selectedReview?.comment}
                                </p>
                            </div>
                        </div>
                        <button
                            className="mt-4 text-white-base border border-white-base bg-background-dark px-10 py-2 rounded-xl"
                            onClick={() => setRevPreview(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="relative w-full flex justify-between items-center px-10">
                {reviews?.length > 0 && (
                    <>
                        <button
                            className="swiper-button-prev-me absolute top-1/2 -left-4 z-10 text-white p-3 rounded-full cursor-pointer transform -translate-y-1/2 hover:bg-black/50 duration-200"
                            aria-label="Previous slide"
                        >
                            <BiSolidLeftArrow size={30} />
                        </button>
                    </>
                )}

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".swiper-button-next-me",
                        prevEl: ".swiper-button-prev-me",
                    }}
                    spaceBetween={10}
                    slidesPerView={3}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 30 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    className="relative w-full"
                >
                    {reviews?.length > 0 ? (
                        reviews.map((review) => (
                            <SwiperSlide className="" key={review.id}>
                                <div className="review rounded-[20px] bg-[#3B3B3B] w-full h-[200px] border-[2.5px] border-white-base/20 p-[17px] flex flex-col">
                                    <div className="flex flex-col mb-1">
                                        <p className="font-bold font-body text-[28px] capitalize">
                                            {review?.organizationName}
                                        </p>
                                        <p className="font-light text-sm font-body text-white-base/50 -mt-[2px] mb-[5px]">
                                            {formatReviewDate(review.createdAt)}
                                        </p>
                                    </div>
                                    <div className="mb-[5px]">
                                        <Rating
                                            size={25}
                                            rating={review?.rating}
                                        />
                                    </div>
                                    <p className="font-light text-base font-body text-white-base tracking-widest mt-2">
                                        {textExpander(review?.comment)}
                                        {"..."}
                                        <span
                                            className="hover:underline duration-300 cursor-pointer text-blue-primary"
                                            onClick={() =>
                                                handleSeeMore(review)
                                            } // Pass the selected review
                                        >
                                            see more
                                        </span>
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="text-white w-full text-center py-5 text-2xl font-body italic tracking-widest">
                            No reviews available.
                        </div>
                    )}
                </Swiper>

                {reviews?.length > 0 && (
                    <>
                        <button
                            className="swiper-button-next-me absolute top-1/2 -right-4 z-10 text-white p-3 rounded-full cursor-pointer transform -translate-y-1/2 hover:bg-black/50 duration-200"
                            aria-label="Next slide"
                        >
                            <BiSolidRightArrow size={30} />
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Reviews;
