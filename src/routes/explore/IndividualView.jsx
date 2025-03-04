import React, { useEffect, useState } from "react";
import useGetIndividual from "../../hooks/explore/useGetIndividual";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CountryEnum } from "../../utils/constants";
import { BackButton, Footer, Loading, Rating } from "../../components";
import Border from "../../components/profile/Border";
import { dateFormat, splitText } from "../../utils/helpers";
import { FaTransgender, FaArrowsAltV, FaTape } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RxCalendar } from "react-icons/rx";
import { GiWeight, GiRunningShoe } from "react-icons/gi";
import { IoEyeSharp } from "react-icons/io5";
import { VscColorMode } from "react-icons/vsc";
import { PiDressBold } from "react-icons/pi";
import { blueHeadIcon } from "../../assets";
import { MdOutlineCameraAlt } from "react-icons/md";
import useGetStars from "../../hooks/individuals/useGetStars";
const IndividualView = () => {
    const [individual, setIndividual] = useState(null);
    const [specialtyInfo, setSpecialtyInfo] = useState(null);
        const [stars, setStars] = useState(0);
    
    const [bio, setBio] = useState([]);
    const { individualId } = useParams();
    const { mutateAsync: getIndividual } = useGetIndividual();
    const { mutateAsync: getStars } = useGetStars();


    const formattedDate = specialtyInfo?.birthDate
        ? new Date(specialtyInfo?.birthDate).toLocaleDateString("en-GB")
        : "N/A";

    const nationalityName =
        Object.keys(CountryEnum.enums).find(
            (key) => CountryEnum.enums[key] === specialtyInfo?.nationality
        ) || "N/A";

    function getKeyByValue(obj, value) {
        return Object.keys(obj).find((key) => obj[key] === value);
    }

    useEffect(() => {
        const fetchIndividual = async () => {
            try {
                const data = await getIndividual(individualId);
                console.log(data);
                setIndividual(data);
            } catch (error) {
                console.error("Error fetching individual:", error);
            }
        };
        fetchIndividual();
    }, [individualId, getIndividual]);

    useEffect(() => {
        if (individual) {
            const splitedBio = splitText(individual.bio, 80);
            setBio(splitedBio);
        }
    }, [individual]);
    const getIndividualStars = async (id) => {
        try {
            const starsData = await getStars(id);
            setStars(starsData.stars);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to get stars");
        }
    };

    useEffect(() => {
        getIndividualStars(individualId);
    }, [individualId]);

    useEffect(() => {
        if (individual?.role === "MODEL") {
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
            } = individual?.specialtyInfo;
            setSpecialtyInfo({
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
            });
        }
    }, [individual]);

    if (!individual) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto flex flex-col text-white-base pb-8">
                {/* HEADER */}
                <div className="w-full relative flex justify-around items-center gap-[170px] my-8">
                    <div className="absolute top-0 left-0">
                        <BackButton />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="flex justify-center items-end relative">
                            <div className="w-[124px] h-[124px] rounded-full bg-slate-400 overflow-hidden flex justify-center items-center">
                                {individual?.specialtyInfo?.profilePicture && (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            individual?.specialtyInfo
                                                ?.profilePicture
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-display text-2xl text-white-base font-bold capitalize">
                                {individual?.fullName}
                            </h1>
                            {individual?.role === "MODEL" && (
                                <p className="font-body text-white-base/50 text-base font-light capitalize mt-4">
                                    {getKeyByValue(
                                        CountryEnum.enums,
                                        individual?.specialtyInfo.nationality
                                    )}
                                    , {""}{" "}
                                    {individual?.specialtyInfo.nationality}
                                </p>
                            )}
                        </div>
                        <div className="text-base font-light font-body text-center w-[210px] capitalize rounded-lg bg-[#197FE540] px-[5px] py-2">
                            {individual?.role?.toLowerCase() ===
                            "music_and_sound_engineer"
                                ? "Music & Sound Engineer"
                                : individual?.role.toLowerCase()}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-2">
                        <Rating rating={stars} size={30} maxRating={5} />
                        <p className="font-body text-white-base/50 text-base font-light">
                            0 Projects Completed
                        </p>
                    </div>
                </div>
                <Border />
                {/*About*/}
                <div className="py-5 flex flex-col gap-6 my-8">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            About
                        </h1>
                    </div>
                    <div className="font-body flex flex-col gap-3 text-md font-light text-white-base">
                        {bio?.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                </div>
                <Border />
                {/* PORTFOLIO */}
                <div className="py-5 flex flex-col gap-6 my-8 relative">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            Portfolio
                        </h1>
                    </div>
                    {individual?.role === "MODEL" ? (
                        <>
                            <div
                                className={`w-full grid ${
                                    individual?.role === "MODEL"
                                        ? "grid-cols-3 gap-x-[7.3rem]"
                                        : "grid-cols-4 gap-6"
                                } justify-items-center`}
                            >
                                {individual?.specialtyInfo?.portfolioPictures &&
                                    individual?.specialtyInfo?.portfolioPictures
                                        .length !== 0 &&
                                    individual?.specialtyInfo?.portfolioPictures.map(
                                        (portfolio, index) => (
                                            <div
                                                key={index}
                                                className={`${
                                                    individual?.role === "MODEL"
                                                        ? "w-[350px] h-full"
                                                        : "col-span-2 h-[220px] w-full"
                                                }`}
                                            >
                                                <div
                                                    className={`relative group max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                                                >
                                                    <img
                                                        className="w-[100%] h-full object-cover"
                                                        src={portfolio}
                                                        alt="profileImage"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            <div className="w-full grid grid-cols-3 gap-x-[7.3rem] justify-items-center">
                                <div className="w-[350px]">
                                    <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                                        <InfoCard
                                            icon={FaTransgender}
                                            value={specialtyInfo?.gender}
                                        />
                                        <InfoCard
                                            icon={RxCalendar}
                                            value={formattedDate}
                                        />
                                        <InfoCard
                                            icon={FaArrowsAltV}
                                            value={`${specialtyInfo?.height} cm`}
                                        />
                                        <InfoCard
                                            icon={GiWeight}
                                            value={`${specialtyInfo?.weight} kg`}
                                        />
                                    </div>
                                </div>
                                <div className="w-[350px]">
                                    <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                                        <InfoCard
                                            icon={FaEarthAmericas}
                                            value={nationalityName}
                                        />
                                        <InfoCard
                                            icon={null}
                                            value={specialtyInfo?.hairColorEnum}
                                            label={
                                                <img
                                                    className="w-[25px]"
                                                    src={blueHeadIcon}
                                                    alt="headIcon"
                                                />
                                            }
                                        />
                                        <InfoCard
                                            icon={IoEyeSharp}
                                            value={specialtyInfo?.eyeColorEnum}
                                        />
                                        <InfoCard
                                            icon={VscColorMode}
                                            value={specialtyInfo?.skinToneEnum}
                                        />
                                    </div>
                                </div>
                                <div className="w-[350px]">
                                    <div className="grid grid-cols-2 w-full gap-x-7">
                                        <div className="col-span-1 flex flex-col gap-[18px]">
                                            <InfoCard
                                                icon={GiRunningShoe}
                                                value={`${specialtyInfo?.shoeSize} cm`}
                                            />
                                            <InfoCard
                                                icon={PiDressBold}
                                                value={`${specialtyInfo?.dressSize} inches`}
                                            />
                                        </div>
                                        <div className="col-span-1 h-full">
                                            <div className="h-full px-[26px] py-[10px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex flex-col items-center justify-center">
                                                <FaTape
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                <div>
                                                    {specialtyInfo?.bust} cm
                                                </div>
                                                X
                                                <div>
                                                    {specialtyInfo?.hips} cm
                                                </div>
                                                X
                                                <div>
                                                    {specialtyInfo?.waist} cm
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={`w-full grid ${
                                    individual?.role === "MODEL"
                                        ? "grid-cols-3 gap-x-[7.3rem]"
                                        : "grid-cols-4 gap-6"
                                } justify-items-center`}
                            >
                                {individual?.specialtyInfo?.portfolioPictures &&
                                    individual?.specialtyInfo?.portfolioPictures
                                        .length !== 0 &&
                                    individual?.specialtyInfo?.portfolioPictures.map(
                                        (portfolio, index) => (
                                            <div
                                                key={index}
                                                className={`${
                                                    individual?.role === "MODEL"
                                                        ? "w-[350px] h-full"
                                                        : "col-span-2 h-[220px] w-full"
                                                }`}
                                            >
                                                <div
                                                    className={`relative group max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                                                >
                                                    <img
                                                        className="w-[100%] h-full object-cover"
                                                        src={portfolio}
                                                        alt="profileImage"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            {/* {individual?.role === "EDITOR" && (
                                <EditorSpecialtyInfo
                                    info={individual?.specialtyInfo}
                                />
                            )} */}
                            {individual?.role === "VIDEOGRAPHER" && (
                                <div className="w-full grid grid-cols-4 gap-4">
                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <MdOutlineCameraAlt
                                            className="text-blue-primary absolute left-[26px] top-[50%] translate-y-[-50%]"
                                            size={30}
                                        />
                                        <p className="text-center grow capitalize">
                                            {individual?.specialtyInfo?.camera}
                                        </p>
                                    </div>

                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 32.8012V7.20117H36V32.8012H4ZM27.96 29.6012L31.64 15.7612L12.12 10.4012L8.44 24.2412L27.96 29.6012Z"
                                                fill="#0C71D7"
                                            />
                                        </svg>
                                        <p className="text-center grow capitalize">
                                            {individual?.specialtyInfo?.camera}
                                        </p>
                                    </div>
                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <path
                                                d="M21.6 8.48047C15.2 8.48047 15.2 31.5205 21.6 31.5205C28 31.5205 36 27.2005 36 20.0005C36 12.8005 28 8.48047 21.6 8.48047ZM21.76 28.3205C21.12 27.6805 20 24.8005 20 20.0005C20 15.2005 21.12 12.3205 21.76 11.6805C26.4 11.8405 32.8 14.7205 32.8 20.0005C32.8 25.2805 26.4 28.1605 21.76 28.3205ZM4 8.80047H16C15.68 9.44047 15.2 10.0805 15.04 11.0405C14.88 11.3605 14.88 11.6805 14.72 12.0005H4V8.80047ZM13.6 18.4005H4V15.2005H13.92C13.76 16.1605 13.76 17.2805 13.6 18.4005ZM14.72 28.0005C15.04 29.2805 15.52 30.2405 16.16 31.2005H4.16V28.0005H14.72ZM13.92 24.8005H4V21.6005H13.6C13.76 22.7205 13.76 23.8405 13.92 24.8005Z"
                                                fill="#0C71D7"
                                            />
                                        </svg>
                                        <p className="text-center grow capitalize">
                                            {
                                                individual?.specialtyInfo
                                                    ?.lightning
                                            }
                                        </p>
                                    </div>
                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                        >
                                            <path
                                                d="M19.6 0.416L19.472 0.352L19.456 0.384C18.336 0.144 17.184 0 16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 8.4 26.704 2.048 19.6 0.416ZM27.856 11.2H15.072L19.408 3.68C23.248 4.736 26.368 7.552 27.856 11.2ZM17.76 3.328L13.232 11.2L11.392 14.4L7.04 6.88C9.42543 4.52114 12.6452 3.19872 16 3.2C16.592 3.2 17.184 3.248 17.76 3.328ZM5.92 8.144L10.464 16L12.304 19.2H3.616C3.36 18.176 3.2 17.104 3.2 16C3.2 13.04 4.224 10.32 5.92 8.144ZM4.144 20.8H16.912L12.576 28.32C10.6904 27.792 8.95043 26.8399 7.48904 25.5366C6.02764 24.2333 4.8835 22.6131 4.144 20.8ZM14.24 28.656L20.624 17.6L24.976 25.12C22.5827 27.4769 19.359 28.7986 16 28.8C15.392 28.8 14.816 28.736 14.24 28.656ZM26.08 23.856L19.68 12.8H28.368C28.64 13.824 28.8 14.896 28.8 16C28.8 18.96 27.776 21.68 26.08 23.856Z"
                                                fill="#0C71D7"
                                            />
                                        </svg>
                                        <p className="text-center grow capitalize">
                                            {individual?.specialtyInfo?.lense}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {individual?.role === "PHOTOGRAPHER" && (
                                <div className="w-full grid grid-cols-4 gap-4">
                                    <div className="col-span-4 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <MdOutlineCameraAlt
                                            className="text-blue-primary absolute left-[26px] top-[50%] translate-y-[-50%]"
                                            size={30}
                                        />
                                        <p className="text-center grow capitalize">
                                            {individual?.specialtyInfo?.camera}
                                        </p>
                                    </div>
                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <path
                                                d="M21.6 8.48047C15.2 8.48047 15.2 31.5205 21.6 31.5205C28 31.5205 36 27.2005 36 20.0005C36 12.8005 28 8.48047 21.6 8.48047ZM21.76 28.3205C21.12 27.6805 20 24.8005 20 20.0005C20 15.2005 21.12 12.3205 21.76 11.6805C26.4 11.8405 32.8 14.7205 32.8 20.0005C32.8 25.2805 26.4 28.1605 21.76 28.3205ZM4 8.80047H16C15.68 9.44047 15.2 10.0805 15.04 11.0405C14.88 11.3605 14.88 11.6805 14.72 12.0005H4V8.80047ZM13.6 18.4005H4V15.2005H13.92C13.76 16.1605 13.76 17.2805 13.6 18.4005ZM14.72 28.0005C15.04 29.2805 15.52 30.2405 16.16 31.2005H4.16V28.0005H14.72ZM13.92 24.8005H4V21.6005H13.6C13.76 22.7205 13.76 23.8405 13.92 24.8005Z"
                                                fill="#0C71D7"
                                            />
                                        </svg>
                                        <p className="text-center grow capitalize">
                                            {
                                                individual?.specialtyInfo
                                                    ?.lightning
                                            }
                                        </p>
                                    </div>
                                    <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                        >
                                            <path
                                                d="M19.6 0.416L19.472 0.352L19.456 0.384C18.336 0.144 17.184 0 16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 8.4 26.704 2.048 19.6 0.416ZM27.856 11.2H15.072L19.408 3.68C23.248 4.736 26.368 7.552 27.856 11.2ZM17.76 3.328L13.232 11.2L11.392 14.4L7.04 6.88C9.42543 4.52114 12.6452 3.19872 16 3.2C16.592 3.2 17.184 3.248 17.76 3.328ZM5.92 8.144L10.464 16L12.304 19.2H3.616C3.36 18.176 3.2 17.104 3.2 16C3.2 13.04 4.224 10.32 5.92 8.144ZM4.144 20.8H16.912L12.576 28.32C10.6904 27.792 8.95043 26.8399 7.48904 25.5366C6.02764 24.2333 4.8835 22.6131 4.144 20.8ZM14.24 28.656L20.624 17.6L24.976 25.12C22.5827 27.4769 19.359 28.7986 16 28.8C15.392 28.8 14.816 28.736 14.24 28.656ZM26.08 23.856L19.68 12.8H28.368C28.64 13.824 28.8 14.896 28.8 16C28.8 18.96 27.776 21.68 26.08 23.856Z"
                                                fill="#0C71D7"
                                            />
                                        </svg>
                                        <p className="text-center grow capitalize">
                                            {individual?.specialtyInfo?.lense}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <Border />
                {/* HEADSHOTS */}
                {individual?.role === "MODEL" && (
                    <>
                        <div className="py-5 flex flex-col gap-6 my-8">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-[38px] font-bold font-display">
                                    Headshots
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 gap-x-[10rem] justify-items-center">
                                {individual?.specialtyInfo?.headShots &&
                                    individual?.specialtyInfo?.headShots !==
                                        0 &&
                                    individual?.specialtyInfo?.headShots.map(
                                        (headShot, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col justify-center items-center gap-6 w-[228px]"
                                            >
                                                <div className="h-full flex flex-col justify-center items-center gap-6 w-[320px]">
                                                    <div className="relative group h-full w-full overflow-hidden rounded-[90px] border-thin border-white-base/30">
                                                        <img
                                                            className="max-w-[100%] h-full object-cover"
                                                            src={headShot}
                                                            alt="profileImage"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                        <Border />
                    </>
                )}
                {/* FULL BODY && REELS */}
                <div className="py-5 flex flex-col gap-6 my-8 h-full">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            {individual?.role === "MODEL" ? (
                                <>Full Body</>
                            ) : (
                                <>TikToks / Reels</>
                            )}
                        </h1>
                    </div>
                    {individual?.role === "MODEL" ? (
                        <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center h-full">
                            {individual?.specialtyInfo?.fullBodyShots &&
                                individual?.specialtyInfo?.fullBodyShots !==
                                    0 &&
                                individual?.specialtyInfo?.fullBodyShots.map(
                                    (fullBody, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center items-center gap-6 w-[230px] min-h-[380px]"
                                        >
                                            <div className="relative group w-full h-full overflow-hidden rounded-md border-thin border-white-base/30">
                                                <img
                                                    className="max-w-[100%] h-full object-cover"
                                                    src={fullBody}
                                                    alt="profileImage"
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center h-full">
                            {individual?.specialtyInfo?.reels &&
                                individual?.specialtyInfo?.reels !== 0 &&
                                individual?.specialtyInfo?.reels.map(
                                    (reel, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center items-center gap-6 w-[230px] min-h-[380px]"
                                        >
                                            <div className="relative group w-full h-full overflow-hidden rounded-md border-thin border-white-base/30">
                                                <img
                                                    className="max-w-[100%] h-full object-cover"
                                                    src={reel}
                                                    alt="reel"
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    )}
                </div>
                <Border />
                {/*Experience*/}
                <div className="py-5 flex flex-col gap-6 my-8">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            Experience & Awards
                        </h1>
                    </div>
                    <div className="flex flex-col gap-3">
                        {individual?.workExperience.map(
                            ({ company, startDate, endDate, title }, idx) => (
                                <div key={idx}>
                                    <span className="text-[20px] font-body font-bold">
                                        {dateFormat(startDate)} -{" "}
                                        {dateFormat(endDate)}{" "}
                                    </span>
                                    <span className="font-normal text-md">
                                        :{" "}
                                        <span className="capitalize">
                                            {title}
                                        </span>{" "}
                                        at{" "}
                                        <span className="capitalize">
                                            {company}
                                        </span>
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default IndividualView;

const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="px-[10px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex items-center">
        <div className="w-[40%] pl-2">
            {Icon ? <Icon className="text-blue-primary" size={30} /> : label}
        </div>
        <div>{value}</div>
    </div>
);
