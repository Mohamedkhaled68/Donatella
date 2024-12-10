import React from "react";
import { FaTransgender } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import { FaArrowsAltV } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { dateFormat } from "../../utils/helpers";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { VscColorMode } from "react-icons/vsc";
import { GiRunningShoe } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import { CountryEnum } from "../../utils/constants";
import { FaTape } from "react-icons/fa";
import { blueHeadIcon } from "../../assets";

const ModelSpecialtyInfo = ({ userStatus }) => {
    const {
        height,
        weight,
        eyeColorEnum,
        birthDate,
        dressSize,
        shoeSize,
        bust,
        hips,
        waist,
        gender,
        nationality,
        skinToneEnum,
        hairColorEnum,
    } = userStatus.individual.specialtyInfo;
    return (
        <>
            <div className="w-full grid grid-cols-3 justify-items-center">
                <div className="w-[350px]">
                    <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <FaTransgender
                                className="text-blue-primary"
                                size={30}
                            />
                            {gender}
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <RxCalendar
                                className="text-blue-primary"
                                size={30}
                            />
                            {dateFormat(birthDate)}
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <FaArrowsAltV
                                className="text-blue-primary"
                                size={30}
                            />
                            {height} cm
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <GiWeight className="text-blue-primary" size={30} />
                            {weight} kg
                        </div>
                    </div>
                </div>
                <div className="w-[350px]">
                    <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <FaEarthAmericas
                                className="text-blue-primary"
                                size={30}
                            />
                            {Object.keys(CountryEnum.enums).find(
                                (key) => CountryEnum.enums[key] === nationality
                            )}
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <img
                                className="w-[25px]"
                                src={blueHeadIcon}
                                alt="headIcon"
                            />
                            {hairColorEnum}
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <IoEyeSharp
                                className="text-blue-primary"
                                size={30}
                            />
                            {eyeColorEnum}
                        </div>
                        <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                            <VscColorMode
                                className="text-blue-primary"
                                size={30}
                            />
                            {skinToneEnum}
                        </div>
                    </div>
                </div>
                <div className="w-[350px]">
                    <div className="grid grid-cols-2 w-full gap-x-7">
                        <div className="col-span-1 flex flex-col gap-[18px]">
                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                <GiRunningShoe
                                    className="text-blue-primary"
                                    size={30}
                                />
                                {shoeSize} cm
                            </div>
                            <div className="px-[20px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                <PiDressBold
                                    className="text-blue-primary"
                                    size={30}
                                />
                                {dressSize} inches
                            </div>
                        </div>
                        <div className="col-span-1 h-full">
                            <div className="h-full px-[26px] py-[10px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex flex-col items-center justify-center">
                                <FaTape
                                    className="text-blue-primary"
                                    size={30}
                                />
                                <div>{bust} cm</div>X<div>{hips} cm</div>X
                                <div>{waist} cm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModelSpecialtyInfo;
