import React, { useEffect, useState } from "react";
import { profileFullbody, profileGirl, profileHeadshot } from "../../assets";
import Footer from "../../components/landing/Footer";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Rating from "../../components/Rating";
import { FaTransgender } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import { FaArrowsAltV } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import useGetCurrentUser from "../../hooks/auth/useGetCurrentUser";

const Profile = () => {
    const { data: user } = useGetCurrentUser();

    return (
        <>
            <section className="min-h-screen">
                <div className="container mx-auto flex flex-col text-white-base pb-8">
                    <div className="w-full flex justify-around items-center gap-[170px] my-8">
                        <div className="grow-0 self-start">
                            <BiArrowBack
                                className="text-blue-primary font-bold"
                                size={25}
                            />
                        </div>
                        <div className="flex justify-center items-end">
                            <div className="w-[124px] h-[124px] rounded-full bg-slate-400"></div>
                            <FiEdit size={20} />
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-display text-2xl font-black">
                                    Maya Berry
                                </h1>
                                <p className="font-body text-white-base/50 text-base font-light">
                                    Los Angeles, CA, USA
                                </p>
                            </div>
                            <div className="text-base font-light font-body text-center w-[210px] rounded-lg bg-[#197FE540] px-[5px] py-2">
                                Model
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                <Rating />
                                <p className="font-body text-white-base/50 text-base font-light">
                                    0 Projects Completed
                                </p>
                            </div>
                            <div className="text-lg font-bold font-body text-center w-full rounded-[46px] bg-blue-primary px-[35px] py-[15px]">
                                Profile Visibility
                            </div>
                        </div>
                    </div>
                    <Border />
                    <div className="py-5 flex flex-col gap-6 my-8">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-[38px] font-bold font-display">
                                About
                            </h1>
                            <FiEdit size={20} />
                        </div>
                        <p className="font-body text-md font-light text-white-base">
                            As a model, I embrace the art of storytelling
                            through my images. With a flair for creativity and a
                            knack for versatility, I bring life to every
                            concept, whether it’s high fashion or commercial
                            work. I thrive in dynamic settings, adapting to
                            different styles and moods with ease.
                            <br />
                            <br />
                            My journey in modeling is fueled by a passion for
                            self-expression and collaboration, allowing me to
                            connect with photographers and creatives to produce
                            captivating visuals. Each shoot is an opportunity to
                            showcase not just my look, but the unique stories we
                            can tell together through the lens.
                        </p>
                    </div>
                    <Border />
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
                    <Border />
                    <div className="py-5 flex flex-col gap-6 my-8">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-[38px] font-bold font-display">
                                Experience & Awards
                            </h1>
                            <FiEdit size={20} />
                        </div>
                        <p className="text-xl font-semibold text-blue-primary">
                            Add Your Experience & Awards By Clicking The Edit
                            Button To The Right
                        </p>
                    </div>
                    <Border />
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
