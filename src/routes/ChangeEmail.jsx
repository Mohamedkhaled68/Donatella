import React, { useEffect, useState } from "react";
import { BackButton, FormButton, Loading } from "../components";
import { useUserStore } from "../store/userStore";
import toast from "react-hot-toast";
import useUpdateEmail from "../hooks/auth/useUpdateEmail";
import { useNavigate } from "react-router-dom";
const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ChangeEmail = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [input, setinput] = useState("");
    const { mutateAsync: updateEmail } = useUpdateEmail();
    const { userStatus } = useUserStore((state) => state);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setinput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const validateEmail = (email) => {
            return EmailRegex.test(email);
        };

        if (!validateEmail(input.trim())) {
            toast.error(
                "Invalid email address. Please enter a valid email address."
            );
            return;
        } else {
            setLoading(true);
            try {
                await updateEmail({
                    newEmail: input.trim(),
                    otp: localStorage.getItem("OTP"),
                });
                localStorage.removeItem("OTP");
                toast.success("Email changed successfully.");
                navigate("/");
            } catch (err) {
                toast.error(
                    err?.response?.data?.message || "Failed to change email."
                );
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (input.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [input]);
    return (
        <>
            <section className="h-[calc(100vh-60px)] relative">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}

                <div className="container mx-auto pt-20 text-white-base h-full relative">
                    <div className="absolute top-10 bottom-5">
                        <BackButton />
                    </div>
                    <div className="flex justify-center mb-5">
                        <div
                            className="flex flex-col col-span-2
                         justify-center items-center gap-3"
                        >
                            <h1 className="font-display text-[46px] font-bold text-center">
                                Enter Email Address
                            </h1>
                            <p className="font-body text-center text-[#94A3B8] w-[70%] mx-auto text-md font-light">
                                Welcome back! Let’s dive back into your creative
                                journey.
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center h-[30%] 2xl:h-[60%]"
                    >
                        <div className="w-[70%] mx-auto">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                type="text"
                                className="w-full outline-none text-4xl border-b-2 border-white-base bg-transparent text-center pb-2"
                                placeholder={userStatus?.verifiedEmail}
                            />
                        </div>
                        <div className="mt-12 flex justify-center">
                            <FormButton
                                loading={loading}
                                disabled={loading || disabled}
                                text={"Change Email"}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ChangeEmail;
