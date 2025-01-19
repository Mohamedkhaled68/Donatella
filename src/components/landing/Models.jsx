import React from "react";
import ModelsCard from "./ModelsCard";
import { manModel, talent1, talent2, talent3, womanModel } from "../../assets";
import Button from "../shared/ui/Button";

const Models = ({ modelsRef, talentsRef }) => {
    return (
        <>
            <section className="py-10 px-[1rem] container mx-auto border-y-4 border-[#fcfcfc0d] font-body">
                <div
                    ref={modelsRef}
                    className=" grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-10 gap-x-10"
                >
                    <ModelsCard
                        title="Men"
                        description="Show your strength and confidence in every pose."
                        image={manModel}
                        button={"Model As Man"}
                    />
                    <ModelsCard
                        title="Women"
                        image={womanModel}
                        description="Embody elegance, celebrating your uniqueness."
                        button={"Model As Woman"}
                    />

                    <div
                        ref={talentsRef}
                        className="col-span-1 md:col-span-2 bg-white mt-10 rounded-br-4 px-10 py-6 flex flex-col gap-5 items-center flex-1 overflow-hidden"
                    >
                        <h1 className="text-4xl lg:text-6xl font-display text-center">
                            Talent
                        </h1>
                        <p className="text-center text-[14px] lg:text-large font-extralight text-gray-deep md:w-[40%] mx-auto">
                            Highlight your creativity and expertise as a
                            talented videographer, photographer, or editor.
                        </p>
                        <div className="relative w-full rounded-3xl overflow-hidden flex items-center">
                            <img
                                className="w-[10%] lg:w-1/3 object-cover h-full filter grayscale"
                                src={talent1}
                                alt="talent1"
                            />
                            <img
                                className="w-[80%] lg:w-1/3 object-cover h-full border-x-4 border-slate-700 filter grayscale"
                                src={talent2}
                                alt="talent2"
                            />
                            <img
                                className="w-[10%] lg:w-1/3 object-cover h-full filter grayscale"
                                src={talent3}
                                alt="talent3"
                            />
                            <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-black/70 group-hover:bg-black/0 duration-400 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white flex justify-center items-center">
                                <div className="flex flex-col gap-10 items-center">
                                    <h1 className="text-4xl lg:text-6xl leading-[45px] lg:leading-[65px] font-display w-[70%] mx-auto font-extrabold text-center">
                                        Access to top industry professionals
                                    </h1>
                                    <p className="hidden md:block text-large text-white-base/75 font-display w-[60%] mx-auto font-[400] text-center">
                                        Connecting with experienced talent on
                                        our platform empowers you with valuable
                                        insights and mentorship, helping you
                                        elevate your creative career and unlock
                                        new opportunities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <Button
                                className={
                                    "font-light text-white-base bg-[#1F2224]"
                                }
                            >
                                Look For Talent
                            </Button>
                            <Button
                                className={
                                    "font-light border-thin border-[#1F2224]"
                                }
                            >
                                Sign Up As Talent
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Models;
