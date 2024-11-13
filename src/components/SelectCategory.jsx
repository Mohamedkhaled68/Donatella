import React, { useEffect, useState } from "react";
import LogoHeader from "./LogoHeader";
import { FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { cate1, cate2, cate3, cate4 } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";

const categories = [
    { title: "Model", image: cate1 },
    { title: "Videographer", image: cate2 },
    { title: "Photographer", image: cate3 },
    { title: "Editor", image: cate4 },
];

const SelectCategory = () => {
    // const { showMenu, setShowMenu } = useTheme();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [disabled, setDisabled] = useState(true);
    // const handleShowMenu = () => {
    //     setShowMenu(false);
    // };

    const navigateToForm = (title) => {
        navigate("/individual-form", { state: { category: title } });
        // setShowMenu(false);
    };

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    useEffect(() => {
        if (role) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [role]);

    // useEffect(() => {
    //     if (showMenu) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "unset";
    //     }

    //     return () => {
    //         document.body.style.overflow = "unset";
    //     };
    // }, [showMenu]);
    return (
        <>
            <AnimatePresence>
                <motion.div
                    key="menu"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{
                        width: 0,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute w-full top-0 left-0 z-[50] min-h-screen bg-[#121417]"
                >
                    <LogoHeader />
                    <div className="relative container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut",
                                },
                            }}
                            className="grid grid-cols-4 my-5"
                        >
                            <FaArrowLeft
                                // onClick={handleShowMenu}
                                className="text-blue-primary self-center cursor-pointer"
                                size={30}
                            />
                            <div className="col-span-2 flex flex-col justify-center items-center gap-[14px]">
                                <h1 className="text-3xl font-display font-bold text-white-base">
                                    Select Your Speciality
                                </h1>
                                <p className="text-sm text-white-base/40 w-[70%] mx-auto text-center">
                                    Create your profile today and open the door
                                    to exciting new opportunities.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut",
                                },
                            }}
                            className="flex flex-col justify-center items-center"
                        >
                            <div className="grid grid-cols-4 gap-[74px]">
                                {categories.map(({ title, image }, index) => (
                                    <motion.div
                                        onClick={() =>
                                            handleRoleChange(
                                                title.toUpperCase()
                                            )
                                        }
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: index * 0.3,
                                            duration: 0.4,
                                            ease: "easeInOut",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: {
                                                duration: 0.2,
                                                ease: "easeInOut",
                                            },
                                        }}
                                        key={index}
                                        className={`${
                                            role === title.toLocaleUpperCase()
                                                ? "shadow-lg shadow-white-base"
                                                : ""
                                        } relative flex justify-center items-center border-thin border-white-base rounded-2xl text-white-base font-display overflow-hidden max-w-[235px] group cursor-pointer max-h-[342px]`}
                                    >
                                        <div>
                                            <img
                                                className={`h-full max-w-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 ${
                                                    role ===
                                                    title.toLocaleUpperCase()
                                                        ? "scale-110 grayscale-0"
                                                        : ""
                                                } duration-500`}
                                                src={image}
                                                alt={title}
                                            />
                                        </div>
                                        <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white-base text-extra-large z-20">
                                            {title}
                                        </h1>
                                        <div
                                            className={`absolute top-0 right-0 w-full h-full bg-black/55 group-hover:bg-black/20 ${
                                                role ===
                                                title.toLocaleUpperCase()
                                                    ? "bg-black/20"
                                                    : ""
                                            } duration-500 z-10`}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 mt-6">
                                <button
                                    onClick={() => navigateToForm(role)}
                                    disabled={disabled}
                                    className={`${
                                        disabled
                                            ? "cursor-not-allowed bg-[#494B4E]"
                                            : "bg-blue-primary"
                                    } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                                >
                                    Next
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
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default SelectCategory;
