import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropMenu from "./DropMenu";
import { donatellaLogo } from "../assets";

const Navbar = () => {
    const [showDrop, setShowDrop] = useState(false);

    return (
        <>
            <nav className="relative w-full h-[60px] flex justify-center items-center py-3 border-b-thin border-white-base">
                <div className="container mx-auto text-white-base grid grid-cols-7">
                    <div className="flex justify-start items-center col-span-2">
                        <img
                            className="w-[30%]"
                            src={donatellaLogo}
                            alt="logo"
                        />
                    </div>
                    <ul className="flex col-span-3 justify-between items-center font-normal font-display text-white-base text-sm gap-[73px]">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-blue-primary pb-1"
                                    : "text-white-base/75"
                            }
                            to={"/messages"}
                        >
                            Messages
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-blue-primary pb-1"
                                    : "text-white-base/75"
                            }
                            to={"/payments"}
                        >
                            Payments
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-blue-primary pb-1"
                                    : "text-white-base/75"
                            }
                            to={"/explore"}
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-blue-primary pb-1"
                                    : "text-white-base/75"
                            }
                            to={"/profile"}
                        >
                            My Profile
                        </NavLink>
                    </ul>
                    <div className="flex justify-end items-center col-span-2">
                        <div
                            onClick={() => setShowDrop(!showDrop)}
                            className="w-[42px] h-[42px] flex justify-end items-center bg-slate-800 rounded-full hover:bg-white-base/20 cursor-pointer duration-300"
                        >
                            <div className="w-[36px] h-[36px] bg-slate-800 rounded-full"></div>
                        </div>
                    </div>
                </div>
                {showDrop && <DropMenu />}
            </nav>
        </>
    );
};

export default Navbar;
