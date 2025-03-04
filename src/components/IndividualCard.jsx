import React, { useEffect, useState } from "react";
import Rating from "./shared/Rating";
import { profileGirl } from "../assets";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { FaEye, FaUser } from "react-icons/fa";
import { PiDressBold } from "react-icons/pi";
import { GiRunningShoe } from "react-icons/gi";
import { VscColorMode } from "react-icons/vsc";
import { headIcon } from "../assets";
import { getCountryByCode } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import useGetStars from "../hooks/individuals/useGetStars";
import toast from "react-hot-toast";

// Define attribute types for better organization and type safety
const AttributeTypes = {
    HAIR_COLOR: "hairColor",
    SHOE_SIZE: "shoeSize",
    EYE_COLOR: "eyeColor",
    GENDER: "gender",
    DRESS_SIZE: "dressSize",
    SKIN_TONE: "skinTone",
};

// Enhanced attributes configuration
const attributeConfig = [
    {
        id: AttributeTypes.HAIR_COLOR,
        icon: headIcon,
        isImage: true,
        getValue: (profile) => profile?.specialtyInfo?.hairColorEnum,
        displayName: "Hair Color",
    },
    {
        id: AttributeTypes.SHOE_SIZE,
        icon: <GiRunningShoe size={25} />,
        isImage: false,
        getValue: (profile) => profile?.specialtyInfo?.shoeSize,
        displayName: "Shoe Size",
    },
    {
        id: AttributeTypes.EYE_COLOR,
        icon: <FaEye size={25} />,
        isImage: false,
        getValue: (profile) => profile?.specialtyInfo?.eyeColorEnum,
        displayName: "Eye Color",
    },
    {
        id: AttributeTypes.GENDER,
        icon: <IoMaleFemaleSharp size={25} />,
        isImage: false,
        getValue: (profile) => profile?.specialtyInfo?.gender,
        displayName: "Gender",
    },
    {
        id: AttributeTypes.DRESS_SIZE,
        icon: <PiDressBold size={25} />,
        isImage: false,
        getValue: (profile) => profile?.specialtyInfo?.dressSize,
        displayName: "Dress Size",
    },
    {
        id: AttributeTypes.SKIN_TONE,
        icon: <VscColorMode size={25} />,
        isImage: false,
        getValue: (profile) => profile?.specialtyInfo?.skinToneEnum,
        displayName: "Skin Tone",
    },
];

// Attribute Item Component for better organization
const AttributeItem = ({ attribute, profile, isModelView }) => (
    <span
        className={`flex justify-center gap-2 items-center w-full ${
            isModelView ? "col-span-2" : "col-span-1"
        }`}
    >
        {attribute.isImage ? (
            <img
                className="w-[20px]"
                src={attribute.icon}
                alt={attribute.displayName}
            />
        ) : (
            attribute.icon
        )}
        <p className="w-[30%] text-center capitalize">
            {Number(attribute.getValue(profile))
                ? attribute.getValue(profile)
                : attribute.getValue(profile)?.toLowerCase()}
        </p>
    </span>
);

const IndividualCard = ({ className, filter, profile }) => {
    const isModelView = filter === "models";
    const navigate = useNavigate();
    const [stars, setStars] = useState(0);
    const { mutateAsync: getStars } = useGetStars();

    const handleNavigateToIndividual = () => {
        const { id } = profile;
        navigate(`/explore/individuals/${id}`);
    };

    const getIndividualStars = async (id) => {
        try {
            const starsData = await getStars(id);
            setStars(starsData.stars);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to get stars");
        }
    };

    useEffect(() => {
        getIndividualStars(profile.id);
    }, [profile]);
    return (
        <div
            className={`bg-[#313131] border-thin min-w-[300px] max-w-full h-[508px] border-white-base/5 rounded-[20px] p-4 flex flex-col gap-4 ${className}`}
        >
            <div className="flex flex-col gap-2">
                <h1 className="name || text-md font-bold text-white-base font-display capitalize">
                    {`${profile?.firstName || ""} ${profile?.lastName || ""}`}
                </h1>
                <div className="flex justify-between items-center">
                    <p className="region || text-sm font-light text-white-base/50 font-body">
                        {profile?.specialtyInfo?.nationality &&
                            `${getCountryByCode(
                                profile.specialtyInfo.nationality
                            )}, ${profile.specialtyInfo.nationality}`}
                    </p>
                    <Rating rating={stars} maxRating={5} />
                </div>
            </div>
            <div className="rounded-md h-full w-full relative group hover:border-white-base/70 duration-200 border-thin overflow-hidden border-white-base/5">
                {profile?.role === "MODEL" && (
                    <div className="absolute w-full h-full top-0 group-hover:opacity-100 opacity-0 duration-300 left-0 bg-black/80 flex justify-center items-center">
                        <div
                            className={`h-full w-full grid ${
                                isModelView ? "grid-cols-1" : "grid-cols-2"
                            } gap-2 justify-items-center py-2 text-white-base`}
                        >
                            {attributeConfig.map((attr) => (
                                <AttributeItem
                                    key={attr.id}
                                    attribute={attr}
                                    profile={profile}
                                    isModelView={isModelView}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {profile?.specialtyInfo?.profilePicture ? (
                    <img
                        className="object-cover w-full h-full"
                        src={profile?.specialtyInfo?.profilePicture}
                        alt={`${profile?.firstName || "Profile"} image`}
                    />
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <FaUser size={100} className="text-white-base " />
                    </div>
                )}
            </div>
            <button
                onClick={handleNavigateToIndividual}
                className="btn || py-3 px-[50px] bg-blue-primary rounded-[46px] text-white-base text-medium font-semibold font-body text-center"
            >
                View Profile
            </button>
        </div>
    );
};

export default IndividualCard;
