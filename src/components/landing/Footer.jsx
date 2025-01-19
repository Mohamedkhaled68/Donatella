import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { donatellaLogo } from "../../assets";

const icons = [
    {
        icon: <FaLinkedin size={25} />,
    },
    {
        icon: <FaTiktok size={25} />,
    },
    {
        icon: <FaInstagram size={25} />,
    },
    {
        icon: <FaSnapchat size={25} />,
    },
];
const Footer = () => {
    return (
        <>
            <footer className="w-full bg-[#1F2224] text-white-base font-body px-[50px] py-[38px]">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col items-center lg:items-start gap-11">
                        <div className="w-[200px]">
                            <img src={donatellaLogo} alt="" />
                        </div>
                        <p className="hidden lg:block text-[17px] font-extralight">
                            <span className="font-bold">&copy;</span> All Rights
                            Reserved, 2024.
                        </p>
                    </div>
                    <div className="flex flex-col mt-[40px] lg:mt-[0] items-center lg:items-end gap-5 lg:gap-11">
                        <div className="flex justify-center items-center">
                            <p className="font-body text-[13px] lg:text-large font-extralight">
                                Find us at:
                            </p>
                            <div className="flex items-center">
                                {icons.map(({ icon }, idx) => (
                                    <div
                                        key={idx}
                                        className="[&:nth-child(2)]:border-x-[2px] [&:nth-child(3)]:border-r-[2px] border-white-base/50 px-[9px]"
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ul className="lg:list-disc flex gap-5 lg:gap-12 font-poppins text-[12px] lg:text-base font-light">
                            <li>About us</li>
                            <li>Privacy Policy</li>
                            <li>Support</li>
                            <li>Contact us</li>
                        </ul>
                        <p className="block lg:hidden text-[14px] lg:text-[17px] font-extralight">
                            <span className="font-bold">&copy;</span> All Rights
                            Reserved, 2024.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
