import React from "react";
import { orgLogo } from "../assets";
import Rating from "./Rating";

const JobCard = ({ job }) => {
    const { company, description, rate, tags, duration, logo, location } = job;
    return (
        <>
            <div className="flex items-center bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 gap-5 space-x-4 shadow-lg ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={orgLogo}
                        alt={`${company} logo`}
                        className="w-[120px] h-[120px] rounded-full"
                    />
                    <Rating />
                </div>
                <div className="flex-1 grow">
                    <h3 className="font-bold border-b border-white-base/10 pb-3 w-[50%]">
                        <span className="text-white-base text-md font-bold font-display">
                            {company}{" "}
                        </span>
                        <span className="text-sm text-gray-400">
                            - {location}
                        </span>
                    </h3>
                    <p className="text-[22px] font-bold text-white-base w-[80%] mt-2">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-[20px] font-bold">{rate}</p>
                    <p className="text-sm text-gray-400">{duration}</p>
                    <button className="bg-blue-primary hover:bg-blue-600 duration-200 text-white py-3 px-[60px] rounded-[46px] text-md font-bold">
                        View Job
                    </button>
                </div>
            </div>
        </>
    );
};

export default JobCard;
