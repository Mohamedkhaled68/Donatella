import React from "react";
import { motion } from "framer-motion";

const ToggleButton = ({ setOpen }) => {
    return (
        <button
            className="w-[50px] h-[50px] rounded-full z-[1001] absolute top-[25px] left-[25px] bg-transparent border-none cursor-pointer flex justify-center items-center"
            onClick={() => setOpen((prev) => !prev)}
        >
            <svg width="20" height="20" viewBox="0 0 23 23">
                <motion.path
                    strokeWidth="3"
                    stroke="#fcfcfc"
                    strokeLinecap="round"
                    variants={{
                        closed: {
                            d: "M 2 2.5 L 20 2.5",
                            transition: { delay: 0.2 },
                        },
                        open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <motion.path
                    strokeWidth="3"
                    stroke="#fcfcfc"
                    strokeLinecap="round"
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1, transition: { delay: 0.2 } },
                        open: { opacity: 0 },
                    }}
                />
                <motion.path
                    strokeWidth="3"
                    stroke="#fcfcfc"
                    strokeLinecap="round"
                    variants={{
                        closed: {
                            d: "M 2 16.346 L 20 16.346",
                            transition: { delay: 0.2 },
                        },
                        open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                />
            </svg>
        </button>
    );
};

export default ToggleButton;
