import React from "react";
import Rating from "./shared/Rating";
import { profileGirl } from "../assets";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { PiDressBold } from "react-icons/pi";
import { GiRunningShoe } from "react-icons/gi";
import { VscColorMode } from "react-icons/vsc";
import { headIcon } from "../assets";

const attributes = [
    { icon: headIcon, text: "Blonde", isImage: true },
    { icon: <GiRunningShoe size={25} />, text: "39" },
    { icon: <FaEye size={25} />, text: "Green" },
    { icon: <IoMaleFemaleSharp size={25} />, text: "Female" },
    { icon: <PiDressBold size={25} />, text: "40" },
    { icon: <VscColorMode size={25} />, text: "White" },
];

const IndividualCard = ({ className, filter }) => {
    return (
        <>
            <div
                className={`bg-[#313131] border-thin w-[240px] h-[508px]  border-white-base/5 rounded-[20px] p-4 flex flex-col gap-4 ${className}`}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h1 className="name || text-md font-bold text-white-base font-display">
                            Lima Johnson
                        </h1>
                        <span className="text-sm font-bold text-white-base font-body">
                            54$/HR
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="region || text-sm font-light text-white-base/50 font-body">
                            Toronto, CA
                        </p>
                        <Rating maxRating={5} />
                    </div>
                </div>
                <div className="rounded-md h-full w-full relative group hover:border-white-base/70 duration-200 border-thin overflow-hidden border-white-base/5 ">
                    <div className="absolute w-full h-full top-0 group-hover:opacity-100 opacity-0 duration-300 left-0 bg-black/80 flex justify-center items-center">
                        <div
                            className={`h-full w-full grid ${
                                filter !== "models"
                                    ? "grid-cols-2"
                                    : "grid-cols-1"
                            } grid-cols-2 gap-2 justify-items-center py-2 text-white-base`}
                        >
                            {attributes.map((attr, index) => (
                                <span
                                    key={index}
                                    className={`flex justify-center items-center w-full ${
                                        filter !== "models"
                                            ? "col-span-1"
                                            : "col-span-2"
                                    }`}
                                >
                                    {attr.isImage ? (
                                        <img
                                            className="w-[20px]"
                                            src={attr.icon}
                                            alt="icon"
                                        />
                                    ) : (
                                        attr.icon
                                    )}
                                    <p className="w-[30%] text-center">
                                        {attr.text}
                                    </p>
                                </span>
                            ))}
                        </div>
                    </div>
                    <img
                        className="object-cover w-full h-full "
                        src={profileGirl}
                        alt=""
                    />
                </div>
                <button className="btn || py-3 px-[50px] bg-blue-primary rounded-[46px] text-white-base text-medium font-semibold font-body text-center">
                    View Profile
                </button>
            </div>
        </>
    );
};

export default IndividualCard;
