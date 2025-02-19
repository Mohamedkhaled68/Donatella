import React, { useEffect, useRef, useState } from "react";
import useVerifyUser from "../../hooks/auth/useVerifyUser";
import { useUserStore } from "../../store/userStore";
import { BackButton, Loading } from "../../components";
import useReSendOtp from "../../hooks/auth/useReSendOtp";
import toast from "react-hot-toast";

const VerifyingPage = ({ length = 4 }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const { userStatus } = useUserStore((state) => state);

    const { mutateAsync } = useVerifyUser();
    const { mutateAsync: reSendOtp } = useReSendOtp();

    const handleChange = async (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit was entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Trigger onComplete callback when OTP is fully entered
        if (newOtp.join("").length === length) {
            setLoading(true);
            try {
                await mutateAsync({
                    userId: userStatus.id,
                    otp: newOtp.join(""),
                });
                toast.success("OTP verified successfully!");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "Failed to verify OTP."
                );
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBackspace = (event, index) => {
        if (event.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        await toast
            .promise(
                reSendOtp(),
                {
                    loading: "Resending...",
                    success: "Resent successfully!",
                    error: (err) => {
                        setLoading(false);

                        err?.response?.data?.message;
                    },
                },
                {
                    success: {
                        icon: "🚀",
                    },
                }
            )
            .then((m) => {
                console.log(m);
            })
            .catch((err) => {
                toast.error(
                    err?.response?.data?.message || "Failed to resend."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);
    return (
        <>
            <section className="h-screen relative">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}
                <div className="container mx-auto pt-20 text-white-base h-full">
                    <div className="grid grid-cols-3">
                        <BackButton />
                        <div className="flex flex-col justify-center items-center gap-3">
                            <h1 className="font-display text-[46px] font-bold text-center">
                                Enter OTP
                            </h1>
                            <p className="font-body text-center text-[#94A3B8] w-[70%] mx-auto text-md font-light">
                                Welcome back! Let’s dive back into your creative
                                journey.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-[30%] 2xl:h-[60%]">
                        <div className="grid grid-cols-4 justify-items-center items-center gap-5 w-full mt-10">
                            {otp.map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    maxLength="1"
                                    value={otp[index]}
                                    onChange={(e) =>
                                        handleChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    className="w-[80px] h-[170px] pb-10 outline-none  border-b-4 border-white-base text-white-base bg-transparent text-center font-display font-bold text-[128px]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full pb-10 flex justify-center items-start">
                    <div className="text-sm font-semibold flex items-center gap-[5px] font-body text-[#64748B]">
                        Didn’t receive a code yet?{" "}
                        <div
                            onClick={handleResendOtp}
                            className="text-blue-primary cursor-pointer"
                        >
                            Click here to request another one!
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VerifyingPage;
