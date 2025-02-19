import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useLogout from "../hooks/auth/useLogout";
import { CiLogout } from "react-icons/ci";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";

const DropMenu = ({ setShowDrop }) => {
    const dropMenuRef = useRef(null);
    const navigate = useNavigate();

    const { mutateAsync: logout } = useLogout();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropMenuRef.current &&
                !dropMenuRef.current.contains(event.target)
            ) {
                setShowDrop(false);
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup function
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowDrop]); // Only re-run if setShowDrop changes

    const handleLogout = async () => {
        try {
            setShowDrop(false);
            await logout();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to logout");
        }
    };

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            ref={dropMenuRef}
            className="absolute bg-slate-600 rounded-md right-10 z-[10000] top-[52px] min-w-[150px] overflow-hidden shadow-lg"
        >
            <div className="flex flex-col">
                <div
                    onClick={handleLogout}
                    className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <CiLogout size={25} />
                    Logout
                </div>
                <div
                    onClick={() => {
                        navigate("/change-email");
                        setShowDrop(false);
                    }}
                    className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <MdOutlineMarkEmailRead size={25} />
                    Change Email Address
                </div>
                <div
                    onClick={() => {
                        navigate("/change-password");
                        setShowDrop(false);
                    }}
                    className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <RiLockPasswordLine size={25} />
                    Change Password
                </div>
            </div>
        </motion.div>
    );
};

export default DropMenu;
