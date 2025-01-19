import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropMenu from "./DropMenu";
import { donatellaLogo } from "../assets";
import { useUserStore } from "../store/userStore";

const Navbar = () => {
    const [showDrop, setShowDrop] = useState(false);
    const userStatus = useUserStore((state) => state.userStatus);

    return (
        <>
            <nav className="relative w-full h-[60px] flex justify-center items-center py-3 border-b-thin border-white-base">
                <div className="container mx-auto text-white-base grid grid-cols-8">
                    <div className="flex justify-start items-center col-span-2">
                        <img
                            className="w-[100px]"
                            src={donatellaLogo}
                            alt="logo"
                        />
                    </div>
                    <ul className="flex col-span-4 justify-between items-center font-normal font-display text-white-base text-sm gap-[73px]">
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
                            Profile
                        </NavLink>
                    </ul>
                    <div className="flex justify-end items-center col-span-2">
                        <div
                            onClick={() => setShowDrop(!showDrop)}
                            className="w-[45px] h-[45px] flex justify-center items-center bg-slate-800 rounded-full hover:bg-white-base/20 cursor-pointer duration-300"
                        >
                            <div className="w-[40px] h-[40px] bg-slate-800 rounded-full overflow-hidden flex justify-center items-center">
                                {userStatus?.role === "INDIVIDUAL" ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            userStatus?.individual
                                                ?.specialtyInfo
                                                ?.profilePicture[0]
                                        }
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            userStatus?.organization
                                                ?.logo
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showDrop && <DropMenu />}
            </nav>
        </>
    );
};

export default Navbar;
