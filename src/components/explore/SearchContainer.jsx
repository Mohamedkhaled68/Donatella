import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import CustomSelect from "./CustomSelect";
import { useUserStore } from "../../store/userStore";
const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: 0 },
    down: { rotate: "180deg" },
};

const SearchContainer = ({
    onSearch,
    setIsOpent,
    isOpen,
    setLoading,
    cateSwitch,
    setCateSwitch,
}) => {
    const { userStatus } = useUserStore((state) => state);

    return (
        <div className="w-full rounded-3xl bg-[#27292C] grid grid-cols-7 gap-[55px] px-[30px] py-4">
            {userStatus.role !== "INDIVIDUAL" && (
                <div
                    onClick={() => setIsOpent((prev) => !prev)}
                    className="lg:px-[42px] cursor-pointer col-span-1 py-3 flex justify-center gap-[3px] lg:gap-[10px] items-center border-2 border-white-base text-white-base rounded-lg"
                >
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
            )}

            <CustomSelect
                cateSwitch={cateSwitch}
                setLoading={setLoading}
                setCateSwitch={setCateSwitch}
            />

            <input
                className={`grow px-[62px] py-2 text-center ${
                    userStatus.role === "INDIVIDUAL" && "lg:col-span-5"
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
