import React from "react";
import { dateFormat } from "../../utils/helpers";
import { FiEdit } from "react-icons/fi";

const Experience = ({ userStatus }) => {
    return (
        <>
            {/* <div className="py-5 flex flex-col gap-6 my-8">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-[38px] font-bold font-display">
                        Experience & Awards
                    </h1>
                    <FiEdit size={20} />
                </div>
                <p className="text-xl font-semibold text-blue-primary">
                    Add Your Experience & Awards By Clicking The Edit Button To
                    The Right
                </p>
            </div> */}
            <div className="py-5 flex flex-col gap-6 my-8">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-[38px] font-bold font-display">
                        Experience & Awards
                    </h1>
                    <FiEdit size={20} />
                </div>
                <div className="flex flex-col gap-3">
                    {userStatus.individual?.workExperience?.map(
                        ({ company, startDate, endDate, title }, idx) => (
                            <div key={idx}>
                                <span className="text-[20px] font-body font-bold">
                                    {dateFormat(startDate)} -{" "}
                                    {dateFormat(endDate)}{" "}
                                </span>
                                <span className="font-normal text-md">
                                    : {title} at {company}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Experience;
