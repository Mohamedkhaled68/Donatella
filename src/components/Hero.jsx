import React from "react";
import { headerVideo } from "../assets";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import Sidebar from "./Sidebar";

const Hero = () => {
    return (
        <>
            <section className="pb-10 relative">
                <Sidebar />
                <div className="min-h-screen relative rounded-b-[3.5rem] overflow-hidden flex justify-center items-center">
                    <video
                        muted
                        autoPlay
                        loop
                        className="absolute top-0 w-full h-full object-cover filter grayscale"
                    >
                        <source src={headerVideo} type="video/mp4" />
                    </video>
                    <div className="absolute top-0 w-full h-[calc(100vh-5px)] bg-[#1F2224B2]/70 rounded-b-[3.5rem]" />

                    <nav className="w-full flex justify-center items-center z-10 absolute top-0 left-0 text-white-base font-body">
                        <div className="container mx-auto py-8 grid  grid-cols-3 w-full">
                            <div className="col-span-1" />
                            <h1 className="text-3xl font-display text-center self-center ">
                                Donatella
                            </h1>
                            <div className="flex items-center justify-end gap-10">
                                <NavLink
                                    className={"text-white/75 text-sm"}
                                    to={"/login"}
                                >
                                    Login
                                </NavLink>
                                <NavLink to={"/signup"}>
                                    <Button
                                        className={
                                            "border-thin border-white-base"
                                        }
                                    >
                                        Get Started
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </nav>

                    <div className="w-[70%] pt-[66px] mx-auto text-center flex flex-col justify-center items-center gap-1 text-white-base z-50">
                        <h1 className="drop-shadow text-[86px] italic font-semibold font-display">
                            Capture Your Story.
                        </h1>
                        <p className="text-white-base/75 text-[22px] italic font-extralight leading-[33.907px]">
                            Find models, photographers, videographers, and
                            editors who can tell it best.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
