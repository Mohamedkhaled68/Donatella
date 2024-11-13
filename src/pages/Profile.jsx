import React from "react";
import { girlImg } from "../assets";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <>
            <section className="min-h-screen">
                <nav className=" w-full py-3 border-b-thin border-white-base">
                    <div className="container mx-auto text-white-base flex justify-between items-center">
                        <Link to="/" className="text-3xl font-display">
                            Donatella
                        </Link>
                        <ul className="flex justify-between items-center font-display text-md gap-5">
                            <li>Messages</li>
                            <li>Payments</li>
                            <li>Explore</li>
                            <li>Profile</li>
                        </ul>
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-full"></div>
                    </div>
                </nav>
                <div className="container mx-auto text-white-base">
                    <div className="py-5 flex flex-col gap-3 border-b-4 border-white-base/30">
                        <h1 className="text-[38px] font-display">About</h1>
                        <p className="font-body text-md text-white-base/50">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Adipisci id quod debitis, eveniet odit optio
                            perspiciatis dolor recusandae aut quaerat, tempore
                            tempora expedita, in ipsam ea ipsum libero. Impedit,
                            illum.
                        </p>
                    </div>
                    <div className="py-5 flex flex-col gap-3">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col justify-center items-center gap-3 ">
                                <div className="max-w-[180px] overflow-hidden rounded-md">
                                    <img
                                        className="max-w-[100%] object-cover"
                                        src={girlImg}
                                        alt=""
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        Female
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        2002
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        183cm
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        83 kg
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-3 ">
                                <div className="max-w-[180px] overflow-hidden rounded-md">
                                    <img
                                        className="max-w-[100%] object-cover"
                                        src={girlImg}
                                        alt=""
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        Female
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        2002
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        183cm
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        83 kg
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-3 ">
                                <div className="max-w-[180px] overflow-hidden rounded-md">
                                    <img
                                        className="max-w-[100%] object-cover"
                                        src={girlImg}
                                        alt=""
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        Female
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        2002
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        183cm
                                    </button>
                                    <button className="px-4 py-2 bg-[#27292C] border-thin border-white-base  text-md">
                                        83 kg
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Profile;
