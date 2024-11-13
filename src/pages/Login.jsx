import React, { useState } from "react";
import { login1, login2 } from "../assets";
import LogoHeader from "../components/LogoHeader";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const initialFormValues = {
    email: "",
    password: "",
};
const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };
    return (
        <>
            <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-screen flex items-center"
            >
                <div className="relative h-full w-1/3">
                    <img
                        className="w-full h-full object-cover filter grayscale"
                        src={login1}
                        alt="theme"
                    />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#101010] to-[#00000011]" />
                </div>
                <div className="w-2/3 h-full bg-[#121417] text-white">
                    <LogoHeader />
                    <div className="container mx-auto pt-6">
                        <div className="flex flex-col items-center gap-3 mb-[8px]">
                            <h1 className="text-[40px] font-bold font-display">
                                Good To See You Again
                            </h1>
                            <p className="text-medium text-white-base/60 font-extralight w-[50%] text-center">
                                Welcome back! Let’s dive back into your creative
                                journey.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="w-[60%] mx-auto"
                        >
                            <div className="flex flex-col gap-3">
                                <h2 className="text-xl font-semibold font-display">
                                    Login As:
                                </h2>
                                <div className="flex items-center justify-center gap-10">
                                    <div className="relative w-1/2">
                                        <select
                                            className="appearance-none bg-white-base text-left rounded-xl w-full text-gray-base text-medium font-bold font-body px-[18px] pl-[35px] py-[14px]"
                                            name="category"
                                        >
                                            <option value="Individual">
                                                Individual
                                            </option>
                                        </select>
                                        <FaAngleDown className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-base" />
                                    </div>
                                    <div className="relative w-1/2">
                                        <select
                                            className="appearance-none bg-white-base text-left rounded-xl w-full text-gray-base text-medium font-bold font-body px-[18px] pl-[35px] py-[14px]"
                                            name="category"
                                        >
                                            <option value="model">Model</option>
                                        </select>
                                        <FaAngleDown className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-base" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 mt-[20px]">
                                    <div className="flex flex-col gap-2">
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
                                    <div className="flex flex-col gap-2">
                                        <label
                                            className="text-white-base text-sm font-body font-normal"
                                            htmlFor="email"
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
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 mt-8">
                                <button className="button bg-blue-primary text-white-base px-[72px] py-3 text-medium font-semibold">
                                    Login
                                </button>
                                <p className="text-medium text-white-base/40">
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
                <div className="relative h-full w-1/3">
                    <img
                        className="w-full h-full object-cover filter grayscale"
                        src={login2}
                        alt="theme"
                    />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#101010] to-[#00000049]" />
                </div>
            </motion.div>
        </>
    );
};

export default Login;
