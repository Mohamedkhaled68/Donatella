import React, { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";
import Links from "./Links";
import { motion } from "framer-motion";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const variants = {
        open: {
            clipPath: "circle(1200px at 50px 50px)",
            transition: {
                type: "spring",
                stiffness: 20,
            },
        },
        closed: {
            clipPath: "circle(20px at 50px 50px)",
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }
        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [open]);
    return (
        <motion.div
            animate={open ? "open" : "closed"}
            className="sidebar || flex flex-col justify-center items-center bg-white-base text-black"
        >
            <motion.div
                className="bg || z-[1000] absolute top-0 bottom-0 left-0 w-full lg:w-[400px] bg-[#27292C] shadow-[0_0_10px_1px_rgba(255,255,255,0.5)]"
                variants={variants}
            >
                <Links />
                
            </motion.div>
            <ToggleButton setOpen={setOpen} />
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.2 },
                    }}
                    className="absolute z-[999] top-0 left-0 w-full h-full bg-black/80"
                />
            )}
        </motion.div>
    );
};

export default Sidebar;
