import React from "react";
import ToggleButton from "./ToggleButton";
import Links from "./Links";

const Sidebar = () => {
    return (
        <>
            <div className="sidebar || flex flex-col justify-center items-center bg-white text-black">
                <div className="bg || fixed top-0 left-0 w-[400px] bg-white ">
                    <Links />
                </div>
                <ToggleButton />
            </div>
        </>
    );
};

export default Sidebar;
