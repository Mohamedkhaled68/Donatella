import React, { useState, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import DropMenu from "./DropMenu";
import { donatellaLogo } from "../assets";
import { useUserStore } from "../store/userStore";
import { FaUser } from "react-icons/fa";

const ProfilePicture = ({ userStatus }) => {
    const profileImage = useMemo(() => {
        if (userStatus?.role === "INDIVIDUAL") {
            return (
                userStatus?.individual?.specialtyInfo?.profilePicture ?? null
            );
        }
        if (userStatus?.role === "ORGANIZATION") {
            return userStatus?.organization?.logo ?? null;
        }
        return null;
    }, [userStatus]);

    return (
        <div className="w-10 h-10 bg-slate-800 rounded-full overflow-hidden flex justify-center items-center">
            {profileImage ? (
                <img
                    className="w-full h-full object-cover"
                    src={profileImage}
                    alt="Profile"
                />
            ) : (
                <FaUser size={20} className="text-white" />
            )}
        </div>
    );
};

const Navbar = () => {
    const [showDrop, setShowDrop] = useState(false);
    const userStatus = useUserStore((state) => state.userStatus);

    return (
        <>
            <nav className="relative w-full h-[60px] flex justify-center items-center py-3 border-b-thin border-white-base">
                <div className="container mx-auto text-white-base grid grid-cols-8">
                    <Link
                        to={"/landing"}
                        className="flex justify-start items-center col-span-2"
                    >
                        <img
                            className="w-[100px]"
                            src={donatellaLogo}
                            alt="logo"
                        />
                    </Link>
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
                            <ProfilePicture userStatus={userStatus} />
                        </div>
                    </div>
                </div>
                {showDrop && <DropMenu setShowDrop={setShowDrop} />}
            </nav>
        </>
    );
};

export default Navbar;
