import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import LogoHeader from "../components/LogoHeader";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { girlImg } from "../assets";
import { NavLink } from "react-router-dom";
import useRegister from "../hooks/auth/useRegister";

const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const Signup = () => {
    const { handleGoBack } = useTheme();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [role, setRole] = useState("Individual");

    const { mutateAsync, isSuccess } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await mutateAsync({ ...formValues, role: role.toUpperCase() });
        } catch (error) {
            setError("An error occurred.");
        } finally {
            console.log({ ...formValues, role: role.toUpperCase() });
            setFormValues(initialFormValues);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );
        setDisabled(!isFilled);
    }, [formValues]);

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <>
            <motion.section
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-screen bg-[#121417]"
            >
                <LogoHeader />
                <div className="container mx-auto flex justify-between mt-10">
                    <div className="grow flex-1 h-full">
                        <div className="flex gap-10">
                            <FaArrowLeft
                                onClick={handleGoBack}
                                className="text-blue-primary cursor-pointer mt-5"
                                size={30}
                            />
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-5xl font-display font-bold text-white-base">
                                        Who Would I like to be?
                                    </h1>
                                    <p className="text-sm text-white-base/40 w-[70%]">
                                        Create your profile today and open the
                                        door to exciting new opportunities.
                                    </p>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-[100%] mt-8"
                                >
                                    <div className="flex justify-center items-center gap-5 w-full">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRoleChange("Organization")
                                            }
                                            className={`${
                                                role === "Organization"
                                                    ? "bg-white-base text-gray-deep"
                                                    : "bg-[#27292C] text-white-base"
                                            } w-1/2 px-5 py-4 border-medium border-white-base text-medium font-bold rounded-xl`}
                                        >
                                            Organization
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRoleChange("Individual")
                                            }
                                            className={`${
                                                role === "Individual"
                                                    ? "bg-white-base text-gray-deep"
                                                    : "bg-[#27292C] text-white-base"
                                            } w-1/2 border-medium border-white-base px-5 py-4 text-medium font-bold rounded-xl`}
                                        >
                                            Individual
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-5 mt-[20px]">
                                        <div className="flex flex-col gap-2 col-span-2">
                                            <label
                                                className="text-white-base text-sm font-body font-normal"
                                                htmlFor="firstName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="i.e. Davon Lean"
                                                value={formValues.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-2">
                                            <label
                                                className="text-white-base text-sm font-body font-normal"
                                                htmlFor="lastName"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                placeholder="i.e. Davon Lean"
                                                value={formValues.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-2">
                                            <label
                                                className="text-white-base text-sm font-body font-normal"
                                                htmlFor="email"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="i.e. davon@mail.com"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-2">
                                            <label
                                                className="text-white-base text-sm font-body font-normal"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="********"
                                                value={formValues.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 mt-8">
                                        <button
                                            disabled={disabled}
                                            className={`${
                                                disabled
                                                    ? "cursor-not-allowed bg-[#494B4E]"
                                                    : "bg-blue-primary"
                                            } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                                        >
                                            Sign Up
                                        </button>
                                        <p className="text-medium text-white-base/40">
                                            Don't have an account?{" "}
                                            <NavLink
                                                className="text-blue-primary"
                                                to="/signup"
                                            >
                                                Create free account
                                            </NavLink>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full">
                        <div className="relative rounded-3xl overflow-hidden group h-full w-[60%] mx-auto">
                            <img
                                className="max-w-full max-h-full object-cover filter grayscale group-hover:scale-110 duration-500 group-hover:grayscale-0"
                                src={girlImg}
                                alt="girl"
                            />
                            <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] bg-black/45 group-hover:bg-black/0 duration-300 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default Signup;
