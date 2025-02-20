import React, { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import CustomSelect from "./CustomSelect";
import { IoMenu } from "react-icons/io5";
const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: "180deg" },
    down: { rotate: 0 },
};

const SearchContainer = ({
    onSearch,
    setIsOpent,
    isOpen,
    setLoading,
    cateSwitch,
    setCateSwitch,
}) => {
    useEffect(() => {
        if (cateSwitch === "jobs") setIsOpent(false);
    }, [cateSwitch]);
    return (
        <div className="w-full rounded-3xl bg-[#27292C] grid grid-cols-7 gap-[55px] px-[30px] py-4">
            {cateSwitch === "profiles" && (
                <div
                    onClick={() => setIsOpent((prev) => !prev)}
                    className="px-2 cursor-pointer col-span-1 py-3 flex itmes-center gap-3  items-center border-thin border-white-base text-white-base rounded-lg"
                >
                    <IoMenu size={20} className="text-white-base" />
                    <div className="flex items-center justify-between gap-[5px] w-full ">
                        <p>Filters</p>
                        <motion.div
                            initial="up"
                            animate={isOpen ? "up" : "down"}
                            variants={filterAnimationVariants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex justify-center items-center"
                        >
                            <FaAngleDown />
                        </motion.div>
                    </div>
                </div>
            )}

            <CustomSelect
                cateSwitch={cateSwitch}
                setLoading={setLoading}
                setCateSwitch={setCateSwitch}
            />

            <input
                className={`grow px-[62px] py-2 text-center ${
                    cateSwitch !== "profiles" && "lg:col-span-5"
                } col-span-4 placeholder:text-white-base/50 placeholder:text-sm placeholder:font-light bg-[#323335] rounded-2xl outline-none border-thin border-black text-white-base`}
                placeholder="Search for a model you want to hire"
                type="text"
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className="text-center py-3 border-2 col-span-1 border-blue-primary text-white-base rounded-lg">
                Search
            </button>
        </div>
    );
};

export default SearchContainer;
