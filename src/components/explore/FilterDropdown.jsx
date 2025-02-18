import React from "react";
import { motion } from "framer-motion";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { blueHeadIcon } from "../../assets";
import { VscColorMode } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";

const filterOptions = [
    {
        id: 0,
        icon: <IoMaleFemaleSharp color="#197FE5" size={25} />,
        label: "Gender",
        options: [
            { value: "", label: "Gender" },
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "OTHER", label: "Other" },
        ],
    },
    {
        id: 1,
        icon: <img width={25} src={blueHeadIcon} alt="Hair Color Icon" />,
        label: "Hair Color",
        options: [
            { value: "", label: "Hair Color" },
            { value: "BLACK", label: "Black" },
            { value: "BROWN", label: "Brown" },
            { value: "BLONDE", label: "Blonde" },
            { value: "RED", label: "Red" },
        ],
    },
    {
        id: 2,
        icon: <VscColorMode color="#197FE5" size={25} />,
        label: "Tone",
        options: [
            { value: "", label: "Tone" },
            { value: "LIGHT", label: "Light" },
            { value: "MEDIUM", label: "Medium" },
            { value: "DARK", label: "Dark" },
        ],
    },
    {
        id: 3,
        icon: <FaEye color="#197FE5" size={25} />,
        label: "Eye Color",
        options: [
            { value: "", label: "Eye Color" },
            { value: "BLUE", label: "Blue" },
            { value: "GREEN", label: "Green" },
            { value: "BROWN", label: "Brown" },
            { value: "HAZEL", label: "Hazel" },
        ],
    },
    {
        id: 4,
        icon: <GiRunningShoe color="#197FE5" size={25} />,
        label: "Shoe Size",
        options: Array.from({ length: 31 }, (_, i) => ({
            value: i + 20,
            label: `${i + 20} cm`,
        })),
    },
    {
        id: 5,
        icon: <PiDressBold color="#197FE5" size={25} />,
        label: "Dress Size",
        options: Array.from({ length: 11 }, (_, i) => ({
            value: i + 10,
            label: `${i + 10} cm`,
        })),
    },
];

const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: 0 },
    down: { rotate: "180deg" },
};
const FilterDropdown = ({ isOpen, onFilterChange }) => (
    <>
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={filterAnimationVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-between items-center mb-12 mt-5 overflow-hidden"
        >
            <div className="w-full rounded-3xl bg-[#27292C] flex justify-between items-center gap-[55px] px-[39px] py-2">
                {filterOptions.map((option) => (
                    <div key={option.id} className="flex items-center">
                        {option.icon}
                        <select
                            className="bg-transparent p-3 outline-none border-none text-white-base"
                            name={option.id}
                            id={option.id}
                            onChange={(e) =>
                                onFilterChange(option.id, e.target.value)
                            }
                        >
                            {option.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </motion.div>
    </>
);

export default FilterDropdown;
