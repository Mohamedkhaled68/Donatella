import React from "react";
import { FaPlus } from "react-icons/fa6";
import { profileFullbody, profileHeadshot } from "../../assets";
import { FiEdit } from "react-icons/fi";
import Border from "./Border";
import PortfolioImages from "./PortfolioImages";
import { useUserStore } from "../../store/userStore";

const Portfolio = () => {
    const userStatus = useUserStore((state) => state.userStatus);

    return (
        <>
            <>
                {/* PORTFOLIO */}
                <div className="py-5 flex flex-col gap-6 my-8">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            Protfolio
                        </h1>
                        <FiEdit size={20} />
                    </div>
                    <PortfolioImages />
                </div>
                <Border />
                {/* HEADSHOTS */}
                {userStatus.individual.role === "MODEL" && (
                    <>
                        <div className="py-5 flex flex-col gap-6 my-8">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-[38px] font-bold font-display">
                                    Headshots
                                </h1>
                                <FiEdit size={20} />
                            </div>
                            <div className="grid grid-cols-3 gap-x-[10rem] justify-items-center">
                                <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                    <div className="w-full overflow-hidden rounded-[90px] border-thin border-white-base/30">
                                        <img
                                            className="max-w-[100%] object-cover"
                                            src={profileHeadshot}
                                            alt="profileImage"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                    <div className="w-full overflow-hidden flex justify-center items-center rounded-[90px] border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                        {/* <img
                                                        className="max-w-[100%] object-cover"
                                                        src={profileHeadshot}
                                                        alt="profileImage"
                                                    /> */}
                                        <FaPlus size={75} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                    <div className="w-full overflow-hidden flex justify-center items-center rounded-[90px] border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                        {/* <img
                                                        className="max-w-[100%] object-cover"
                                                        src={profileHeadshot}
                                                        alt="profileImage"
                                                    /> */}
                                        <FaPlus size={75} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Border />
                    </>
                )}
                {/* FULL BODY */}
                <div className="py-5 flex flex-col gap-6 my-8">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            {userStatus.individual.role === "MODEL" ? (
                                <>Full Body</>
                            ) : (
                                <>TikToks / Reels</>
                            )}
                        </h1>
                        <FiEdit size={20} />
                    </div>
                    <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center">
                        <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                            <div className="w-full overflow-hidden rounded-md border-thin border-white-base/30">
                                <img
                                    className="max-w-[100%] object-cover"
                                    src={profileFullbody}
                                    alt="profileImage"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                            <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                <FaPlus size={75} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                            <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                <FaPlus size={75} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                            <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                <FaPlus size={75} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default Portfolio;
