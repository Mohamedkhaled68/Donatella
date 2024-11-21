import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, x: -1000 },
    animate: { opacity: 1, x: 0 },
    exit: { x: 1000, transition: { duration: 0.01, ease: "easeInOut" } },
    transition: { duration: 0.3, ease: "easeInOut" },
};
const PageContainer = ({ children, className, pathname }) => {
    return (
        <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-full min-h-screen overflow-x-hidden ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default PageContainer;