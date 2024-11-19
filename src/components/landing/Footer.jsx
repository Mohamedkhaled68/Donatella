import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const icons = [
    {
        icon: <FaFacebook size={25} />,
    },
    {
        icon: <FaTwitter size={25} />,
    },
    {
        icon: <FaInstagram size={25} />,
    },
];
const Footer = () => {
    return (
        <>
            <footer className="w-full bg-[#1F2224] text-white-base font-body px-[50px] py-[38px]">
                <div className="container mx-auto grid grid-cols-2">
                    <div className="flex flex-col gap-11">
                        <h1 className="text-4xl font-display font-bold">
                            Donatella
                        </h1>
                        <p className="text-[17px] font-extralight">
                            <span className="font-bold">&copy;</span> All Rights
                            Reserved, 2024.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-11">
                        <div className="flex items-center">
                            <p className="font-body text-large font-extralight">
                                Find us at:
                            </p>
                            <div className="flex items-center">
                                {icons.map(({ icon }, idx) => (
                                    <div
                                        key={idx}
                                        className="[&:nth-child(2)]:border-x-[1px] border-white-base p-2 px-5"
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ul className="list-disc flex gap-12 font-poppins text-lg font-light">
                            <li>About us</li>
                            <li>Privacy Policy</li>
                            <li>Support</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
