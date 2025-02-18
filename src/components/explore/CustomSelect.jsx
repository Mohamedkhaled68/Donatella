import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaBriefcase, FaUser } from "react-icons/fa";

const CustomSelect = ({ setLoading, cateSwitch, setCateSwitch }) => {
    const [open, setOpen] = useState(false);
    const options = [
        {
            value: "jobs",
            label: "Jobs",
            icon: <FaBriefcase className="text-white-base" />,
        },
        {
            value: "profiles",
            label: "Profiles",
            icon: <FaUser className="text-white-base" />,
        },
    ];

    const handleSelect = async (value) => {
        try {
            setLoading(true);
            setOpen(false);
            setCateSwitch(value);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        } catch (err) {}
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex justify-between items-center bg-transparent border border-white p-3 w-full rounded-md text-white-base"
            >
                <div className="flex gap-3 items-center">
                    {options.find((opt) => opt.value === cateSwitch)?.icon}
                    {options.find((opt) => opt.value === cateSwitch)?.label}
                </div>
                <div
                    className={`${
                        open ? "rotate-180" : "rotate-0"
                    } transition-all duration-300`}
                >
                    <FaAngleDown />
                </div>
            </button>
            <ul
                className={`${
                    open ? "h-auto" : "h-0 mt-0 border-none"
                } absolute bg-gray-800 text-white border border-white w-full mt-1 rounded-md overflow-hidden transition-all duration-300 ease-in-out`}
            >
                {options.map((option) => (
                    <li
                        key={option.value}
                        className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.icon} {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
