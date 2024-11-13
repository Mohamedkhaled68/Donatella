import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
        return navigate(-1);
    };

    const value = { showMenu, setShowMenu, handleGoBack };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
