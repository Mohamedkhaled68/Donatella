import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../../components/shared/Rating";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { BackButton, Footer } from "../../components";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useSendMessage from "../../hooks/chat/useSendMessage";
import { motion } from "framer-motion";
import useGetJob from "../../hooks/jobs/useGetJob";

function timeAgo(postedTime) {
    const now = new Date();
    const postedDate = new Date(postedTime);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const intervals = {
        year: 31536000, // 60 * 60 * 24 * 365
        month: 2592000, // 60 * 60 * 24 * 30
        week: 604800, // 60 * 60 * 24 * 7
        day: 86400, // 60 * 60 * 24
        hour: 3600, // 60 * 60
        minute: 60,
        second: 1,
    };

    for (const [key, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

const JobView = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState(null);
    const { mutateAsync: sendMessage } = useSendMessage();
    const [openForm, setOpenForm] = useState(false);

    const { mutateAsync: getJob } = useGetJob();

    const handleNavigateToMessages = async () => {
        try {
            await sendMessage({
                chatId: currentJob?.organization?.id,
                message: "from individual to organization",
            });
        } catch (err) {
            console.log(err);
        } finally {
            navigate("/messages");
        }
    };

    const handleApply = (e) => {
        e.preventDefault();
        setOpenForm(false);
    };

    useEffect(() => {
        const a = async () => {
            try {
                const data = await getJob(jobId);
                console.log(data);
                setCurrentJob(data);
            } catch (err) {
                console.log(err);
            }
        };

        a();
    }, [jobId]);

    return (
        <section className="min-h-screen w-full relative">
            {openForm && (
                <motion.div className="absolute w-full h-screen bg-[#0000005b]  top-0 left-0 flex justify-center items-center z-[100000]">
                    <motion.form
                        onSubmit={handleApply}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-[400px] p-[16px] bg-blue-primary text-white-base rounded-[15px] flex flex-col"
                    >
                        <h1 className="text-2xl font-bold font-body mb-[15px]">
                            Apply to job :
                        </h1>
                        <p className="mb-[20px]">$20/HR - Cairo - 7 Days</p>

                        <div className="flex flex-col gap-1">
                            <h1>Cover Letter:</h1>
                            <input
                                className="rounded-[10px] w-full outline-none border-none p-2 text-black"
                                type="text"
                            />
                        </div>
                        <div className="flex items-center mt-[16px] gap-[10px]">
                            <button
                                onClick={() => setOpenForm(false)}
                                className="w-full text-white-base border font-bold border-white-base bg-black rounded-full py-2"
                            >
                                Go Back
                            </button>
                            <button className="w-full bg-white-base font-bold text-black rounded-full py-2">
                                Apply
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}

            <div className="container mx-auto flex flex-col text-white-base pb-8">
                <div className="relative w-full flex justify-around items-center gap-[170px] my-8">
                    <BackButton className={"absolute top-3 left-1"} />
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="flex justify-center items-end relative">
                            <div className="w-[124px] h-[124px] rounded-full bg-slate-400 overflow-hidden">
                                {currentJob?.organization?.logo ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={currentJob?.organization?.logo}
                                        alt="profile"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-400"></div>
                                )}
                            </div>
                        </div>
                        <Rating
                            rating={currentJob?.rating}
                            size={20}
                            maxRating={5}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-display text-2xl font-black capitalize">
                                {currentJob?.organization?.name}
                            </h1>
                            <p className="font-body text-white-base/50 text-base font-light capitalize">
                                {currentJob?.organization?.location}
                            </p>
                        </div>
                        <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                            organization
                        </div>
                        <div className="w-full flex items-center justify-around">
                            <IconLink
                                url={currentJob?.organization?.instagram}
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
                            <div className="w-1/2 py-[9px] bg-[#293038] rounded-lg flex justify-center items-center">
                                <FaPhoneAlt size={25} />
                            </div>
                            <div
                                onClick={handleNavigateToMessages} // Add onClick to navigate to /messages
                                className="w-1/2 py-[9px] bg-[#293038] rounded-lg flex justify-center items-center cursor-pointer"
                            >
                                <FaEnvelope size={25} />
                            </div>
                        </div>
                        <button
                            onClick={() => setOpenForm(true)}
                            type="button"
                            className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[73px] py-[15px]"
                        >
                            Apply For Job
                        </button>
                    </div>
                </div>
                <Border />
                <div className="p-10 text-white">
                    {/* Container */}
                    <div className="grid grid-cols-5 gap-6">
                        {/* Details */}
                        <div className="p-6 col-span-2 bg-[#313131] rounded-lg border-2 border-white/15">
                            <h2 className="text-xl font-bold mb-2">Details</h2>
                            <p className="text-lg">{currentJob?.title}</p>
                            <p className="text-sm text-gray-400 mt-3">
                                Posted {timeAgo(currentJob?.createdAt)} –{" "}
                                {currentJob?.location}
                            </p>
                            <p className="mt-3 text-lg">
                                <span className="font-bold">81</span> People
                                Have Applied So Far!
                            </p>
                        </div>

                        {/* Skills And Tools */}
                        <div className="p-6 col-span-3 bg-[#313131] rounded-lg border-2 border-white/15">
                            <h2 className="text-xl font-bold mb-2">
                                Skills And Tools
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {[
                                    "Luxury",
                                    "Model",
                                    "Full Time",
                                    "Photoshoot",
                                    "Cairo",
                                    "Editorial",
                                    "Products",
                                    "Campaign",
                                    "Cinematic",
                                    "Collection",
                                    "Brand",
                                ].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-3">
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Experience Needed:
                                    </span>{" "}
                                    {currentJob?.requiredExperience?.minimum} to{" "}
                                    {currentJob?.requiredExperience?.maximum}{" "}
                                    Years
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Career Level:
                                    </span>{" "}
                                    {currentJob?.careerLevel}
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
                                    ${currentJob?.salary}/Hr
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Job Category:
                                    </span>{" "}
                                    {currentJob?.jobCategory}
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
                                <li>
                                    A portfolio showcasing previous work,
                                    particularly in high fashion or editorial
                                    settings.
                                </li>
                                <li>
                                    Availability for a full day of shooting.
                                </li>
                                <li>
                                    Must be comfortable with various wardrobe
                                    changes and styles.
                                </li>
                                <li>
                                    Professional attitude and willingness to
                                    collaborate with the creative team.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
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
