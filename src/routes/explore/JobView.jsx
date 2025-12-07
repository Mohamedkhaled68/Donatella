import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTiktok, FaInstagram, FaUser } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import {
    BackButton,
    Footer,
    JobDurationContainer,
    Loading,
} from "../../components";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useSendMessage from "../../hooks/chat/useSendMessage";
import { motion } from "framer-motion";
import useGetJob from "../../hooks/jobs/useGetJob";
import toast from "react-hot-toast";
import { formatLink, getCountryByCode, timeAgo } from "../../utils/helpers";
import useGetJobRequestsNumber from "../../hooks/jobs/useGetJobRequestsNumber";
import { useModal } from "../../store/useModal";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";

const levels = [
    { value: "ENTRY_LEVEL", text: "Entry Level" },
    { value: "MID_LEVEL", text: "Mid-Level" },
    { value: "SENIOR_LEVEL", text: "Senior" },
];

const educationLevels = [
    { value: "HIGH_SCHOOL", text: "High School" },
    { value: "BACHELOR", text: "Bachelor's Degree" },
    { value: "OTHER", text: "Other Degree" },
];

const MobileModal = ({ currentJob, setModal }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="select-none w-[400px] p-[16px] bg-blue-primary text-white-base rounded-[15px] flex justify-center items-center h-fit"
        >
            <div className="flex gap-5 flex-col items-center justify-center w-full">
                <div className="flex items-center justify-between w-full rounded-md bg-slate-400/50 p-3">
                    <div className="flex items-center gap-5">
                        <FaPhoneAlt size={25} />
                        <h1 className="text-[23px] text-center">
                            {currentJob?.organization?.phone}
                        </h1>
                    </div>
                    <IoIosCopy
                        onClick={() => {
                            navigator.clipboard.writeText(
                                currentJob?.organization?.phone
                            );
                            toast.success("Copied successfully");
                        }}
                        className="rounded-full p-1 hover:bg-blue-400 duration-300 cursor-pointer"
                        size={30}
                    />
                </div>

                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setModal(null)}
                        className="px-10 py-2 text-background-dark bg-white-base rounded-xl hover:bg-background-dark hover:text-white-base duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const EmailModal = ({ currentJob, setModal }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="select-none w-[400px] p-[16px] bg-blue-primary text-white-base rounded-[15px] flex justify-center items-center h-fit"
        >
            <div className="flex gap-5 flex-col items-center justify-center w-full">
                <div className="flex items-center justify-between w-full rounded-md bg-slate-400/50 p-3">
                    <div className="flex items-center gap-2">
                        <MdOutlineAlternateEmail size={25} />
                        <h1 className="text-[20px] text-center">
                            {currentJob?.organization?.email}
                        </h1>
                    </div>
                    <IoIosCopy
                        onClick={() => {
                            navigator.clipboard.writeText(
                                currentJob?.organization?.email
                            );
                            toast.success("Copied successfully");
                        }}
                        className="rounded-full p-1 hover:bg-blue-400 duration-300 cursor-pointer"
                        size={30}
                    />
                </div>

                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setModal(null)}
                        className="px-10 py-2 text-background-dark bg-white-base rounded-xl hover:bg-background-dark hover:text-white-base duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const FormModal = ({ currentJob, setModal }) => {
    const [coverInp, setCoverInp] = useState("");
    const { mutateAsync: sendMessage } = useSendMessage();
    const navigate = useNavigate();

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            if (coverInp) {
                await sendMessage({
                    chatId: currentJob?.organization?.id,
                    message: coverInp.trim(),
                    messageType: "REQUEST",
                    jobId: currentJob?.id,
                });
                toast.success("Application sent successfully");
                setModal(null);
                navigate("/messages");
            } else {
                toast.error("Cover letter is required");
            }
        } catch (err) {
            if (err?.response?.data?.message === "NOT_ALLOWED") {
                toast.error("You have already applied for this job.");
                setModal(null);
                return;
            } else {
                toast.error(
                    err?.response?.data?.message || "Failed to apply job."
                );
            }
        }
    };

    return (
        <motion.form
            onSubmit={handleApply}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[400px] p-[16px] bg-blue-primary text-white-base rounded-[15px] flex flex-col h-fit"
        >
            <h1 className="text-2xl font-bold font-body mb-[15px]">
                Apply to job :
            </h1>
            <p className="mb-[20px]">
                ${currentJob?.salary} - {getCountryByCode(currentJob?.location)}
                , {currentJob?.location} -{" "}
                <JobDurationContainer job={currentJob} />
            </p>

            <div className="flex flex-col gap-1">
                <h1>Cover Letter:</h1>
                <textarea
                    rows="5"
                    draggable="false"
                    value={coverInp}
                    onChange={(e) => setCoverInp(e.target.value)}
                    className="rounded-[10px] resize-none w-full outline-none border-none p-2 text-black"
                    type="text"
                />
            </div>
            <div className="flex items-center mt-[16px] gap-[10px]">
                <button
                    onClick={() => setModal(null)}
                    className="w-full text-white-base border font-bold border-white-base bg-black rounded-full py-2"
                >
                    Go Back
                </button>
                <button
                    type="submit"
                    className="w-full bg-white-base font-bold text-black rounded-full py-2"
                >
                    Apply
                </button>
            </div>
        </motion.form>
    );
};

