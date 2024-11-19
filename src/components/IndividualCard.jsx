import React from "react";
import Rating from "./Rating";
import { profileGirl } from "../assets";

const IndividualCard = () => {
    return (
        <>
            <div className="bg-[#313131] border-thin border-white-base/5 rounded-[20px] p-4 flex flex-col gap-4">
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
                <div className="rounded-[4px] border-thin border-white-base/5 ">
                    <img
                        className="object-cover max-w-full"
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
