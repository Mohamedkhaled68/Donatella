import { useEffect, useState } from "react";
import { Footer } from "../../components";
import { orgLogo } from "../../assets";
import { HiMiniEye } from "react-icons/hi2";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FaBriefcase, FaCheckCircle, FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import useGetBalance from "../../hooks/payments/useGetBalance";
import useGetJobHistory from "../../hooks/organization/useGetJobHistory";
import useGetIndividualJobHistory from "../../hooks/individual/useGetIndividualJobHistory";
import { useUserStore } from "../../store/userStore";
import JobDurationContainer from "../../components/shared/JobDurationContainer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const PAGE_SIZE = 10;

const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: "180deg" },
    down: { rotate: 0 },
};

const jobStatusOptions = [
    { value: "", label: "All Statuses" },
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "FINISHED", label: "Finished" },
];

const proposalStatusOptions = [
    { value: "", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "FINISHED", label: "Finished" },
];

const Payments = () => {
    const navigate = useNavigate();
    const { userStatus } = useUserStore((state) => state);
    const isIndividual = userStatus?.role === "INDIVIDUAL";
    const isOrganization = userStatus?.role === "ORGANIZATION";
    
    const [currentPage, setCurrentPage] = useState(1);
    const [balance, setBalance] = useState(true);
    const [deposit, setDeposit] = useState(true);
    const [withdraw, setWithdraw] = useState(true);
    const [jobHistory, setJobHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filters, setFilters] = useState({});
    const { mutateAsync: getBalance } = useGetBalance();
    const { mutateAsync: getJobHistory } = useGetJobHistory();
    const { mutateAsync: getIndividualJobHistory } = useGetIndividualJobHistory();

    const getJobStatusColor = (status) => {
        switch (status) {
            case "OPEN":
                return "bg-green-500/20 text-green-400 border-green-500/50";
            case "CLOSED":
                return "bg-gray-500/20 text-gray-400 border-gray-500/50";
            case "ACCEPTED":
                return "bg-blue-500/20 text-blue-400 border-blue-500/50";
            case "FINISHED":
                return "bg-purple-500/20 text-purple-400 border-purple-500/50";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/50";
        }
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
                return "bg-purple-500/20 text-purple-400 border-purple-500/50";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/50";
        }
    };

    const formatJobStatus = (status) => {
        if (!status) return "Unknown";
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    const formatProposalStatus = (status) => {
        if (!status) return "Unknown";
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    const handleNextPage = () => {
        if (jobHistory?.pageInfo?.hasNext) {
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

    const fetchJobHistory = async () => {
        try {
            setLoading(true);
            const hookToUse = isIndividual ? getIndividualJobHistory : getJobHistory;
            const data = await hookToUse({ 
                page: currentPage, 
                limit: PAGE_SIZE,
                filters 
            });
            setJobHistory(data);
        } catch (error) {
            toast.error(error?.message || "Failed to fetch job history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserBalance();
    }, []);

    useEffect(() => {
        fetchJobHistory();
    }, [currentPage, filters]);

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

                {/* Job History Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-[38px] font-bold font-display">
                            Job History
                        </h1>
                        <div
                            onClick={() => setOpenFilter((prev) => !prev)}
                            className="px-4 cursor-pointer py-2 flex items-center gap-3 border-thin border-white-base text-white-base rounded-lg"
                        >
                            <FaBriefcase size={20} className="text-white-base" />
                            <div className="flex items-center justify-between gap-[5px]">
                                <p>Filters</p>
                                <motion.div
                                    initial="down"
                                    animate={openFilter ? "up" : "down"}
                                    variants={filterAnimationVariants}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex justify-center items-center"
                                >
                                    <FaAngleDown />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Dropdown */}
                    <motion.div
                        initial="closed"
                        animate={openFilter ? "open" : "closed"}
                        variants={filterAnimationVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="w-full rounded-lg bg-[#27292C] flex flex-wrap justify-between items-center gap-4 px-4 py-3">
                            {/* Job Name Filter */}
                            <div className="flex items-center gap-2">
                                <FaSearch color="#197FE5" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by job name..."
                                    className="bg-transparent p-2 outline-none border-none text-white-base min-w-[200px] text-sm placeholder-gray-400"
                                    value={filters.jobName || ""}
                                    onChange={(e) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            jobName: e.target.value || undefined,
                                        }));
                                        setCurrentPage(1); // Reset to first page when filter changes
                                    }}
                                />
                            </div>

                            {/* Status Filter - Job Status for Organizations, Proposal Status for Individuals */}
                            <div className="flex items-center gap-2">
                                <FaCheckCircle color="#197FE5" size={16} />
                                <select
                                    className="bg-transparent p-2 outline-none border-none text-white-base min-w-[200px] text-sm"
                                    value={isIndividual ? (filters.proposalStatus || "") : (filters.jobStatus || "")}
                                    onChange={(e) => {
                                        if (isIndividual) {
                                            setFilters((prev) => ({
                                                ...prev,
                                                proposalStatus: e.target.value || undefined,
                                                jobStatus: undefined, // Clear jobStatus if it exists
                                            }));
                                        } else {
                                            setFilters((prev) => ({
                                                ...prev,
                                                jobStatus: e.target.value || undefined,
                                                proposalStatus: undefined, // Clear proposalStatus if it exists
                                            }));
                                        }
                                        setCurrentPage(1); // Reset to first page when filter changes
                                    }}
                                >
                                    {(isIndividual ? proposalStatusOptions : jobStatusOptions).map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                    {loading ? (
                        <div className="flex items-center justify-center text-[#fcfcfcbf] rounded-lg p-6 gap-5 space-x-4 font-display text-[20px]">
                            Loading job history...
                        </div>
                    ) : jobHistory?.items && jobHistory.items.length > 0 ? (
                        <>
                            {jobHistory.items.map((job) => (
                                <div
                                    key={job.id}
                                    className="flex items-center bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 gap-5 space-x-4 shadow-lg"
                                >
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <img
                                            src={job.organization?.logo || orgLogo}
                                            alt={`${job.organization?.name || "Organization"} logo`}
                                            className="w-[120px] h-[120px] rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 grow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold border-b border-white-base/10 pb-3 w-[50%]">
                                                <span className="text-white-base text-md font-bold font-display capitalize">
                                                    {job.title}
                                                </span>
                                                <span className="text-sm text-gray-400 ml-2">
                                                    - {job.location}
                                                </span>
                                            </h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                                    isIndividual 
                                                        ? getProposalStatusColor(job.proposalStatus)
                                                        : getJobStatusColor(job.jobStatus)
                                                }`}
                                            >
                                                {isIndividual 
                                                    ? formatProposalStatus(job.proposalStatus)
                                                    : formatJobStatus(job.jobStatus)
                                                }
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {job.tags && job.tags.length > 0 ? (
                                                job.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : null}
                                        </div>
                                        <div className="flex items-center gap-4 mt-3">
                                            <p className="text-sm text-gray-400">
                                                {job.salary 
                                                    ? `Salary: $${job.salary}/hr` 
                                                    : "Cost: Negotiable"}
                                            </p>
                                            {job.jobDuration && (
                                                <p className="text-sm text-gray-400">
                                                    Duration: <JobDurationContainer job={job} />
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center items-center gap-3">
                                        <button
                                            onClick={() => navigate(`/explore/jobs/${job.id}`)}
                                            className="bg-blue-primary hover:bg-blue-600 duration-200 text-white py-3 px-[60px] rounded-[46px] text-md font-bold"
                                        >
                                            View Job
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex items-center justify-center text-[#fcfcfcbf] rounded-lg p-6 gap-5 space-x-4 font-display text-[20px]">
                            {isIndividual 
                                ? "Any jobs you apply to in the future will show up in here."
                                : "Any jobs you publish in the future will show up in here."
                            }
                        </div>
                    )}
                </div>
                {jobHistory?.pageInfo && (
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={handlePreviousPage}
                            disabled={!jobHistory.pageInfo.hasBefore || loading}
                            className={`px-4 py-2 rounded ${
                                !jobHistory.pageInfo.hasBefore || loading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                        >
                            Previous
                        </button>
                        <p className="text-sm text-gray-400">
                            Page {jobHistory.pageInfo.page} of{" "}
                            {Math.ceil(jobHistory.pageInfo.totalCount / jobHistory.pageInfo.limit)}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={!jobHistory.pageInfo.hasNext || loading}
                            className={`px-4 py-2 rounded ${
                                !jobHistory.pageInfo.hasNext || loading
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
