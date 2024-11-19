import React, { useEffect, useState } from "react";
import {
    DeleteUsers,
    Explore,
    Landing,
    Login,
    Profile,
    Signup,
    VerifyingPage,
} from "./pages";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
    IndividualForm,
    IndividualLastForm,
    PageContainer,
} from "./components";
import SelectCategory from "./components/SelectCategory";
import { FaAnglesUp } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <AnimatePresence mode="wait">
                <PageContainer pathname={location.pathname}>
                    <Routes location={location}>
                        <Route path="/delete-users" element={<DeleteUsers />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/individual-form"
                            element={<IndividualForm />}
                        />
                        <Route
                            path="/selectCategory"
                            element={<SelectCategory />}
                        />
                        <Route
                            path="/individual-last-form"
                            element={<IndividualLastForm />}
                        />

                        <Route
                            element={<ProtectedRoute redirectPath="/landing" />}
                        >
                            <Route
                                path="/"
                                element={<Navigate to="/profile" replace />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/explore" element={<Explore />} />
                        </Route>
                        <Route
                            path="/verifying-page"
                            element={<VerifyingPage />}
                        />
                    </Routes>
                </PageContainer>
            </AnimatePresence>

            {isVisible && (
                <motion.div
                    className="fixed bottom-10 right-10 flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#121417] shadow-sm shadow-white-base/80 text-white-base cursor-pointer"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    onClick={handleScrollToTop}
                >
                    <FaAnglesUp size={25} />
                </motion.div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default App;
