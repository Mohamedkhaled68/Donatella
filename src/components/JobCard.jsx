import React from "react";
import { orgLogo } from "../assets";
import { useNavigate } from "react-router-dom";
import JobDurationContainer from "./shared/JobDurationContainer";

const JobCard = ({ job }) => {
    const { organization, tags, id, jobDuration, location, title, salary, proposalStatus } =
        job;

    const navigate = useNavigate();

    const handleNavigateToJob = () => {
        navigate(`/explore/jobs/${id}`);
    };

    const getProposalStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
            case "APPROVED":
                return "bg-green-500/20 text-green-400 border-green-500/50";
            case "REJECTED":
                return "bg-red-500/20 text-red-400 border-red-500/50";
            case "FINISHED":
                return "bg-blue-500/20 text-blue-400 border-blue-500/50";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/50";
        }
    };

    return (
        <>
            <div className="flex items-center bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 gap-5 space-x-4 shadow-lg ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={organization?.logo || orgLogo}
                        alt={`${organization?.name} logo`}
                        className="w-[150px] h-[150px] rounded-full"
                    />
                </div>
                <div className="flex-1 grow">
                    <div className="flex items-center justify-between w-[50%] pb-3 border-b border-white-base/10">
                        <h3 className="font-bold">
                            <span className="text-white-base text-md font-bold font-display capitalize">
                                {organization?.name}{" "}
                            </span>
                            <span className="text-sm text-gray-400">
                                - {location}
                            </span>
                        </h3>
                        {proposalStatus && (
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${getProposalStatusColor(
                                    proposalStatus
                                )}`}
                            >
                                {proposalStatus.toLowerCase()}
                            </span>
                        )}
                    </div>
                    <p className="text-[22px] font-bold text-white-base w-[80%] mt-2">
                        {title}
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
                    <p className="text-[20px] font-bold">{`${salary}$`}</p>
                    <p className="text-sm text-gray-400 capitalize">
                        <JobDurationContainer job={job} />
                    </p>
                    <button
                        onClick={handleNavigateToJob}
                        className="bg-blue-primary hover:bg-blue-600 duration-200 text-white py-3 px-[60px] rounded-[46px] text-md font-bold"
                    >
                        View Job
                    </button>
                </div>
            </div>
        </>
    );
};

export default JobCard;
