import React, { useEffect, useState } from "react";
import { login1, login2 } from "../../assets";
import LogoHeader from "../../components/shared/ui/LogoHeader";
import { Link, Navigate, NavLink } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import { BackButton, FormButton, FormGroup, Loading } from "../../components";
import { validateForm } from "../../utils/validators";
import toast from "react-hot-toast";

const initialFormValues = {
    email: "",
    password: "",
};
const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [role, setRole] = useState("Individual");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    const { mutateAsync } = useLogin();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Enhanced mobile detection using multiple methods
    // const detectMobile = () => {
    //     const userAgent =
    //         navigator.userAgent || navigator.vendor || window.opera;
    //     const mobileRegex =
    //         /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;

    //     const conditions = [
    //         mobileRegex.test(userAgent.toLowerCase()),
    //         typeof window.orientation !== "undefined",
    //         navigator.maxTouchPoints > 0,
    //         window.innerWidth <= 768,
    //     ];

    //     return conditions.some((condition) => condition);
    // };

    const detectMobile = () => {
        // First check for any CSS media features that indicate mobile/tablet
        const mediaQuery = window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        );
        const hasMobileTouch = mediaQuery.matches;

        // Use navigator.userAgentData if available (modern browsers)
        if (navigator.userAgentData) {
            const platform = navigator.userAgentData.platform.toLowerCase();
            const mobile = navigator.userAgentData.mobile;

            // If browser reports it's mobile, trust that
            // if (mobile) return true;

            // Check for known mobile/tablet platforms
            // if (platform === "android" || platform === "ios") return true;

            // If we got here and have mobile touch, check screen size
            // if (hasMobileTouch) {
            //     const screenWidth = window.screen.width;
            //     const screenHeight = window.screen.height;
            //     const minDimension = Math.min(screenWidth, screenHeight);
            //     // Most tablets are under 1200px in their smallest dimension
            //     return minDimension < 1300;
            // }

            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            // console.log(screenWidth, screenHeight);
            if (screenWidth < 1023) return true;
            if (screenHeight < 700) return true;

            return false;
        }

        // Fallback for browsers that don't support userAgentData
        const userAgent = navigator.userAgent.toLowerCase();

        // More precise regex patterns
        const mobilePattern = /android.*mobile|ip(hone|od)|windows phone/i;
        const tabletPattern = /ipad|android(?!.*mobile)/i;

        // Check if it matches known mobile/tablet patterns
        if (mobilePattern.test(userAgent) || tabletPattern.test(userAgent)) {
            return true;
        }

        // For iOS 13+ iPads which report as desktop Safari
        if (
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1 &&
            /macintosh/i.test(userAgent)
        ) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        // Initial check
        setIsMobile(detectMobile());

        // Add resize listener for responsive detection
        const handleResize = () => {
            setIsMobile(detectMobile());
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        await toast
            .promise(
                mutateAsync({ ...formValues, role: role.toUpperCase() }),
                {
                    loading: "Logging in...",
                    success: "Logged in successfully!",
                    error: "Login failed! Please check your credentials.",
                },
                {
                    success: {
                        icon: "🚀",
                    },
                    error: {
                        icon: "❌",
                    },
                }
            )
            .then(() => {
                setFormValues(initialFormValues);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );
        const errors = validateForm(formValues);
        setErrors(errors);

        setDisabled(!isFilled || Object.keys(errors).length !== 0);
    }, [formValues]);

    return (
        <>
            {isMobile ? (
                <div className="relative w-full h-screen flex justify-center items-center">
                    <div className="absolute top-10 left-10">
                        <BackButton />
                    </div>
                    <h1 className="text-2xl text-center italic leading-10 font-display font-bold text-white-base">
                        Desktop Only: This feature is not available on mobile
                        devices.
                    </h1>
                </div>
            ) : (
                <div className="h-screen flex items-center relative">
                    {loading && (
                        <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                            <Loading />
                        </div>
                    )}
                    {/* left side*/}
                    <div className="relative h-full w-1/3">
                        <img
                            className="w-full h-full object-cover filter grayscale"
                            src={login1}
                            alt="theme"
                        />
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#101010] to-[#00000011]" />
                    </div>

                    <div className="w-2/3 bg-[#121417] text-white">
                        <LogoHeader />
                        <div className="container mx-auto h-[calc(100vh-60px)]">
                            <div className="flex flex-col items-center gap-1 relative 2xl:pt-3 h-[15%]">
                                <div className="absolute top-[10%] 2xl:top-[15%] left-[5%]">
                                    <BackButton />
                                </div>
                                <h1 className="text-[30px] 2xl:text-[40px] font-bold font-display">
                                    Good To See You Again
                                </h1>
                                <p className="text-[14px] 2xl:text-medium text-white-base/60 font-extralight w-[50%] text-center">
                                    Welcome back! Let’s dive back into your
                                    creative journey.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="w-[60%] mx-auto flex flex-col justify-between h-[80%]"
                            >
                                <div className="flex flex-col justify-between gap-5 h-[50%]">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-medium 2xl:text-xl font-semibold font-display">
                                            Login As:
                                        </h2>
                                        <div className="flex justify-center items-center gap-5 w-full relative">
                                            <div className="relative group w-1/2">
                                                <button
                                                    key={"Organization"}
                                                    type="button"
                                                    onClick={() =>
                                                        handleRoleChange(
                                                            "Organization"
                                                        )
                                                    }
                                                    className={`${
                                                        role === "Organization"
                                                            ? "bg-white-base text-gray-deep"
                                                            : "bg-[#27292C] text-white-base"
                                                    } w-full py-3 2xl:py-4 border-medium border-white-base text-[14px] 2xl:text-medium font-bold rounded-xl transition-all duration-300`}
                                                >
                                                    Organization
                                                </button>
                                                <div className="absolute w-[300px] bottom-full left-[0] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md">
                                                    Log in as an organization to
                                                    hire top talents in
                                                    different fields for your
                                                    job or project.
                                                </div>
                                            </div>

                                            <div className="relative group w-1/2">
                                                <button
                                                    key={"Individual"}
                                                    type="button"
                                                    onClick={() =>
                                                        handleRoleChange(
                                                            "Individual"
                                                        )
                                                    }
                                                    className={`${
                                                        role === "Individual"
                                                            ? "bg-white-base text-gray-deep"
                                                            : "bg-[#27292C] text-white-base"
                                                    } w-full py-3 px-5 2xl:py-4 border-medium border-white-base text-[14px] 2xl:text-medium font-bold rounded-xl transition-all duration-300`}
                                                >
                                                    Individual
                                                </button>
                                                <div className="absolute w-[350px] bottom-full -right-[190%] z-[1000] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md duration-300">
                                                    Log in as an individual to
                                                    showcase your talent,
                                                    connect with businesses, and
                                                    launch your career on a
                                                    trusted platform.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-col gap-5">
                                            <FormGroup
                                                label={"Email"}
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="i.e. davon@mail.com"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                                error={errors.email}
                                                validate={true}
                                            />
                                            <FormGroup
                                                label={"Password"}
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="********"
                                                value={formValues.password}
                                                onChange={handleInputChange}
                                                error={errors.password}
                                                validate={true}
                                            />
                                        </div>
                                        <Link
                                            className="text-blue-primary text-sm"
                                            to="/forgot-password"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <FormButton
                                        loading={loading}
                                        disabled={disabled}
                                        text={"Login"}
                                    />
                                    <p className="text-white-base/40 text-sm">
                                        Don't have an account?{" "}
                                        <NavLink
                                            className={"text-blue-primary"}
                                            to="/signup"
                                        >
                                            Create free account
                                        </NavLink>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="relative h-full w-1/3">
                        <img
                            className="w-full h-full object-cover filter grayscale"
                            src={login2}
                            alt="theme"
                        />
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#101010] to-[#00000049]" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
