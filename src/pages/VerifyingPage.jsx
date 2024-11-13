import React, { useRef, useState } from "react";
import LogoHeader from "../components/LogoHeader";
import useVerifyUser from "../hooks/auth/useVerifyUser";
import useUserStore from "../store/userStore";

const VerifyingPage = ({ length = 4 }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    const { userId } = useUserStore();

    const { mutateAsync } = useVerifyUser();

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
            console.log(newOtp.join(""));
            console.log({
                id: userId,
                otp: newOtp.join(""),
            });

            try {
                await mutateAsync({
                    userId,
                    otp: newOtp.join(""),
                });
            } catch (error) {
                console.log("An error occurred.");
            }
        }
    };

    const handleBackspace = (event, index) => {
        if (event.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };
    return (
        <>
            <section className="min-h-screen">
                <LogoHeader />
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center gap-5 mt-10 bg-black/50 px-5 py-2 rounded-md text-white-base">
                        <h1 className="font-display font-medium text-3xl text-center">
                            Enter OTP
                        </h1>
                        <div className="grid grid-cols-4 gap-5">
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
                                    className="w-[50px] h-[50px] rounded-md p-5 bg-white-base text-black text-center text-xl"
                                />
                            ))}
                        </div>
                        <button className="button">Resend OTP</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VerifyingPage;
