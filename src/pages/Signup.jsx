import React, { useState } from "react";
import LogoHeader from "../components/shared/ui/LogoHeader";
import { girlImg } from "../assets";
import {
    BackButton,
    InitialIndividualRegisterForm,
    OrganizationRegisterForm,
} from "../components";

const Signup = () => {
    const [role, setRole] = useState("Individual");

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        console.log("Selected role:", selectedRole);
    };

    return (
        <>
            <section className="max-h-screen bg-[#121417]">
                <LogoHeader />
                <div className="container mx-auto flex justify-between h-full mt-10">
                    <div className="grow flex-1 h-full">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-10">
                                <BackButton />
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-5xl font-display font-bold text-white-base">
                                        Who Would I like to be?
                                    </h1>
                                    <p className="text-sm text-white-base/40 w-[70%]">
                                        Create your profile today and open the
                                        door to exciting new opportunities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-5 w-full">
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
                                    } w-1/2 px-5 py-4 border-medium border-white-base text-medium font-bold rounded-xl transition-all duration-300`}
                                >
                                    Organization
                                </button>
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
                                    } w-1/2 border-medium border-white-base px-5 py-4 text-medium font-bold rounded-xl transition-all duration-300`}
                                >
                                    Individual
                                </button>
                            </div>

                            {role === "Organization" ? (
                                <OrganizationRegisterForm
                                    key={"Organization"}
                                    role={role}
                                />
                            ) : (
                                <InitialIndividualRegisterForm
                                    key={"Individual"}
                                    role={role}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-[50%] flex justify-center items-center h-full">
                        <div className="relative rounded-3xl overflow-hidden group h-full w-[60%]">
                            <img
                                className="max-w-full max-h-full object-cover filter grayscale group-hover:scale-110 duration-500 group-hover:grayscale-0"
                                src={girlImg}
                                alt="girl"
                            />
                            <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] bg-black/45 group-hover:bg-black/0 duration-300 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
