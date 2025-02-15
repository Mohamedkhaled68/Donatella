import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { donatellaLogo } from "../../assets";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const icons = [
    {
        icon: <FaInstagramSquare size={25} />,
        link: "https://www.instagram.com/donatellaksa",
    },
    {
        icon: <FaSnapchatGhost size={25} />,
        link: "https://snapchat.com/t/6pI2FaWD",
    },
    {
        icon: <FaTiktok size={25} />,
        link: "https://www.tiktok.com/@donatellaksa",
    },
    {
        icon: <FaLinkedin size={25} />,
        link: "https://www.linkedin.com/company/donatellaksa/",
    },
    {
        icon: <FaYoutube size={25} />,
        link: "https://youtube.com/@donatellaksa",
    },
    {
        icon: <FaXTwitter size={25} />,
        link: "https://x.com/donatellaksa",
    },
    {
        icon: <FaFacebook size={25} />,
        link: "https://www.facebook.com/DonatellaKsa",
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
                            Reserved, {new Date().getFullYear()}.
                        </p>
                    </div>
                    <div className="flex flex-col mt-[20px] lg:mt-[0] items-center lg:items-end gap-5 lg:gap-11">
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-center items-center">
                            <p className="font-body text-[18px] lg:text-large font-extralight">
                                Find us at:
                            </p>
                            <div className="flex items-center">
                                {icons.map(({ icon, link }, idx) => (
                                    <a
                                        href={link}
                                        key={idx}
                                        target="_blank"
                                        className="[&:nth-child(2)]:border-x-[2px] [&:nth-child(4)]:border-x-[2px] [&:nth-child(6)]:border-x-[2px] border-white-base/50 px-[9px]"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <ul className="lg:list-disc flex gap-[8px] lg:gap-12 font-poppins text-[11px] lg:text-base font-light">
                            <li>
                                <Link to={"/about"}>About us</Link>
                            </li>
                            <li>
                                <Link to={"/privacy"}>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to={"/services"}>Services</Link>
                            </li>
                            <li>
                                <Link to={"/contact"}>Contact us</Link>
                            </li>
                        </ul>
                        <p className="block lg:hidden text-[14px] lg:text-[17px] font-extralight">
                            <span className="font-bold">&copy;</span> All Rights
                            Reserved, {new Date().getFullYear()}.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
