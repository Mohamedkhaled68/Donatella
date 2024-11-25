import React, { useEffect, useState } from "react";
import { profileFullbody, profileGirl, profileHeadshot } from "../../assets";
import Footer from "../../components/landing/Footer";
import { FiEdit } from "react-icons/fi";
import { FaTransgender } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import { FaArrowsAltV } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useUserStore } from "../../store/userStore";
import { Reviews } from "../../components";
import { splitText } from "../../utils/helpers";

const Profile = () => {
    const [bio, setBio] = useState("");
    const { userStatus } = useUserStore((state) => state);

    const dateFormat = (date) => {
        return new Date(date).getFullYear();
    };

    useEffect(() => {
        console.log(userStatus);
        if (userStatus.organization) {
            const splitedBio = splitText(userStatus.organization.bio, 40);
            setBio(splitedBio);
        } else {
            const splitedBio = splitText(userStatus.individual.bio, 40);
            setBio(splitedBio);
        }
    }, [userStatus]);
    return (
        <>
            <section className="min-h-screen">
                <div className="container mx-auto flex flex-col text-white-base pb-8">
                    <ProfileHeader role={userStatus.role} data={userStatus} />
                    <Border />
                    <div className="py-5 flex flex-col gap-6 my-8">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-[38px] font-bold font-display">
                                About
                            </h1>
                            <FiEdit size={20} />
                        </div>
                        <p className="font-body flex flex-col gap-3 text-md font-light text-white-base">
                            {bio.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </p>
                    </div>
                    <Border />
                    {userStatus.individual && (
                        <>
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Profile
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <div className="grid grid-cols-3 justify-items-center">
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="max-w-full overflow-hidden rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={profileGirl}
                                                alt="profileImage"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaTransgender
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                Female
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <RxCalendar
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                2002
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaArrowsAltV
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                183cm
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <GiWeight
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                70kg
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="max-w-full overflow-hidden rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={profileGirl}
                                                alt="profileImage"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaTransgender
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                Female
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <RxCalendar
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                2002
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaArrowsAltV
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                183cm
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <GiWeight
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                70kg
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="max-w-full overflow-hidden rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={profileGirl}
                                                alt="profileImage"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 w-full gap-x-7 gap-y-[18px]">
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaTransgender
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                Female
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <RxCalendar
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                2002
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <FaArrowsAltV
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                183cm
                                            </div>
                                            <div className="px-[26px] py-[18px] bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body flex justify-center items-center gap-2">
                                                <GiWeight
                                                    className="text-blue-primary"
                                                    size={30}
                                                />
                                                70kg
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Headshots
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <div className="grid grid-cols-3 justify-items-center">
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="w-full overflow-hidden rounded-[90px] border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="w-full overflow-hidden flex justify-center items-center rounded-[90px] border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                            {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                            <FaPlus size={75} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[320px]">
                                        <div className="w-full overflow-hidden flex justify-center items-center rounded-[90px] border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                            {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                            <FaPlus size={75} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Full Body
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <div className="grid grid-cols-4 justify-items-center">
                                    <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                                        <div className="w-full overflow-hidden rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={profileFullbody}
                                                alt="profileImage"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                                        <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                            {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                            <FaPlus size={75} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                                        <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                            {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                            <FaPlus size={75} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-6 w-[228px]">
                                        <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                            {/* <img
                                                className="max-w-[100%] object-cover"
                                                src={profileHeadshot}
                                                alt="profileImage"
                                            /> */}
                                            <FaPlus size={75} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Experience & Awards
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <p className="text-xl font-semibold text-blue-primary">
                                    Add Your Experience & Awards By Clicking The
                                    Edit Button To The Right
                                </p>
                            </div> */}
                            <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Experience & Awards
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <div className="flex flex-col gap-3">
                                    {userStatus.individual?.workExperience?.map(
                                        (
                                            {
                                                company,
                                                startDate,
                                                endDate,
                                                title,
                                            },
                                            idx
                                        ) => (
                                            <div key={idx}>
                                                <span className="text-[20px] font-body font-bold">
                                                    {dateFormat(startDate)} -{" "}
                                                    {dateFormat(endDate)}{" "}
                                                </span>
                                                <span className="font-normal text-md">
                                                    : {title} at {company}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <Border />
                        </>
                    )}
                    <div className="py-5 flex flex-col gap-6 my-8">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-[38px] font-bold font-display">
                                Reviews
                            </h1>
                        </div>
                        <Reviews />
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

const Border = () => {
    return <div className="w-full h-[3.5px] bg-white-base/5 rounded-lg" />;
};

export default Profile;
