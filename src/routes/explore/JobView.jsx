import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../../components/shared/Rating";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Footer } from "../../components";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useSendMessage from "../../hooks/chat/useSendMessage";
import useMessagesStore from "../../store/useMessagesStore";

const jobsData = [
    // Your jobs data...
];

const JobView = () => {
    const [currentJob, setCurrentJob] = useState(null);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { mutateAsync } = useSendMessage();
    const {setReceivedMessage} = useMessagesStore((state) => state);


    const handleNavigateToMessages = async () => {
        try {
            await mutateAsync({
                chatId: "01937253-ab36-f588-fa6c-d8d2caf8f3d9",
                message: "from individual to organization",
            }).then((res) => {
                setReceivedMessage(res.data);
            });
        } catch (err) {
            console.log(err);
        }finally{
            navigate("/messages");
        }
    };

    useEffect(() => {
        const job = jobsData.find((job) => job.id === parseInt(jobId));
        setCurrentJob(job);
    }, [jobId]);

    return (
        <section className="min-h-screen w-full">
            <div className="container mx-auto flex flex-col text-white-base pb-8">
                <div className="w-full flex justify-around items-center gap-[170px] my-8">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="flex justify-center items-end relative">
                            <div className="w-[124px] h-[124px] rounded-full bg-slate-400"></div>
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
                                {currentJob?.company}
                            </h1>
                            <p className="font-body text-white-base/50 text-base font-light capitalize">
                                {currentJob?.location}
                            </p>
                        </div>
                        <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                            organization
                        </div>
                        <div className="w-full flex items-center justify-around">
                            <IconLink url={"#"} Icon={FaInstagram} />
                            <IconLink url={"#"} Icon={FaTiktok} />
                            <IconLink url={"#"} Icon={TbWorld} />
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
                            <p className="text-lg">
                                Looking for a model to do a photoshoot in Paris
                                as soon as possible today!
                            </p>
                            <p className="text-sm text-gray-400 mt-3">
                                Posted 1 month ago – Paris, FR
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
                                    2 to 5 Years
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Career Level:
                                    </span>{" "}
                                    Experienced
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
                                    $20/Hr
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Job Category:
                                    </span>{" "}
                                    Model
                                </p>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="col-span-3 p-6 bg-[#313131] rounded-lg border-2 border-white/15">
                            <h2 className="text-xl font-bold mb-2">
                                Job Description
                            </h2>
                            <p className="text-sm text-gray-300">
                                We are seeking a charismatic fashion model to
                                collaborate on an exclusive photoshoot...
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
