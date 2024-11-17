import React, { useEffect } from "react";
import { Home, Login, Profile, Signup, VerifyingPage } from "./pages";
import { Route, Routes } from "react-router-dom";
import { IndividualForm, IndividualLastForm } from "./components";
import SelectCategory from "./components/SelectCategory";

const App = () => {
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "https://api.quickr.tech/models/api/v1/auth",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //             console.log(response.data); // Set the user data
    //         } catch (err) {
    //             console.log("Failed to fetch user");
    //         }
    //     };

    //     fetchUser(); // Call the function when component mounts
    // }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/individual-form" element={<IndividualForm />} />
                <Route path="/selectCategory" element={<SelectCategory />} />
                <Route
                    path="/individual-last-form"
                    element={<IndividualLastForm />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/verifying-page" element={<VerifyingPage />} />
            </Routes>
        </>
    );
};

export default App;
