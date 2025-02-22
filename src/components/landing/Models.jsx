import React, { useEffect, useState } from "react";
import ModelsCard from "./ModelsCard";
import { manModel, talent1, talent2, talent3, womanModel } from "../../assets";
import Button from "../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import useAuthStore from "../../store/userTokenStore";
import toast from "react-hot-toast";

const Models = ({ modelsRef, talentsRef }) => {
    const token = useAuthStore((state) => state.authToken);
    const [isMobile, setIsMobile] = useState(false);
    const [openNote, setOpenNote] = useState({
        men: false,
        women: false,
        talent: false,
    });
    const navigate = useNavigate();

    const handleTalentBtn = (r) => {
        if (isMobile) {
            setOpenNote((prev) => ({
                ...prev,
                talent: true,
            }));
        } else if (token) {
            toast.error("You are already logged in");
        } else {
            navigate("/signup", { state: { role: r } });
        }
    };

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
        setIsMobile(detectMobile());

        const handleResize = () => {
            setIsMobile(detectMobile());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative py-10 px-[1rem] container mx-auto border-y-4 border-[#fcfcfc0d] font-body">
            {(openNote.men || openNote.women || openNote.talent) && (
                <div className="fixed inset-0 bg-black opacity-50 z-[999]" />
            )}

            <div
                ref={modelsRef}
                className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-10 gap-x-10"
            >
                <ModelsCard
                    cardId="men"
                    title="Men"
                    description="Show your strength and confidence in every pose."
                    image={manModel}
                    button="Model As Man"
                    isMobile={isMobile}
                    setOpenNote={setOpenNote}
                    openNote={openNote.men}
                    token={token}
                />
                <ModelsCard
                    cardId="women"
                    title="Women"
                    description="Embody elegance, celebrating your uniqueness."
                    image={womanModel}
                    button="Model As Woman"
                    isMobile={isMobile}
                    setOpenNote={setOpenNote}
                    openNote={openNote.women}
                    token={token}
                />

                <div
                    ref={talentsRef}
                    className="relative col-span-1 md:col-span-2 bg-white mt-10 rounded-br-4 px-10 py-6 flex flex-col gap-5 items-center flex-1 overflow-hidden"
                >
                    {openNote.talent && (
                        <div
                            style={{
                                position: "absolute", // Positioned relative to the document
                                top: `50%`,
                                left: `50%`,
                                transform: "translate(-50%, -50%)", // Centered on the calculated position
                                width: "300px",
                                backgroundColor: "#1e293b",
                                color: "#f8fafc",
                                padding: "1rem",
                                borderRadius: "8px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                zIndex: 1000,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    cursor: "pointer",
                                }}
                                onClick={() => setOpenNote(false)}
                            >
                                <FaX />
                            </div>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.5rem",
                                    fontStyle: "italic",
                                }}
                                className="font-display py-2"
                            >
                                Sign in is currently only available on desktop
                            </p>
                        </div>
                    )}
                    <h1 className="text-4xl lg:text-6xl font-display text-center">
                        Talent
                    </h1>
                    <p className="text-center text-[14px] lg:text-large font-extralight text-gray-deep md:w-[40%] mx-auto">
                        Highlight your creativity and expertise as a talented
                        videographer, photographer, or editor.
                    </p>
                    <div className="relative w-full rounded-[100px] overflow-hidden flex items-center">
                        <img
                            className="w-[10%] lg:w-1/3 object-cover h-full filter grayscale"
                            src={talent1}
                            alt="talent1"
                            loading="lazy"
                        />
                        <img
                            className="w-[80%] lg:w-1/3 object-cover h-full border-x-4 border-slate-700 filter grayscale"
                            src={talent2}
                            alt="talent2"
                            loading="lazy"
                        />
                        <img
                            className="w-[10%] lg:w-1/3 object-cover h-full filter grayscale"
                            src={talent3}
                            alt="talent3"
                            loading="lazy"
                        />
                        <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-black/70 group-hover:bg-black/0 duration-400 rounded-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white flex justify-center items-center">
                            <div className="flex flex-col gap-10 items-center">
                                <h1 className="text-[30px] xl:text-6xl leading-[45px] lg:leading-[65px] font-display w-[70%] mx-auto font-extrabold text-center">
                                    Access to top industry professionals
                                </h1>
                                <p className="hidden md:block text-large text-white-base/75 font-display w-[60%] mx-auto font-[400] text-center">
                                    Connecting with experienced talent on our
                                    platform empowers you with valuable insights
                                    and mentorship, helping you elevate your
                                    creative career and unlock new
                                    opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <Button
                            onClick={() => handleTalentBtn("Organization")}
                            className={
                                "font-light text-white-base bg-[#1F2224] text-sm lg:text-base"
                            }
                        >
                            Look For Talent
                        </Button>
                        <Button
                            onClick={() => handleTalentBtn("Individual")}
                            className={
                                "font-light border-thin border-[#1F2224] text-sm lg:text-base"
                            }
                        >
                            Sign Up As Talent
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Models;
