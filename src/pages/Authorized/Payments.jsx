import React, { useEffect, useState } from "react";
import { Footer, JobCard, Rating } from "../../components";
import { orgLogo } from "../../assets";
import { HiMiniEye } from "react-icons/hi2";
import { HiMiniEyeSlash } from "react-icons/hi2";
import useGetBalance from "../../hooks/payments/useGetBalance";
import toast from "react-hot-toast";

const jobs = [
    // {
    //     name: "EMG Models",
    //     location: "New York, USA",
    //     description:
    //         "Seeking a Talented Fashion Model for an Urban Photoshoot to Showcase Our Latest Collection",
    //     rate: "$12/HR",
    //     duration: "1-2 months",
    //     tags: ["Fashion", "Photoshoot", "Model", "Urban"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "United Models",
    //     location: "Los Angeles, USA",
    //     description:
    //         "Looking for an Experienced Photographer to Capture the Magic of a Luxury Wedding Celebration",
    //     rate: "$18/HR",
    //     duration: "2-3 months",
    //     tags: ["Wedding", "Photography", "Luxury", "Experience"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Every Inch",
    //     location: "San Francisco, USA",
    //     description:
    //         "Searching for a Creative Model to Bring Our Short Film Vision to Life with Stunning Visuals",
    //     rate: "$10/HR",
    //     duration: "1-2 weeks",
    //     tags: ["Film", "Visuals", "Creativity", "Model"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Vibrant Vision",
    //     location: "Seattle, USA",
    //     description:
    //         "Charismatic Fashion Model for a High-End Photoshoot of Our Exclusive Collection",
    //     rate: "$20/HR",
    //     duration: "3 months",
    //     tags: ["Fashion", "Charisma", "Photoshoot", "High-End"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Capture Dreams",
    //     location: "Chicago, USA",
    //     description:
    //         "Talented Photographer Wanted for a Large-Scale Corporate Event Coverage",
    //     rate: "$25/HR",
    //     duration: "2 weeks",
    //     tags: ["Corporate", "Photography", "Event", "Professional"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Visionary Shoots",
    //     location: "Miami, USA",
    //     description: "Lifestyle Photographer for a Casual Beach Photoshoot",
    //     rate: "$15/HR",
    //     duration: "1 week",
    //     tags: ["Lifestyle", "Beach", "Photography", "Relaxed"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Starlight Studios",
    //     location: "Austin, USA",
    //     description:
    //         "Seeking a Unique Model for Our Sci-Fi Inspired Magazine Cover Shoot",
    //     rate: "$30/HR",
    //     duration: "1-2 months",
    //     tags: ["Sci-Fi", "Model", "Magazine", "Unique"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Eventful Moments",
    //     location: "Boston, USA",
    //     description:
    //         "Energetic Photographer Needed for a Marathon Event Coverage",
    //     rate: "$22/HR",
    //     duration: "1 week",
    //     tags: ["Event", "Marathon", "Photography", "Energy"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Classic Capture",
    //     location: "Dallas, USA",
    //     description:
    //         "Experienced Wedding Photographer to Document a Romantic Destination Wedding",
    //     rate: "$28/HR",
    //     duration: "1 month",
    //     tags: ["Wedding", "Photography", "Romantic", "Destination"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Urban Edge",
    //     location: "Houston, USA",
    //     description: "Seeking a Male Model for an Edgy Urban Wear Campaign",
    //     rate: "$18/HR",
    //     duration: "2 months",
    //     tags: ["Urban", "Male", "Model", "Fashion"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Sunset Shoots",
    //     location: "Phoenix, USA",
    //     description: "Model Needed for a Golden Hour Beach Photoshoot",
    //     rate: "$15/HR",
    //     duration: "2 weeks",
    //     tags: ["Beach", "Golden Hour", "Model", "Photography"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Timeless Tales",
    //     location: "Orlando, USA",
    //     description:
    //         "Looking for an Artistic Photographer to Capture Timeless Moments",
    //     rate: "$26/HR",
    //     duration: "3 weeks",
    //     tags: ["Artistic", "Photography", "Timeless", "Creativity"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Fresh Frames",
    //     location: "Denver, USA",
    //     description: "Model Required for a High-Energy Athletic Wear Campaign",
    //     rate: "$20/HR",
    //     duration: "1 month",
    //     tags: ["Athletic", "Energy", "Model", "Campaign"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Elegant Edits",
    //     location: "Nashville, USA",
    //     description: "Fashion Photographer Needed for a Runway Show Coverage",
    //     rate: "$35/HR",
    //     duration: "1 day",
    //     tags: ["Runway", "Fashion", "Photography", "Professional"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Modern Muse",
    //     location: "Portland, USA",
    //     description:
    //         "Creative Director and Photographer for a Lifestyle Brand Photoshoot",
    //     rate: "$40/HR",
    //     duration: "2 months",
    //     tags: ["Creative", "Lifestyle", "Photography", "Director"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Golden Glimpse",
    //     location: "Las Vegas, USA",
    //     description:
    //         "Experienced Event Photographer for a Grand Casino Night Event",
    //     rate: "$30/HR",
    //     duration: "2 days",
    //     tags: ["Event", "Casino", "Photography", "Grand"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Vivid Visions",
    //     location: "San Diego, USA",
    //     description:
    //         "Talented Model Needed for a Vibrant Summerwear Collection",
    //     rate: "$18/HR",
    //     duration: "3 weeks",
    //     tags: ["Summer", "Fashion", "Model", "Vibrant"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Prime Pixels",
    //     location: "Charlotte, USA",
    //     description:
    //         "Creative Photographer Required for a Product Photography Session",
    //     rate: "$25/HR",
    //     duration: "1 week",
    //     tags: ["Product", "Photography", "Creative", "Session"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
    // {
    //     name: "Studio Solace",
    //     location: "San Jose, USA",
    //     description:
    //         "Photographer Needed for a Cozy Indoor Lifestyle Photoshoot",
    //     rate: "$22/HR",
    //     duration: "1 month",
    //     tags: ["Lifestyle", "Cozy", "Photography", "Indoor"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 4,
    // },
    // {
    //     name: "Cinematic Frames",
    //     location: "Atlanta, USA",
    //     description: "Lead Photographer for a Cinematic Short Film Project",
    //     rate: "$50/HR",
    //     duration: "2-3 months",
    //     tags: ["Cinematic", "Film", "Photography", "Lead"],
    //     logo: "https://via.placeholder.com/50",
    //     rating: 5,
    // },
];

