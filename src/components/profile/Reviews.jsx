import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import the Navigation module
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper's navigation styles
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Rating from "../shared/Rating";

const reviews = [
    {
        name: "Sophie Blake",
        date: "Aug 25th, 2024",
        rating: 5,
        comment:
            "Maya is a total pro! Stunning and full of energy, she made our photoshoot a breeze. Can't wait to work with her again!",
    },
    {
        name: "Tara Morgan",
        date: "Sep 14th, 2024",
        rating: 4,
        comment:
            "Maya has amazing charisma and poses beautifully. She was slightly late, but her talent made up for it. Highly recommend!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
    {
        name: "Lena Hayes",
        date: "Oct 4th, 2024",
        rating: 5,
        comment:
            "Maya wowed the crowd at Fashion Week! She brings elegance and confidence to the runway. Excited to see her future work!",
    },
];

const Reviews = () => {
    return (
        <div className="relative w-full flex justify-between items-center px-20">
            <button
                className="swiper-button-prev-me absolute top-1/2 left-0 z-10 text-white  p-3 rounded-full cursor-pointer transform -translate-y-1/2 hover:bg-black/50 duration-200"
                aria-label="Previous slide"
            >
                <BiSolidLeftArrow size={30} />
            </button>
            {/* Swiper Component */}
            <Swiper
                modules={[Navigation]} // Add the Navigation module
                navigation={{
                    nextEl: ".swiper-button-next-me",
                    prevEl: ".swiper-button-prev-me",
                }}
                spaceBetween={50}
                slidesPerView={3}
                className="relative"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="review rounded-[20px] bg-[#3B3B3B] max-w-[310px] border-thin border-white-base/10 p-[17px]">
                            <h3 className="font-bold font-display text-[24px]">
                                {review.name}
                            </h3>
                            <span className="font-light text-sm font-body text-white-base/50 mb-2">
                                {review.date}
                            </span>
                            <Rating />
                            <p className="font-light text-sm font-body text-white-base mt-3">
                                {review.comment}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
                className="swiper-button-next-me absolute top-1/2 right-0 z-10 text-white p-3 rounded-full cursor-pointer transform -translate-y-1/2 hover:bg-black/50 duration-200"
                aria-label="Next slide"
            >
                <BiSolidRightArrow size={30} />
            </button>
        </div>
    );
};

export default Reviews;
