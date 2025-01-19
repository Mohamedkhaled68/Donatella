import React, { useEffect, useState } from "react";
import LogoHeader from "../../components/shared/ui/LogoHeader";
import { formVideo, girlImg } from "../../assets";
import {
    BackButton,
    IndividualRegisterForm,
    Loading,
    OrganizationRegisterForm,
} from "../../components";
import { Navigate } from "react-router-dom";

const Signup = () => {
    const [role, setRole] = useState("Individual");
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    if (isMobile) {
        console.warn(
            "Desktop Only: This feature is not available on mobile devices."
        );
        return <Navigate to="/" replace />;
    }

    return (
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
                                    Create your profile today and open the door
                                    to exciting new opportunities.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-5 w-full">
                            <button
                                key={"Organization"}
                                type="button"
                                onClick={() => handleRoleChange("Organization")}
                                className={`${
                                    role === "Organization"
                                        ? "bg-white-base text-gray-deep"
                                        : "bg-[#27292C] text-white-base"
                                } w-1/2 px-5 py-4 border-medium border-white-base text-medium font-bold rounded-xl transition-all duration-300`}
                            >
                                Organization
                            </button>
                            <button
                                key={"Individual"}
                                type="button"
                                onClick={() => handleRoleChange("Individual")}
                                className={`${
                                    role === "Individual"
                                        ? "bg-white-base text-gray-deep"
                                        : "bg-[#27292C] text-white-base"
                                } w-1/2 border-medium border-white-base px-5 py-4 text-medium font-bold rounded-xl transition-all duration-300`}
                            >
                                Individual
                            </button>
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
                        <div className="relative rounded-3xl max-h-full border-[3px] border-black/50 w-full overflow-hidden">
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
    );
};

export default Signup;
