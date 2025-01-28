import React, { useEffect, useState } from "react";
import LogoHeader from "../../components/shared/ui/LogoHeader";
import { formVideo, girlImg } from "../../assets";
import {
    BackButton,
    IndividualRegisterForm,
    Loading,
    OrganizationRegisterForm,
} from "../../components";
import { Navigate, useLocation } from "react-router-dom";

const Signup = () => {
    const [role, setRole] = useState("Individual");
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    // Enhanced mobile detection using multiple methods
    const detectMobile = () => {
        const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex =
            /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

        const conditions = [
            mobileRegex.test(userAgent.toLowerCase()),
            typeof window.orientation !== "undefined",
            navigator.maxTouchPoints > 0,
            window.innerWidth <= 768,
        ];

        return conditions.some((condition) => condition);
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

    // if (isMobile) {
    //     console.warn(
    //         "Desktop Only: This feature is not available on mobile devices."
    //     );
    //     return <Navigate to={-1} replace />;
    // }

    useEffect(() => {
        if (location.state?.role) {
            setRole(location.state.role);
        } else {
            setRole("Individual");
        }
    }, []);

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
                <>
                    {loading && (
                        <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                            <Loading />
                        </div>
                    )}
                    <section className="min-h-screen pb-[30px] w-full bg-[#121417]">
                        <LogoHeader />
                        <div className="container min-h-[calc(100vh-56px)] mx-auto grid grid-cols-2 gap-x-8 mt-10">
                            <div className="flex flex-col gap-[5%]">
                                <div className="flex gap-10">
                                    <BackButton />
                                    <div className="flex flex-col gap-3">
                                        <h1 className="text-5xl font-display font-bold text-white-base">
                                            Step into the Spotlight
                                        </h1>
                                        <p className="text-sm text-white-base/40 w-[70%]">
                                            Create your profile today and open
                                            the door to exciting new
                                            opportunities.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center gap-5 w-full">
                                    {/* Organization Button */}
                                    <div className="relative group w-1/2">
                                        <button
                                            key={"Organization"}
                                            type="button"
                                            onClick={() =>
                                                handleRoleChange("Organization")
                                            }
                                            className={`${
                                                role === "Organization"
                                                    ? "bg-white-base text-gray-deep"
                                                    : "bg-[#27292C] text-white-base"
                                            } w-full px-5 py-4 border-medium border-white-base text-medium font-bold rounded-xl transition-all duration-300`}
                                        >
                                            Organization
                                        </button>
                                        <div className="absolute w-[300px] bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md">
                                            Log in as an organization to hire
                                            top talents in different fields for
                                            your job or project.
                                        </div>
                                    </div>

                                    {/* Individual Button */}
                                    <div className="relative group w-1/2">
                                        <button
                                            key={"Individual"}
                                            type="button"
                                            onClick={() =>
                                                handleRoleChange("Individual")
                                            }
                                            className={`${
                                                role === "Individual"
                                                    ? "bg-white-base text-gray-deep"
                                                    : "bg-[#27292C] text-white-base"
                                            } w-full px-5 py-4 border-medium border-white-base text-medium font-bold rounded-xl transition-all duration-300`}
                                        >
                                            Individual
                                        </button>
                                        <div className="absolute w-[350px] bottom-full -right-[100%] z-[1000] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md duration-300">
                                            Log in as an individual to showcase
                                            your talent, connect with
                                            businesses, and launch your career
                                            on a trusted platform.
                                        </div>
                                    </div>
                                </div>

                                {role === "Organization" ? (
                                    <OrganizationRegisterForm
                                        key={"Organization"}
                                        role={role}
                                        loading={loading}
                                        setLoading={setLoading}
                                    />
                                ) : (
                                    <IndividualRegisterForm
                                        key={"Individual"}
                                        role={role}
                                        loading={loading}
                                        setLoading={setLoading}
                                    />
                                )}
                            </div>
                            <div className="max-w-[400px] max-h-full mx-auto">
                                <div className="relative rounded-3xl max-h-full border-[4px] border-[#ffffff46] w-full overflow-hidden">
                                    <video
                                        className="max-h-full max-w-full top-0 left-0 z-10 bg-transparent object-cover grayscale"
                                        autoPlay
                                        muted
                                        loop
                                    >
                                        <source src={formVideo} />
                                    </video>
                                    {/* <div className="w-full z-20 h-full bg  rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Signup;