const PAGE_SIZE = 10;

const Payments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [balance, setBalance] = useState(true);
    const [deposit, setDeposit] = useState(true);
    const [withdraw, setWithdraw] = useState(true);
    const { mutateAsync: getBalance } = useGetBalance();

    // Calculate the jobs to display for the current page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentJobs = jobs.length !== 0 && jobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(jobs.length / PAGE_SIZE);

    const hideBalance = () => {
        setBalance(!balance);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const getUserBalance = async () => {
        const balanceData = await getBalance();
        console.log(balanceData);
    };

    useEffect(() => {
        getUserBalance();
    }, []);

    return (
        <>
            <div className="p-6 px-[5rem] space-y-6 text-white min-h-screen">
                {/* Payment Details Section */}
                <div className="flex flex-col">
                    <h1 className="text-[38px] font-bold font-display mb-5">
                        Payments Details
                    </h1>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-3 flex items-center justify-between gap-6 text-black bg-white-base px-6 h-full rounded-lg">
                            <div className="text-center grow h-full flex flex-col justify-center items-center">
                                <h3 className="text-[46px] font-bold">0</h3>
                                <p className="text-sm font-light">
                                    Projects Completed
                                </p>
                            </div>
                            <div className="relative text-center border-x-thin border-black grow h-full flex flex-col justify-center items-center">
                                <span className="absolute top-0 right-0 p-3">
                                    {deposit ? (
                                        <HiMiniEyeSlash
                                            className="cursor-pointer"
                                            size={25}
                                            onClick={() => setDeposit(!deposit)}
                                        />
                                    ) : (
                                        <HiMiniEye
                                            className="cursor-pointer"
                                            size={25}
                                            onClick={() => setDeposit(!deposit)}
                                        />
                                    )}
                                </span>
                                <h3 className="text-[46px] font-bold">
                                    ${deposit ? "0" : "*****"}
                                </h3>
                                <p className="text-sm font-light">Earnings</p>
                            </div>
                            <div className="relative text-center grow h-full flex flex-col justify-center items-center">
                                <span className="absolute top-0 right-0 p-3">
                                    {withdraw ? (
                                        <HiMiniEyeSlash
                                            className="cursor-pointer"
                                            size={25}
                                            onClick={() =>
                                                setWithdraw(!withdraw)
                                            }
                                        />
                                    ) : (
                                        <HiMiniEye
                                            className="cursor-pointer"
                                            size={25}
                                            onClick={() =>
                                                setWithdraw(!withdraw)
                                            }
                                        />
                                    )}
                                </span>
                                <h3 className="text-[46px] font-bold">
                                    ${withdraw ? "0" : "*****"}
                                </h3>
                                <p className="text-sm font-light">
                                    Available to Withdraw
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <button
                                onClick={() =>
                                    toast.error("Comming Soon", {
                                        icon: "🚧",
                                    })
                                }
                                className="w-full bg-transparent border-thin text-[20px] font-light border-blue-primary  text-white px-[55px] py-[21px] rounded-lg"
                            >
                                Deposit
                            </button>
                            <button
                                onClick={() =>
                                    toast.error("Comming Soon", {
                                        icon: "🚧",
                                    })
                                }
                                className="w-full bg-white-base text-[20px] font-bold  text-[#121417] px-[55px] py-[21px] rounded-lg"
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                {/* Button */}

                {/* Job History Section */}
                <div className="space-y-6">
                    <h1 className="text-[38px] font-bold font-display mb-5">
                        Job History
                    </h1>
                    {currentJobs ? (
                        currentJobs.map((job, idx) => (
                            <div
                                key={idx}
                                className="flex items-center bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 gap-5 space-x-4 shadow-lg "
                            >
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <img
                                        src={orgLogo}
                                        alt={`${job.name} logo`}
                                        className="w-[120px] h-[120px] rounded-full"
                                    />
                                    <Rating size={15} rating={job.rating} />
                                </div>
                                <div className="flex-1 grow">
                                    <h3 className="font-bold border-b border-white-base/10 pb-3 w-[50%]">
                                        <span className="text-white-base text-md font-bold font-display capitalize">
                                            {job.name}{" "}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            - {job.location}
                                        </span>
                                    </h3>
                                    <p className="text-[22px] font-bold text-white-base w-[80%] mt-2">
                                        {job.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {job.tags.map((tag, index) => (
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
                                    <p className="text-[20px] font-bold">{`${job.rate}`}</p>
                                    <p className="text-sm text-gray-400 capitalize">
                                        {job.duration}
                                    </p>
                                    <button
                                        // onClick={handleNavigateToJob}
                                        className="bg-blue-primary hover:bg-blue-600 duration-200 text-white py-3 px-[60px] rounded-[46px] text-md font-bold"
                                    >
                                        View Job
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="flex items-center justify-center text-[#fcfcfcbf] rounded-lg p-6 gap-5 space-x-4 font-display text-[20px]">
                                Any jobs you finish in the future will show
                                up in here.
                            </div>
                        </>
                    )}
                </div>
                {currentJobs && (
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${
                                currentPage === 1
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                        >
                            Previous
                        </button>
                        <p className="text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${
                                currentPage === totalPages
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Payments;
