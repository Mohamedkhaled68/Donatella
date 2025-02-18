import React, { useEffect, useRef, useState } from "react";
import Rating from "../shared/Rating";
import { FiEdit } from "react-icons/fi";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CountryEnum } from "../../utils/constants";
import { useUserStore } from "../../store/userStore";
import { FaAngleDown } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import useUploadImage from "../../hooks/auth/useUploadImage";

const ProfileHeader = ({ data }) => {
    const navigate = useNavigate();
    const { userStatus, setUserStatus } = useUserStore((state) => state);
    const [open, setOpen] = useState(false);
    const [isOn, setIsOn] = useState(null);
    const { mutateAsync: uploadImage } = useUploadImage();

    const fileInputRef = useRef();

    const { mutateAsync: updateMe } = useUpdateMe();

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

    const toggleSwitch = async () => {
        setIsOn((prev) => {
            const newValue = !prev;
            m(newValue); // Pass the updated value to the function
            return newValue;
        });
    };

    const m = async (isVisible) => {
        try {
            const { firstName, lastName, fullName, ...rest } =
                userStatus.individual;
            console.log({ ...rest, isVisible });
            await updateMe({ ...rest, isVisible });
            setUserStatus({
                ...userStatus,
                individual: { ...userStatus.individual, isVisible },
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (userStatus.role === "INDIVIDUAL") {
                try {
                    // Upload the image and get the URL or data
                    const data = await uploadImage(file);

                    const updatedSpecialtyInfo = {
                        ...userStatus.individual.specialtyInfo,
                        profilePicture: [data],
                    };

                    const updatedUserStatus = {
                        ...userStatus,
                        individual: {
                            ...userStatus.individual,
                            specialtyInfo: updatedSpecialtyInfo,
                        },
                    };

                    console.log(updatedUserStatus);

                    // Update the backend
                    const { firstName, lastName, fullName, ...rest } =
                        updatedUserStatus.individual;
                    await updateMe({ ...rest });

                    setUserStatus(updatedUserStatus);
                    console.log("Updated user status:", updatedUserStatus);
                    // setLoading(null);
                } catch (err) {
                    console.error("Error uploading image:", err);
                    // setError("Error uploading image, please try again.");
                    // setLoading(null);
                }
            } else {
                try {
                    // Upload the image and get the URL or data
                    const data = await uploadImage(file);

                    const updatedOrganization = {
                        ...userStatus.organization,
                        logo: data,
                    };
                    await updateMe(updatedOrganization);

                    const updatedUserStatus = {
                        ...userStatus,
                        organization: updatedOrganization,
                    };
                    setUserStatus(updatedUserStatus);
                    // setLoading(null);
                } catch (err) {
                    console.error("Error uploading image:", err);
                    // setError("Error uploading image, please try again.");
                    // setLoading(null);
                }
            }
        }
    };

    useEffect(() => {
        setIsOn(data?.individual?.isVisible);
        console.log(data);
    }, [userStatus]);

    if (!data) {
        return;
    }

    console.log(data);

    return (
        <>
            <div className="w-full flex justify-around items-start gap-[170px] my-8">
                {data.role === "ORGANIZATION" ? (
                    <>
                        <div className="flex flex-col justify-center items-center gap-5">
                            <div className="flex justify-center items-start relative">
                                <div className="w-[100px] h-[100px] rounded-full bg-slate-400 overflow-hidden flex justify-center items-center">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={data?.organization?.logo}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="absolute bottom-0 -right-1 cursor-pointer"
                                    onClick={handleEditClick}
                                >
                                    <FiEdit size={18} />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }} // Hide the file input
                                    accept="image/*" // Optional: Restrict to image files only
                                />
                            </div>
                            <Rating rating={4} size={30} maxRating={5} />
                        </div>
                        <div className="flex flex-col items-center -mt-[7px]">
                            {/* <div className="flex flex-col justify-center items-center"> */}
                            <h1 className="font-display text-2xl font-black capitalize mb-[10px]">
                                {data.organization.name}
                            </h1>
                            <p className="mb-[10px] font-body text-white-base/50 text-base font-light capitalize">
                                {/* Los Angeles, CA, USA */}
                                {getKeyByValue(
                                    CountryEnum.enums,
                                    data?.organization.location
                                )}
                                , {""} {data?.organization.location}
                            </p>
                            {/* </div> */}
                            <div className="mb-[15px] text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
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
                        <div
                            className={`flex flex-col justify-center items-center gap-3`}
                        >
                            <div className="flex justify-center items-end relative">
                                <div className="w-[115px] h-[115px] rounded-full bg-slate-400 overflow-hidden flex justify-center items-center">
                                    {data?.individual?.specialtyInfo
                                        ?.profilePicture ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={
                                                data?.individual?.specialtyInfo
                                                    ?.profilePicture[0]
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div
                                    className="absolute bottom-0 -right-1 cursor-pointer"
                                    onClick={handleEditClick}
                                >
                                    <FiEdit size={18} />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }} // Hide the file input
                                    accept="image/*" // Optional: Restrict to image files only
                                />
                            </div>
                        </div>
                        <div
                            className={`flex flex-col items-center  ${
                                userStatus.individual.role === "MODEL"
                                    ? "gap-0"
                                    : "gap-3"
                            } `}
                        >
                            {/* <div className="flex flex-col justify-center items-center"> */}
                            <h1
                                className={`font-display text-2xl font-black capitalize ${
                                    userStatus.individual.role === "MODEL"
                                        ? "mb-[20px] -mt-[6px]"
                                        : "-mt-[7px]"
                                }`}
                            >
                                {data.individual.fullName}
                            </h1>
                            {userStatus.individual.role === "MODEL" && (
                                <p className="font-body text-white-base/50 text-base font-light capitalize mt-[-10px] mb-[13px]">
                                    {getKeyByValue(
                                        CountryEnum.enums,
                                        data?.individual?.specialtyInfo
                                            .nationality
                                    )}
                                    , {""}{" "}
                                    {
                                        data?.individual?.specialtyInfo
                                            .nationality
                                    }
                                </p>
                            )}
                            {/* </div> */}
                            {userStatus.individual.role !== "MODEL" && (
                                <p className="font-body text-white-base/50 text-base font-light">
                                    0 Projects Completed
                                </p>
                            )}

                            <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                                {data?.individual?.role?.toLowerCase()}
                            </div>
                        </div>
                    </>
                )}

                {data.role === "INDIVIDUAL" ? (
                    <div className="flex flex-col items-center justify-between gap-[27px]">
                        <Rating rating={3} size={30} maxRating={5} />

                        <div
                            onClick={() => setOpen(!open)}
                            className="cursor-pointer relative text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[35px] py-[15px] flex justify-center items-center gap-[10px]"
                        >
                            <span>Profile Visibility</span>
                            <FaAngleDown size={20} />

                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{
                                            y: open ? 0 : -10,
                                            opacity: open ? 1 : 0,
                                        }}
                                        exit={{
                                            y: -10,
                                            opacity: 0,
                                            transition: { delay: 0.3 },
                                        }}
                                        className="cursor-default overflow-hidden absolute w-full bg-slate-600 text-white-base rounded-md px-2 h-[50px] -bottom-14"
                                    >
                                        <div className="flex items-center justify-between mt-[12px] cursor-pointer">
                                            <p>Private</p>
                                            <div className="flex justify-center items-center w-[45px]">
                                                <div
                                                    className={`relative w-full h-[25px] rounded-full border-white-base border-[1px] cursor-pointer ${
                                                        isOn
                                                            ? "bg-blue-500"
                                                            : "bg-gray-300"
                                                    }`}
                                                    onClick={toggleSwitch}
                                                >
                                                    <div
                                                        className={`absolute w-[22px] h-[22px] bg-white-base rounded-full transition-transform duration-200 ${
                                                            isOn
                                                                ? "translate-x-[22px]"
                                                                : "translate-x-0"
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-[35px]">
                        <button
                            type="button"
                            className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-[#293038] px-[73px] py-[15px]"
                        >
                            Edit Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(data.role)}
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
