import React, { useState, useCallback } from "react";
import LogoHeader from "../shared/ui/LogoHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
    cate1,
    cate2,
    cate3,
    cate4,
    musicCate,
    athleteCate,
    fashionCate,
    tourismCate,
    beautyCate,
    artistCate,
} from "../../assets";
import { NavLink, useNavigate } from "react-router-dom";

const categories = [
    { title: "Model", image: cate1 },
    { title: "Videographer", image: cate2 },
    { title: "Photographer", image: cate3 },
    { title: "Editor", image: cate4 },
    { title: "Tour Guide", image: tourismCate },
    { title: "Beautician", image: beautyCate },
    { title: "Athlete", image: athleteCate },
    { title: "Artist", image: artistCate },
    { title: "Fashionista", image: fashionCate },
    { title: "Musician", image: musicCate },
];

const SelectCategory = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const handleRoleChange = useCallback((selectedRole) => {
        setRole(selectedRole);
    }, []);

    const navigateToForm = () => {
        if (role) {
            navigate("/experience-form", { state: { category: role } });
        }
    };

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
                        transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute w-full top-0 left-0 z-[50] min-h-screen bg-[#121417]"
                >
                    <LogoHeader />
                    <div className="relative container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.1, ease: "easeInOut" },
                            }}
                            className="w-full flex justify-center items-center my-5"
                        >
                            <div className="flex flex-col justify-center items-center gap-[14px]">
                                <h1 className="text-3xl font-display font-bold text-white-base">
                                    Select Your Speciality
                                </h1>
                                <p className="text-sm text-white-base/40 w-[70%] mx-auto text-center">
                                    Create your profile today and open the door to exciting new opportunities.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.1, ease: "easeInOut" },
                            }}
                            className="flex flex-col justify-center items-center"
                        >
                            <div className="grid grid-cols-5 gap-[50px]">
                                {categories.map(({ title, image }, index) => (
                                    <motion.div
                                        onClick={() => handleRoleChange(title)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: index * 0.1, // Reduced delay for faster rendering
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.1, ease: "easeInOut" },
                                        }}
                                        key={title}
                                        className={`${
                                            role === title ? "shadow-lg shadow-white-base" : ""
                                        } relative flex justify-center items-center border-thin border-white-base rounded-2xl text-white-base font-display overflow-hidden group cursor-pointer`}
                                    >
                                        <img
                                            className={`h-full w-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 ${
                                                role === title ? "scale-110 grayscale-0" : ""
                                            } duration-500`}
                                            src={image}
                                            alt={title}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <h1 className="absolute text-center leading-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white-base text-extra-large z-20">
                                            {title}
                                        </h1>
                                        <div
                                            className={`absolute top-0 right-0 w-full h-full bg-black/55 group-hover:bg-black/20 ${
                                                role === title ? "bg-black/20" : ""
                                            } duration-500 z-10`}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col justify-center items-center gap-2 mt-6">
                                <button
                                    onClick={navigateToForm}
                                    disabled={!role}
                                    className={`${
                                        !role
                                            ? "cursor-not-allowed bg-[#494B4E]"
                                            : "bg-blue-primary"
                                    } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                                >
                                    Next
                                </button>
                                <p className="text-medium text-white-base/40">
                                    Don't have an account?{" "}
                                    <NavLink className={"text-blue-primary"} to="/signup">
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
