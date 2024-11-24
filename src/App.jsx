import React, { useEffect, useState } from "react";
import {
    DeleteUsers,
    ExperienceFormSection,
    Explore,
    Landing,
    Login,
    Profile,
    ProfileFormSection,
    Signup,
    VerifyingPage,
    Messages,
    OrgProfileForm,
    Payments,
} from "./pages";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PageContainer } from "./components";
import SelectCategory from "./components/onBoarding/SelectCategory";
import { FaAnglesUp } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { PostJob, ProtectedRoute } from "./routes";

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
                        {/* UNAUTHORIZED */}
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/verifying-page"
                            element={<VerifyingPage />}
                        />

                        {/* ONBOARDING */}
                        <Route
                            path="/select-category"
                            element={<SelectCategory />}
                        />
                        <Route
                            path="/experience-form"
                            element={<ExperienceFormSection />}
                        />
                        <Route
                            path="/profile-form"
                            element={<ProfileFormSection />}
                        />
                        <Route
                            path="/organization-form"
                            element={<OrgProfileForm />}
                        />

                        <Route path="/delete-users" element={<DeleteUsers />} />

                        {/* AUTHORIZED */}
                        <Route
                            element={<ProtectedRoute redirectPath="/landing" />}
                        >
                            <Route
                                path="/"
                                element={<Navigate to="/profile" replace />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route
                                path="/explore/post-job"
                                element={<PostJob />}
                            />
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/payments" element={<Payments />} />
                        </Route>
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
