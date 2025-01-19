import React from "react";
import { motion } from "framer-motion";

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
    const items = ["Homepage", "Services", "Portfolio", "Contact", "About"];

    return (
        <>
            <motion.div
                className="links || absolute w-full h-full flex justify-center items-center"
                variants={variants}
            >
                <ul className="flex flex-col justify-center items-center gap-10">
                    {items.map((item) => (
                        <motion.li
                            key={item}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-white-base font-display text-3xl font-thin italic cursor-pointer drop-shadow"
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
                <div className="lg:hidden w-full text-center absolute bottom-[5%] pb-2 left-[50%] translate-x-[-50%] translate-y-[-50%] text-white-base font-display text-xl font-thin italic">
                    Account management is only<br/> through desktop for now.
                </div>
            </motion.div>
        </>
    );
};

export default Links;
