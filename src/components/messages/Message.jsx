import React, { useEffect } from "react";
import { getCountryByCode } from "../../utils/helpers";
import { useUserStore } from "../../store/userStore";
import useAcceptJob from "../../hooks/jobs/useAcceptJob";
import useRejectJob from "../../hooks/jobs/useRejectJob";
import toast from "react-hot-toast";
import useFinishJob from "../../hooks/jobs/useFinishJob";

const Message = ({
    message,
    timestamp,
    isSender,
    type,
    jobRequest,
    setReviewModal,
    setFinishedJob,
    setJob,
}) => {
    const userStatus = useUserStore((state) => state.userStatus);
    const { mutateAsync: acceptJob } = useAcceptJob();
    const { mutateAsync: rejectJob } = useRejectJob();
    const { mutateAsync: finishJob } = useFinishJob();

    const handleAcceptJob = async () => {
        if (!jobRequest) return;
        try {
            await acceptJob({
                jobId: jobRequest.job.id,
                requestId: jobRequest.id,
            });

            toast.success("Job accepted successfully!");
        } catch (err) {
            toast.error(err?.response?.data?.message);
            console.log(err?.response?.data?.message);
        }
    };
    const handleRejectJob = async () => {
        if (!jobRequest) return;
        try {
            await rejectJob({
                jobId: jobRequest.job.id,
                requestId: jobRequest.id,
            });

            toast.success("Job rejected successfully!");
        } catch (err) {
            toast.error(err?.response?.data?.message);
            console.log(err?.response?.data?.message);
        }
    };
    const handleFinishJob = async () => {
        if (!jobRequest) return;
        try {
            await finishJob({
                jobId: jobRequest.job.id,
                requestId: jobRequest.id,
            });
            toast.success("Job finished successfully!");
            setFinishedJob(jobRequest);
            setReviewModal(true);
        } catch (err) {
            toast.error(err?.response?.data?.message);
            console.log(err?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (jobRequest) {
            setJob(jobRequest?.job);
        }
    }, [jobRequest]);

    return (
        <>
            {type === "REQUEST" ? (
                <>
                    <div
                        className={`my-[10px] max-w-[60%] w-fit ${
                            isSender
                                ? "self-end items-end"
                                : "self-start items-start"
                        } flex flex-col  gap-2`}
                    >
                        <div
                            className={`px-[20px] py-[10px] ${
                                isSender ? "bg-blue-primary" : "bg-zinc-700"
                            } text-white-base text-[16px] font-light rounded-[19px] break-words min-w-[370px] whitespace-pre-wrap flex flex-col gap-2 items-start`}
                        >
                            <h1 className="text-white-base text-2xl font-semibold">
                                New Contract:
                            </h1>
                            <p>
                                {jobRequest?.job?.salary}/HR -{" "}
                                {getCountryByCode(jobRequest?.job?.location)} -{" "}
                                {jobRequest?.job?.jobDuration?.minimum} ~{" "}
                                {jobRequest?.job?.jobDuration?.maximum}{" "}
                                <span className="capitalize">
                                    {jobRequest?.job?.jobDuration?.minimumPrefix.toLowerCase()}
                                </span>
                            </p>
                            <p>{message}</p>
                            {userStatus?.role === "INDIVIDUAL" ? (
                                <>
                                    <div className="flex justify-center items-center mt-3 w-full">
                                        <div className="text-white-base capitalize text-center border border-white-base font-semibold rounded-3xl py-2 px-16 bg-transparent w-full">
                                            {jobRequest?.requestStatus.toLowerCase()}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center gap-3 mt-3 w-full">
                                        {jobRequest?.requestStatus ===
                                        "REJECTED" ? (
                                            <div className="text-white-base capitalize text-center border border-white-base font-semibold rounded-3xl py-2 px-16 bg-transparent w-full">
                                                {jobRequest?.requestStatus.toLowerCase()}
                                            </div>
                                        ) : jobRequest?.requestStatus ===
                                          "APPROVED" ? (
                                            <>
                                                <button
                                                    onClick={handleFinishJob}
                                                    type="button"
                                                    className="bg-background-dark font-semibold rounded-3xl py-2 px-16 text-white-base w-full"
                                                >
                                                    Finish Job
                                                </button>
                                            </>
                                        ) : jobRequest?.requestStatus ===
                                          "FINISHED" ? (
                                            <>
                                                <div className="text-white-base capitalize text-center border border-white-base font-semibold rounded-3xl py-2 px-16 bg-transparent w-full">
                                                    {jobRequest?.requestStatus.toLowerCase()}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleRejectJob}
                                                    type="button"
                                                    className="bg-background-dark font-semibold rounded-3xl py-2 px-16 text-white-base"
                                                >
                                                    Decline
                                                </button>
                                                <button
                                                    onClick={handleAcceptJob}
                                                    type="button"
                                                    className="bg-white-base font-semibold rounded-3xl py-2 px-16 text-background-dark"
                                                >
                                                    Accept
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <span className="text-sm font-light text-[#707070]">
                            {timestamp}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`my-[10px] max-w-[60%] w-fit ${
                            isSender
                                ? "self-end items-end"
                                : "self-start items-start"
                        } flex flex-col  gap-2`}
                    >
                        <div
                            className={`px-[20px] py-[10px] ${
                                isSender ? "bg-blue-primary" : "bg-zinc-700"
                            } text-white-base text-[16px] font-light rounded-[19px] break-words max-w-full whitespace-pre-wrap`}
                        >
                            <p>{message}</p>
                        </div>
                        <span className="text-sm font-light text-[#707070]">
                            {timestamp}
                        </span>
                    </div>
                </>
            )}
        </>
    );
};

export default Message;
