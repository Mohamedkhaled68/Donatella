import React, { useEffect, useState } from "react";
import { login1, login2 } from "../assets";
import LogoHeader from "../components/shared/ui/LogoHeader";
import { NavLink } from "react-router-dom";
import useLogin from "../hooks/auth/useLogin";
import { motion } from "framer-motion";
import { FormButton, FormGroup } from "../components";
import { validateForm } from "../utils/validators";
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

    const { mutateAsync, onSuccess } = useLogin();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

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

                                <div className="flex flex-col gap-5 mt-[20px]">
                                    <FormGroup
                                        label={"Email"}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="i.e. davon@mail.com"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
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
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 mt-8">
                                <FormButton
                                    loading={loading}
                                    disabled={disabled}
                                    text={"Login"}
                                />
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