const JobView = () => {
    const { jobId } = useParams();
    const [currentJob, setCurrentJob] = useState(null);
    const [reqNumber, SetReqNumber] = useState(0);
    const [requirements, SetRequirements] = useState(null);
    const { setModal } = useModal((state) => state);

    const { mutateAsync: getJob } = useGetJob();
    const { mutateAsync: getJobRequests } = useGetJobRequestsNumber();

    useEffect(() => {
        const getCurrentJob = async () => {
            try {
                const data = await getJob(jobId);
                const reqNumberData = await getJobRequests(data.id);
                console.log(data);

                setCurrentJob(data);
                SetRequirements(JSON.parse(data?.requirements));
                SetReqNumber(reqNumberData?.count);
            } catch (err) {
                toast.error(
                    err?.response?.data?.message || "Failed to get job"
                );
            }
        };

        getCurrentJob();
    }, [jobId]);

    useEffect(() => {
        if (!currentJob) {
            setModal(<Loading dimensions={{ width: "50", height: "50" }} />);
        } else {
            setModal(null);
        }
    }, [currentJob]);

    return (
        <>
            <>
                <section className="min-h-screen w-full">
                    <div className="container mx-auto flex flex-col text-white-base pb-8">
                        <div className="relative w-full flex justify-around items-center gap-[170px] my-8">
                            <BackButton className={"absolute top-3 left-1"} />
                            <div className="flex flex-col justify-center items-center gap-3">
                                <div className="flex justify-center items-end relative">
                                    <div className="w-[150px] h-[150px] rounded-full bg-slate-800 overflow-hidden">
                                        {currentJob?.organization?.logo ? (
                                            <img
                                                className="w-full h-full object-cover"
                                                src={
                                                    currentJob?.organization
                                                        ?.logo
                                                }
                                                alt="profile"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex justify-center items-center">
                                                <FaUser size={55} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="font-display text-2xl font-black capitalize">
                                        {currentJob?.organization?.name}
                                    </h1>
                                    <p className="font-body text-white-base/50 text-base font-light capitalize">
                                        {getCountryByCode(
                                            currentJob?.organization?.location
                                        )}
                                        , {currentJob?.organization?.location}
                                    </p>
                                </div>
                                <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                                    organization
                                </div>
                                <div className="w-full flex items-center justify-around">
                                    <IconLink
                                        url={
                                            currentJob?.organization?.instagram
                                        }
                                        Icon={FaInstagram}
                                    />
                                    <IconLink
                                        url={currentJob?.organization?.tiktok}
                                        Icon={FaTiktok}
                                    />
                                    <IconLink
                                        url={currentJob?.organization?.website}
                                        Icon={TbWorld}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                <div className="flex w-full gap-5 justify-between items-center">
                                    <div
                                        onClick={() =>
                                            setModal(
                                                <MobileModal
                                                    currentJob={currentJob}
                                                    setModal={setModal}
                                                />
                                            )
                                        }
                                        className="w-1/2 py-[9px] cursor-pointer bg-[#293038] rounded-lg flex justify-center items-center"
                                    >
                                        <FaPhoneAlt size={25} />
                                    </div>
                                    <div
                                        onClick={() =>
                                            setModal(
                                                <EmailModal
                                                    currentJob={currentJob}
                                                    setModal={setModal}
                                                />
                                            )
                                        }
                                        className="w-1/2 py-[9px] bg-[#293038] rounded-lg flex justify-center items-center cursor-pointer"
                                    >
                                        <FaEnvelope size={25} />
                                    </div>
                                </div>
                                {currentJob?.jobStatus === "OPEN" ? (
                                    <button
                                        onClick={() =>
                                            setModal(
                                                <FormModal
                                                    currentJob={currentJob}
                                                    setModal={setModal}
                                                />
                                            )
                                        }
                                        type="button"
                                        className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[73px] py-[15px]"
                                    >
                                        Apply For Job
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-gray-600 px-[73px] py-[15px]"
                                    >
                                        Job Closed
                                    </button>
                                )}
                            </div>
                        </div>
                        <Border />
                        <div className="p-10 text-white">
                            {/* Container */}
                            <div className="grid grid-cols-5 gap-6">
                                {/* Details */}
                                <div className="p-6 col-span-2 bg-[#313131] rounded-lg border-2 border-white/15">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-xl font-bold">
                                            Details
                                        </h2>
                                        {currentJob?.proposalStatus && (
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${
                                                    currentJob.proposalStatus === "PENDING"
                                                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                                        : currentJob.proposalStatus === "APPROVED"
                                                        ? "bg-green-500/20 text-green-400 border-green-500/50"
                                                        : currentJob.proposalStatus === "REJECTED"
                                                        ? "bg-red-500/20 text-red-400 border-red-500/50"
                                                        : currentJob.proposalStatus === "FINISHED"
                                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                                        : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                                                }`}
                                            >
                                                {currentJob.proposalStatus.toLowerCase()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-lg">
                                        {currentJob?.title}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-3">
                                        Posted {timeAgo(currentJob?.createdAt)}{" "}
                                        –{" "}
                                        {currentJob?.location === "Remote" ? (
                                            "Remote"
                                        ) : (
                                            <>
                                                {getCountryByCode(
                                                    currentJob?.location
                                                )}
                                                , {currentJob?.location}
                                            </>
                                        )}
                                    </p>
                                    {reqNumber > 0 ? (
                                        <p className="mt-3 text-lg">
                                            <span className="font-bold">
                                                {reqNumber}
                                            </span>{" "}
                                            People Have Applied So Far!
                                        </p>
                                    ) : (
                                        <p className="mt-3 text-base 2xl:text-lg font-bold">
                                            No applications yet. Your
                                            opportunity to stand out!
                                        </p>
                                    )}
                                </div>

                                {/* Skills And Tools */}
                                <div className="p-6 col-span-3 bg-[#313131] rounded-lg border-2 border-white/15">
                                    <h2 className="text-xl font-bold mb-2">
                                        Skills And Tools
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentJob?.tags.map(
                                            (skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Experience Needed:
                                            </span>{" "}
                                            {
                                                currentJob?.requiredExperience
                                                    ?.minimum
                                            }{" "}
                                            to{" "}
                                            {
                                                currentJob?.requiredExperience
                                                    ?.maximum
                                            }{" "}
                                            Years
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Career Level:
                                            </span>{" "}
                                            {levels.map((level) =>
                                                currentJob?.careerLevel ===
                                                level.value
                                                    ? level.text
                                                    : null
                                            )}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Education Level:
                                            </span>{" "}
                                            {educationLevels.map((level) =>
                                                currentJob?.educationLevel ===
                                                level.value
                                                    ? level.text
                                                    : null
                                            )}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Tattoos On Body:
                                            </span>{" "}
                                            Yes
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Job Salary:
                                            </span>{" "}
                                            ${currentJob?.salary}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Job Category:
                                            </span>{" "}
                                            <span className="capitalize">
                                                {currentJob?.jobCategory ===
                                                "MUSIC_AND_SOUND_ENGINEER"
                                                    ? "Music & Sound Engineer"
                                                    : currentJob?.jobCategory.toLowerCase()}
                                            </span>
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-bold">
                                                Job Duration:
                                            </span>{" "}
                                            <JobDurationContainer
                                                job={currentJob}
                                            />
                                        </p>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className="col-span-3 p-6 bg-[#313131] rounded-lg border-2 border-white/15">
                                    <h2 className="text-xl font-bold mb-2">
                                        Job Description
                                    </h2>
                                    <p className="text-sm text-gray-300">
                                        {currentJob?.description}
                                    </p>
                                </div>

                                {/* Job Requirements */}
                                <div className="p-6 col-span-2 bg-[#313131] rounded-lg border-2 border-white/15">
                                    <h2 className="text-xl font-bold mb-2">
                                        Job Requirements
                                    </h2>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                                        {requirements &&
                                            requirements.map((requirement) => (
                                                <li key={requirement.id}>
                                                    {requirement.content}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </>
        </>
    );
};

export default JobView;

const IconLink = ({ url, Icon }) => (
    <div onClick={() => window.open(url, "_blank")} className="cursor-pointer">
        <Icon size={25} />
    </div>
);

const Border = () => {
    return <div className="w-full h-[3.5px] bg-white-base/5 rounded-lg" />;
};
