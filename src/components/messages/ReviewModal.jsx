import React, { useState } from "react";
import ToRating from "../shared/ToRating";
import useReview from "../../hooks/jobs/useReview";
import toast from "react-hot-toast";
import { getCountryByCode } from "../../utils/helpers";
import JobDurationContainer from "../shared/JobDurationContainer";

const ReviewModal = ({ setReviewModal, FinishedJob, job }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { mutateAsync: review } = useReview();

    const handleReview = async () => {
        if (!FinishedJob) {
            return;
        }
        if (!comment || !rating) {
            toast.error("Please add a comment and rate the client!");
        }

        try {
            console.log({
                comment,
                rating,
            });
            await review({
                comment,
                rating,
                jobId: FinishedJob.job.id,
            });
            setReviewModal(false);
            toast.success("Review sent successfully!");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to send review."
            );
        }
    };

    return (
        <>
            <div className="absolute z-[100000] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-[30%] p-4 bg-blue-600 text-white rounded-xl shadow-lg">
                    <div className="flex justify-between items-center space-x-1 my-2">
                        <div className="text-2xl font-bold">Review Client:</div>
                        <ToRating
                            rating={rating}
                            setRating={setRating}
                            maxRating={5}
                            size={28}
                        />
                    </div>
                    <div className="text-sm">
                        {job?.salary}$ - {getCountryByCode(job?.location)}{" "}
                        {job?.location} - <JobDurationContainer job={job} />
                    </div>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className="mt-2 text-black text-sm w-full resize-none rounded-md outline-none border-none p-2"
                        rows={7}
                    />
                    <p className="mt-2 text-gray-300 text-xs">
                        Sending a review will mark payment as complete, close,
                        and end the contract.
                    </p>
                    <div className="mt-4 flex justify-between">
                        <button
                            className="bg-background-dark rounded-3xl py-2 px-12 text-white-base"
                            onClick={() => setReviewModal(false)}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            onClick={handleReview}
                            className="bg-white-base rounded-3xl py-2 px-12 text-background-dark"
                        >
                            Accept & Review
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewModal;
