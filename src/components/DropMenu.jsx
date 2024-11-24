import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useLogout from "../hooks/auth/useLogout";

const items = [
    {
        id: 1,
        title: "Logout",
        path: "/logout",
    },
];

const DropMenu = () => {
    const dropMenuRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle navigation
    const { mutateAsync } = useLogout();

    const handleLogout = async () => {
        try {
            await mutateAsync();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            ref={dropMenuRef}
            className="absolute bg-slate-600 rounded-md right-10 top-[52px] min-w-[150px] overflow-hidden shadow-lg"
        >
            <div className="flex flex-col">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={handleLogout}
                        className="text-white-base text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default DropMenu;
