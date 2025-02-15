import React from "react";
import { BackButton, Footer } from "../../components";
import { cate1, cate2, cate3, cate4 } from "../../assets";
import { useNavigate } from "react-router-dom";

const cards = [
    {
        title: "Modeling",
        slogan: "Bring Your Vision to Life with Exceptional Talent",
        orgBtn: "Look for your next model",
        userBtn: "Join as Model",
        image: cate1,
    },
    {
        title: "Photography",
        slogan: "Capture Every Moment with Precision and Artistry",
        orgBtn: "Look for your next Photographer",
        userBtn: "Join as Photographer",
        image: cate2,
    },
    {
        title: "Videography",
        slogan: "Craft Dynamic Stories Through Stunning Videography",
        orgBtn: "Look for your next Videographer",
        userBtn: "Join as Videographer",
        image: cate3,
    },
    {
        title: "Editing",
        slogan: "Perfect Every Detail with Expert Post-Production",
        orgBtn: "Look for your next Editor",
        userBtn: "Join as Editor",
        image: cate4,
    },
];

const Services = () => {
    const navigate = useNavigate();
    const handleClick = (role) => {
        navigate("/signup", { state: { role } });
    };
    return (
        <>
            <section className="min-h-screen bg-[#121417] text-white pb-10">
                <header className="flex items-center p-4">
                    <BackButton />
                </header>
                <div className="container mx-auto flex flex-col items-center justify-center text-center pt-20">
                    <h1 className="text-5xl lg:text-8xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                        Services
                    </h1>
                    <p className="text-xl font-[DM Sans] text-white/70 mt-2 w-[80%] mx-auto lg:w-full">
                        Redefine creativity and excellence.
                    </p>
                    <div className="mt-12 grid grid-cols-1 gap-8 px-4">
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                className="bg-white-base min-w-[350px] max-w-[600px] text-black rounded-lg p-6 shadow-lg flex flex-col items-center"
                            >
                                <h2 className="text-[30px] lg:text-5xl font-display">
                                    {card.title}
                                </h2>
                                <p className="text-sm lg:text-base font-[DM Sans] text-gray-600 mt-2">
                                    {card.slogan}
                                </p>
                                <div className="w-[80%] h-[90%] shadow-2xl bg-gray-300 rounded-3xl overflow-hidden mt-4">
                                    <img
                                        loading="lazy"
                                        className="w-full object-cover"
                                        src={card.image}
                                        alt={card.title}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 mt-6 w-full justify-center items-center">
                                    <button
                                        onClick={() =>
                                            handleClick("Organization")
                                        }
                                        className="bg-[#1F2224] text-white-base px-6 py-3 rounded-md w-[95%] lg:w-[55%]"
                                    >
                                        {card.orgBtn}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleClick("Individual")
                                        }
                                        className="bg-[#1F2224] text-white-base px-6 py-3 rounded-md"
                                    >
                                        {card.userBtn}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Services;
