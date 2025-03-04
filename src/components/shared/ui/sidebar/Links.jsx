import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
    open: {
        transition: {
            staggerChildren: 0.1,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};
const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    },
};

const Links = () => {
    const items = [
        { path: "/about", name: "About" },
        { path: "/services", name: "Services" },
        { path: "/contact", name: "Contact" },
        { path: "/privacy", name: "Privacy Policy" },
    ];

    return (
        <>
            <motion.div
                className="links || absolute w-full h-full flex justify-center items-center"
                variants={variants}
            >
                <ul className="flex flex-col justify-center items-center gap-10">
                    {items.map((item) => (
                        <motion.li
                            key={item.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-white-base font-display text-3xl font-thin italic cursor-pointer drop-shadow"
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </motion.li>
                    ))}
                </ul>
                <div className="lg:hidden w-full text-center absolute top-[20%] pb-2 left-[50%] translate-x-[-50%] translate-y-[-50%] text-white-base font-display text-[25px] font-thin italic">
                    Account management is only
                    <br /> through desktop for now.
                </div>
            </motion.div>
        </>
    );
};

export default Links;
