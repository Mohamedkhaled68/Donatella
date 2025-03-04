import React, { useState } from "react";
import { BackButton, Loading } from "../components";
import toast from "react-hot-toast";
import useSendOtp from "../hooks/auth/useSendOtp";
import { useUserStore } from "../store/userStore";
import { useLocation, useNavigate } from "react-router-dom";

const SendChangeOTP = () => {
    const [loading, setLoading] = useState(false);
    const { mutateAsync: sendOtp } = useSendOtp();
    const navigate = useNavigate();
    const location = useLocation();

    const userStatus = useUserStore((state) => state.userStatus);

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            if (location?.state === "changeEmail") {
                await sendOtp("UPDATE_EMAIL");
            } else {
                await sendOtp("RESET_PASSWORD");
            }
            toast.success("OTP sent successfully!");
            if (location?.state === "changeEmail") {
                navigate("/verify-otp", { state: "changeEmail" });
            } else {
                navigate("/verify-otp", { state: "changePassword" });
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Fialed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="h-[calc(100vh-60px)] relative">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}
                <div className="container mx-auto text-white-base h-full">
                    <div className="flex items-center justify-center mb-5 relative w-full h-[30%]">
                        <div className="absolute top-10 left-5">
                            <BackButton />
                        </div>
                        <div className="flex flex-col col-span-2 justify-center items-center gap-3">
                            <h1 className="font-display text-[35px] 2xl:text-[46px] font-bold text-center">
                                A one time password will be requested from:
                            </h1>
                            <p className="text-[15px] 2xl:text-[20px] font-thin text-slate-300">
                                This will help us verify who you are, before
                                making any changes.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around items-center h-[60%] 2xl:h-[60%]">
                        <div className="w-[70%] mx-auto">
                            <div className="w-full text-center text-[40px]">
                                {userStatus?.verifiedEmail}
                            </div>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <button
                                className={`bg-blue-primary button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200 `}
                                onClick={handleSendOTP}
                            >
                                Request OTP
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SendChangeOTP;
