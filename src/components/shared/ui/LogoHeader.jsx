import React from "react";
import { motion } from "framer-motion";
import { donatellaLogo } from "../../../assets";

const LogoHeader = () => {
    return (
        <div className="relative w-full h-14 flex justify-center items-center bg-transparent ">
            <div>
                <img className="w-[150px]" src={donatellaLogo} alt="logo" />
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
                className="absolute right-0 bottom-0 h-[1px] w-full bg-white-base"
            />
        </div>
    );
};

export default LogoHeader;
