import React, { useEffect } from "react";
import Rating from "../shared/Rating";
import { FiEdit } from "react-icons/fi";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CountryEnum } from "../../utils/constants";
import { useUserStore } from "../../store/userStore";
const ProfileHeader = ({ data }) => {
    const navigate = useNavigate();
    const { userStatus } = useUserStore((state) => state);
    const handleNavigate = (role) => {
        if (role === "ORGANIZATION") {
            navigate("/explore/post-job");
        } else {
            return;
        }
    };

    function getKeyByValue(obj, value) {
        return Object.keys(obj).find((key) => obj[key] === value);
    }

    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <>
            <div className="w-full flex justify-around items-center gap-[170px] my-8">
                {data.role === "ORGANIZATION" ? (
                    <>
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="flex justify-center items-end relative">
                                <div className="w-[124px] h-[124px] rounded-full bg-slate-400"></div>
                                <div className="absolute bottom-0 -right-1">
                                    <FiEdit size={18} />
                                </div>
                            </div>
                            <Rating rating={4} size={30} maxRating={5} />
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-display text-2xl font-black capitalize">
                                    {data.organization.name}
                                </h1>
                                <p className="font-body text-white-base/50 text-base font-light capitalize">
                                    {/* Los Angeles, CA, USA */}
                                    {getKeyByValue(
                                        CountryEnum.enums,
                                        data?.organization.location
                                    )}
                                    , {""} {data?.organization.location}
                                </p>
                            </div>
                            <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                                {data.role.toLowerCase()}
                            </div>
                            <div className="w-full flex items-center justify-around">
                                <IconLink
                                    url={data?.organization.instagram}
                                    Icon={FaInstagram}
                                />
                                <IconLink
                                    url={data?.organization.tiktok}
                                    Icon={FaTiktok}
                                />
                                <IconLink
                                    url={data?.organization.website}
                                    Icon={TbWorld}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="flex justify-center items-end relative">
                                <div className="w-[124px] h-[124px] rounded-full bg-slate-400"></div>
                                <div className="absolute bottom-0 -right-1">
                                    <FiEdit size={18} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-display text-2xl font-black capitalize">
                                    {data.individual.fullName}
                                </h1>
                                {userStatus.individual.role === "MODEL" && (
                                    <p className="font-body text-white-base/50 text-base font-light capitalize mt-4">
                                        {/* Los Angeles, CA, USA */}
                                        {getKeyByValue(
                                            CountryEnum.enums,
                                            data?.individual.specialtyInfo
                                                .nationality
                                        )}
                                        , {""}{" "}
                                        {
                                            data?.individual.specialtyInfo
                                                .nationality
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                                {data?.individual?.role?.toLowerCase()}
                            </div>
                        </div>
                    </>
                )}

                {data.role === "INDIVIDUAL" ? (
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex flex-col justify-center items-center">
                            <Rating rating={3} size={30} maxRating={5} />
                            <p className="font-body text-white-base/50 text-base font-light">
                                0 Projects Completed
                            </p>
                        </div>
                        <div className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[35px] py-[15px]">
                            Profile Visibility
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-5">
                        <button
                            type="button"
                            className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-[#293038] px-[73px] py-[15px]"
                        >
                            Edit Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(role)}
                            className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[73px] py-[15px]"
                        >
                            Post Job
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfileHeader;

const IconLink = ({ url, Icon }) => (
    <div onClick={() => window.open(url, "_blank")} className="cursor-pointer">
        <Icon size={25} />
    </div>
);
