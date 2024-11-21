import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className=" w-full py-3 border-b-thin border-white-base">
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
                    <div className="w-[36px] h-[36px] bg-slate-600 rounded-full"></div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;