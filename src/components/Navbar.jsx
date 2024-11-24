import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DropMenu from "./DropMenu";

const Navbar = () => {
    const [showDrop, setShowDrop] = useState(false);

    // Close the dropdown when clicking outside

    return (
        <>
            <nav className="relative w-full h-[60px] flex justify-center items-center py-3 border-b-thin border-white-base">
                <div className="container mx-auto text-white-base flex justify-between items-center">
                    <Link to="/" className="text-[22px] font-display">
                        Donatella
                    </Link>
                    <ul className="flex justify-between items-center font-normal font-display text-white-base text-sm gap-[73px]">
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
                            MyProfile
                        </NavLink>
                    </ul>
                    <div
                        onClick={() => setShowDrop(!showDrop)}
                        className="w-[42px] h-[42px] flex justify-center items-center bg-slate-800 rounded-full hover:bg-white-base/20 cursor-pointer duration-300"
                    >
                        <div className="w-[36px] h-[36px] bg-slate-800 rounded-full"></div>
                    </div>
                </div>
                {showDrop && <DropMenu />}
            </nav>
        </>
    );
};

export default Navbar;
