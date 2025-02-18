import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Rating from "../shared/Rating";
import useGetReviews from "../../hooks/individuals/useGetReviews";
import { useUserStore } from "../../store/userStore";
import { formatReviewDate } from "../../utils/helpers";
import { Navigation } from "swiper/modules";
// import "swiper/css/navigation";
import "swiper/css";
import toast from "react-hot-toast";

const Reviews = () => {
    const [reviews, setReviews] = useState(null);
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

    return (
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
                            <div className="review rounded-[20px] bg-[#3B3B3B] w-full border-[2.5px] border-white-base/20 p-[17px] flex flex-col">
                                <div className="flex flex-col mb-1">
                                    <p className="font-bold font-body text-[24px] capitalize">
                                        {review?.organizationName}
                                    </p>
                                    <p className="font-light text-xs font-body text-white-base/50 -mt-[2px]">
                                        {formatReviewDate(review.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <Rating rating={review?.rating} />
                                </div>
                                <p className="font-light text-base font-body text-white-base tracking-widest mt-2">
                                    {review?.comment}
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
    );
};

export default Reviews;
