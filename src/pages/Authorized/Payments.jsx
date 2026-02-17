import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBriefcase, FaCheckCircle, FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { orgLogo } from "../../assets";
import { Footer } from "../../components";
import DepositModal from "../../components/payments/DepositModal";
import WithdrawalDetail from "../../components/payments/WithdrawalDetail";
import WithdrawalModal from "../../components/payments/WithdrawalModal";
import JobDurationContainer from "../../components/shared/JobDurationContainer";
import useGetIndividualJobHistory from "../../hooks/individual/useGetIndividualJobHistory";
import useGetJobHistory from "../../hooks/organization/useGetJobHistory";
import useGetBalance from "../../hooks/payments/useGetBalance";
import useGetPaymentHistory from "../../hooks/payments/useGetPaymentHistory";
import useGetWithdrawals from "../../hooks/payments/useGetWithdrawals";
import { useI18n } from "../../hooks/useI18n";
import { useUserStore } from "../../store/userStore";

const PAGE_SIZE = 10;

const filterAnimationVariants = {
  open: { height: "auto" },
  closed: { height: 0 },
  up: { rotate: "180deg" },
  down: { rotate: 0 },
};

const Payments = () => {
  const navigate = useNavigate();
  const { userStatus } = useUserStore((state) => state);
  const { t } = useI18n();
  const isIndividual = userStatus?.role === "INDIVIDUAL";

  const jobStatusOptions = [
    { value: "", label: t("payments.allStatuses") },
    { value: "OPEN", label: t("explore.filters.open") },
    { value: "CLOSED", label: t("explore.filters.closed") },
    { value: "ACCEPTED", label: t("explore.filters.accepted") },
    { value: "FINISHED", label: t("explore.filters.finished") },
  ];

  const proposalStatusOptions = [
    { value: "", label: t("payments.allStatuses") },
    { value: "PENDING", label: t("explore.filters.pending") },
    { value: "APPROVED", label: t("explore.filters.approved") },
    { value: "REJECTED", label: t("explore.filters.rejected") },
    { value: "FINISHED", label: t("explore.filters.finished") },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [depositVisible, setDepositVisible] = useState(true);
  const [withdrawVisible, setWithdrawVisible] = useState(true);
  const [jobHistory, setJobHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [isWithdrawalDetailOpen, setIsWithdrawalDetailOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const { mutateAsync: getBalance } = useGetBalance();
  const { mutateAsync: getJobHistory } = useGetJobHistory();
  const { mutateAsync: getIndividualJobHistory } = useGetIndividualJobHistory();
  const { data: paymentHistory } = useGetPaymentHistory();
  const { data: withdrawals, refetch: refetchWithdrawals } =
    useGetWithdrawals();

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
    const statusMap = {
      OPEN: t("explore.filters.open"),
      CLOSED: t("explore.filters.closed"),
      ACCEPTED: t("explore.filters.accepted"),
      FINISHED: t("explore.filters.finished"),
    };
    return (
      statusMap[status] || status.charAt(0) + status.slice(1).toLowerCase()
    );
  };

  const formatProposalStatus = (status) => {
    if (!status) return "Unknown";
    const statusMap = {
      PENDING: t("explore.filters.pending"),
      APPROVED: t("explore.filters.approved"),
      REJECTED: t("explore.filters.rejected"),
      FINISHED: t("explore.filters.finished"),
    };
    return (
      statusMap[status] || status.charAt(0) + status.slice(1).toLowerCase()
    );
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

  const [reservedBalance, setReservedBalance] = useState(0);

  const getUserBalance = useCallback(async () => {
    try {
      const balanceData = await getBalance();
      const totalBalance = balanceData?.balance || 0;
      const availableBalance = balanceData?.availableBalance ?? totalBalance;
      const reserved = balanceData?.reservedBalance || 0;

      setUserBalance(availableBalance);
      setReservedBalance(reserved);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  }, [getBalance]);

  const fetchJobHistory = useCallback(async () => {
    try {
      setLoading(true);
      const hookToUse = isIndividual ? getIndividualJobHistory : getJobHistory;
      const data = await hookToUse({
        page: currentPage,
        limit: PAGE_SIZE,
        filters,
      });
      setJobHistory(data);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch job history");
    } finally {
      setLoading(false);
    }
  }, [
    isIndividual,
    getIndividualJobHistory,
    getJobHistory,
    currentPage,
    filters,
  ]);

  useEffect(() => {
    getUserBalance();
  }, [getUserBalance]);

  useEffect(() => {
    fetchJobHistory();
  }, [fetchJobHistory]);

  const handleWithdrawalSuccess = () => {
    getUserBalance();
    refetchWithdrawals();
  };

  return (
    <>
      <div className="p-6 px-[5rem] space-y-6 text-white min-h-screen">
        {/* Payment Details Section */}
        <div className="flex flex-col">
          <h1 className="text-[38px] font-bold font-display mb-5">
            {t("payments.paymentsDetails")}
          </h1>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 flex items-center justify-between gap-6 text-black bg-white-base px-6 h-full rounded-lg">
              <div className="text-center grow h-full flex flex-col justify-center items-center">
                <h3 className="text-[46px] font-bold">0</h3>
                <p className="text-sm font-light">
                  {t("payments.projectsCompleted")}
                </p>
              </div>
              <div className="relative text-center border-x-thin border-black grow h-full flex flex-col justify-center items-center">
                <span className="absolute top-0 right-0 p-3">
                  {depositVisible ? (
                    <HiMiniEyeSlash
                      className="cursor-pointer"
                      size={25}
                      onClick={() => setDepositVisible(!depositVisible)}
                    />
                  ) : (
                    <HiMiniEye
                      className="cursor-pointer"
                      size={25}
                      onClick={() => setDepositVisible(!depositVisible)}
                    />
                  )}
                </span>
                <h3 className="text-[46px] font-bold">
                  {depositVisible
                    ? (userBalance + reservedBalance).toFixed(2)
                    : "*****"}
                  ﷼
                </h3>
                <p className="text-sm font-light">
                  {t("payments.totalEarnings")}
                </p>
              </div>
              <div className="relative text-center grow h-full flex flex-col justify-center items-center">
                <span className="absolute top-0 right-0 p-3">
                  {withdrawVisible ? (
                    <HiMiniEyeSlash
                      className="cursor-pointer"
                      size={25}
                      onClick={() => setWithdrawVisible(!withdrawVisible)}
                    />
                  ) : (
                    <HiMiniEye
                      className="cursor-pointer"
                      size={25}
                      onClick={() => setWithdrawVisible(!withdrawVisible)}
                    />
                  )}
                </span>
                <h3 className="text-[46px] font-bold">
                  {withdrawVisible ? userBalance.toFixed(2) : "*****"}﷼
                </h3>
                <p className="text-sm font-light">
                  {t("payments.availableToWithdraw")}
                </p>
                {reservedBalance > 0 && withdrawVisible && (
                  <p className="text-xs text-yellow-400 mt-1">
                    {t("constants.currency")} {reservedBalance.toFixed(2)}{" "}
                    {t("payments.pending")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="w-full bg-transparent border-thin text-[20px] font-light border-blue-primary  text-white px-[55px] py-[21px] rounded-lg hover:bg-blue-primary/10 transition"
              >
                {t("payments.deposit")}
              </button>
              <button
                onClick={() => setIsWithdrawalModalOpen(true)}
                className="w-full bg-white-base text-[20px] font-bold  text-[#121417] px-[55px] py-[21px] rounded-lg hover:bg-gray-200 transition"
              >
                {t("payments.withdraw")}
              </button>
            </div>
          </div>
        </div>

        {/* Job History Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-[38px] font-bold font-display">
              {t("payments.jobHistory")}
            </h1>
            <div
              onClick={() => setOpenFilter((prev) => !prev)}
              className="px-4 cursor-pointer py-2 flex items-center gap-3 border-thin border-white-base text-white-base rounded-lg"
            >
              <FaBriefcase size={20} className="text-white-base" />
              <div className="flex items-center justify-between gap-[5px]">
                <p>{t("payments.filters")}</p>
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
                  placeholder={t("payments.searchByJobName")}
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
                  value={
                    isIndividual
                      ? filters.proposalStatus || ""
                      : filters.jobStatus || ""
                  }
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
                  {(isIndividual
                    ? proposalStatusOptions
                    : jobStatusOptions
                  ).map((option) => (
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
              {t("payments.loadingJobHistory")}
            </div>
          ) : jobHistory?.items && jobHistory.items.length > 0 ? (
            jobHistory.items.map((job) => (
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
                        : formatJobStatus(job.jobStatus)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags && job.tags.length > 0
                      ? job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))
                      : null}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-sm text-gray-400">
                      {job.salary
                        ? `${t("payments.salary")}: $${job.salary}/hr`
                        : t("payments.costNegotiable")}
                    </p>
                    {job.jobDuration && (
                      <p className="text-sm text-gray-400">
                        {t("payments.duration")}:{" "}
                        <JobDurationContainer job={job} />
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-3">
                  <button
                    onClick={() => navigate(`/explore/jobs/${job.id}`)}
                    className="bg-blue-primary hover:bg-blue-600 duration-200 text-white py-3 px-[60px] rounded-[46px] text-md font-bold"
                  >
                    {t("payments.viewJob")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center text-[#fcfcfcbf] rounded-lg p-6 gap-5 space-x-4 font-display text-[20px]">
              {isIndividual
                ? t("payments.noJobsIndividual")
                : t("payments.noJobsOrganization")}
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
              {t("payments.previous")}
            </button>
            <p className="text-sm text-gray-400">
              {t("payments.page")} {jobHistory.pageInfo.page} {t("payments.of")}{" "}
              {Math.ceil(
                jobHistory.pageInfo.totalCount / jobHistory.pageInfo.limit,
              )}
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
              {t("payments.next")}
            </button>
          </div>
        )}

        {/* Payment History Section */}
        {paymentHistory && paymentHistory.length > 0 && (
          <div className="space-y-6 mt-8">
            <h1 className="text-[38px] font-bold font-display">
              {t("payments.paymentHistory")}
            </h1>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {payment.type === "DEPOSIT"
                          ? t("payments.deposit")
                          : t("payments.withdrawal")}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          payment.type === "DEPOSIT"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {payment.type === "DEPOSIT" ? "+" : "-"}
                        {t("constants.currency")}{" "}
                        {parseFloat(payment.totalAmount || 0).toFixed(2)}
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.state === "SUCCESS"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : payment.state === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                              : "bg-red-500/20 text-red-400 border border-red-500/50"
                        }`}
                      >
                        {payment.state}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Withdrawal Requests Section */}
        {withdrawals && withdrawals.length > 0 && (
          <div className="space-y-6 mt-8">
            <h1 className="text-[38px] font-bold font-display">
              {t("payments.withdrawalRequests")}
            </h1>
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-[#313131] text-white border-thin border-white-base rounded-lg p-6 shadow-lg cursor-pointer hover:bg-[#3a3a3a] transition"
                  onClick={() => {
                    setSelectedWithdrawal(withdrawal);
                    setIsWithdrawalDetailOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {t("payments.withdrawalRequest")}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t("payments.ibanLabel")}:{" "}
                        {`${withdrawal.iban
                          .replace(/(.{4})/g, "$1 ")
                          .trim()
                          .slice(0, -1)}****`}
                      </p>
                      <p className="text-xs text-blue-400 mt-2">
                        {t("payments.clickToViewDetails")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-400">
                        - {parseFloat(withdrawal.amount || 0).toFixed(2)} ﷼
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          withdrawal.status === "PROCESSED"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : withdrawal.status === "APPROVED"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                              : withdrawal.status === "REJECTED"
                                ? "bg-red-500/20 text-red-400 border border-red-500/50"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                        }`}
                      >
                        {withdrawal.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          getUserBalance();
        }}
      />
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSuccess={handleWithdrawalSuccess}
      />
      <WithdrawalDetail
        withdrawal={selectedWithdrawal}
        isOpen={isWithdrawalDetailOpen}
        onClose={() => {
          setIsWithdrawalDetailOpen(false);
          setSelectedWithdrawal(null);
        }}
      />
      <Footer />
    </>
  );
};

export default Payments;
