import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/userStore";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";

const pageVariants = {
    initial: { opacity: 0, x: -1000 },
    animate: { opacity: 1, x: 0 },
    exit: { x: 1000, transition: { duration: 0.01, ease: "easeInOut" } },
    transition: { duration: 0.3, ease: "easeInOut" },
};
const PageContainer = ({ children, className, pathname }) => {
    const { userStatus } = useUserStore((state) => state);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        console.log(userStatus);
    }, [location.pathname]);
    return (
        <>
            {userStatus?.onboardingCompleted && <Navbar />}
            <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`w-full min-h-[calc(100vh-60px] overflow-x-hidden ${className}`}
            >
                {children}
            </motion.div>
        </>
    );
};

export default PageContainer;
