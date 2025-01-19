import React from "react";
import { FaTransgender, FaArrowsAltV, FaTape } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RxCalendar } from "react-icons/rx";
import { GiWeight, GiRunningShoe } from "react-icons/gi";
import { IoEyeSharp } from "react-icons/io5";
import { VscColorMode } from "react-icons/vsc";
import { PiDressBold } from "react-icons/pi";
import { blueHeadIcon } from "../../assets";
import { CountryEnum } from "../../utils/constants";

const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="px-[10px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex items-center">
        <div className="w-[40%] pl-2">
            {Icon ? <Icon className="text-blue-primary" size={30} /> : label}
        </div>
        <div>{value}</div>
    </div>
);

const ModelSpecialtyInfo = ({ userStatus }) => {
    const {
        height = "N/A",
        weight = "N/A",
        eyeColorEnum = "N/A",
        birthDate,
        dressSize = "N/A",
        shoeSize = "N/A",
        bust = "N/A",
        hips = "N/A",
        waist = "N/A",
        gender = "N/A",
        nationality,
        skinToneEnum = "N/A",
        hairColorEnum = "N/A",
    } = userStatus?.individual?.specialtyInfo;

    const formattedDate = birthDate
        ? new Date(birthDate).toLocaleDateString("en-GB")
        : "N/A";

    const nationalityName =
        Object.keys(CountryEnum.enums).find(
            (key) => CountryEnum.enums[key] === nationality
        ) || "N/A";

    return (
        <div className="w-full grid grid-cols-3 gap-x-[7.3rem] justify-items-center">
            <div className="w-[350px]">
                <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                    <InfoCard icon={FaTransgender} value={gender} />
                    <InfoCard icon={RxCalendar} value={formattedDate} />
                    <InfoCard icon={FaArrowsAltV} value={`${height} cm`} />
                    <InfoCard icon={GiWeight} value={`${weight} kg`} />
                </div>
            </div>
            <div className="w-[350px]">
                <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                    <InfoCard icon={FaEarthAmericas} value={nationalityName} />
                    <InfoCard
                        icon={null}
                        value={hairColorEnum}
                        label={
                            <img
                                className="w-[25px]"
                                src={blueHeadIcon}
                                alt="headIcon"
                            />
                        }
                    />
                    <InfoCard icon={IoEyeSharp} value={eyeColorEnum} />
                    <InfoCard icon={VscColorMode} value={skinToneEnum} />
                </div>
            </div>
            <div className="w-[350px]">
                <div className="grid grid-cols-2 w-full gap-x-7">
                    <div className="col-span-1 flex flex-col gap-[18px]">
                        <InfoCard
                            icon={GiRunningShoe}
                            value={`${shoeSize} cm`}
                        />
                        <InfoCard
                            icon={PiDressBold}
                            value={`${dressSize} inches`}
                        />
                    </div>
                    <div className="col-span-1 h-full">
                        <div className="h-full px-[26px] py-[10px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex flex-col items-center justify-center">
                            <FaTape className="text-blue-primary" size={30} />
                            <div>{bust} cm</div>X<div>{hips} cm</div>X
                            <div>{waist} cm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelSpecialtyInfo;
