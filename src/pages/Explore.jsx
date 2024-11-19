import React, { useState } from "react";
import { Footer, IndividualCard, Navbar } from "../components";
import { IoMenu } from "react-icons/io5";

const activeStyle =
    "bg-white-base px-[77px] py-[17px] text-black text-medium font-bold rounded-xl";
const inActiveStyle =
    "bg-[#27292C] border-2 border-white-base px-[77px] py-[17px] text-white-base text-sm font-light rounded-xl";

const filters = [
    {
        id: "models",
        name: "Models",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "videographers",
        name: "Videographers",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photographers",
        name: "Photographers",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photo & Video Editors",
        name: "Photo & Video Editors",
        activeStyle,
        inActiveStyle,
    },
];

const profiles = [
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
    {
        name: "Lima Johnson",
        region: "Toronto, CA",
        rating: 5,
        price: "54$/HR",
    },
];

const Explore = () => {
    const [filter, setFilter] = useState("models");
    const handleFilter = (id) => {
        setFilter(id);
    };
    return (
        <>
            <section className="min-h-screen mb-10">
                <Navbar />
                <div className="container mx-auto w-full">
                    <div className="flex justify-between items-center my-12">
                        {filters.map((i) => (
                            <button
                                key={i.id}
                                className={`${
                                    filter === i.id
                                        ? i.activeStyle
                                        : i.inActiveStyle
                                }`}
                                onClick={() => handleFilter(i.id)}
                            >
                                {i.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between items-center my-12">
                        <div className="w-full rounded-3xl bg-[#27292C] flex justify-between items-center gap-[55px] px-[39px] py-2">
                            <div className="rounded-lg px-4 py-2 text-white-base border-thin border-white-base flex justify-center items-center gap-2">
                                <IoMenu className="text-white-base" size={22} />
                                <select className="bg-transparent border-none outline-none text-sm font-light">
                                    <option>Filter</option>
                                    <option>kkkkkkk</option>
                                </select>
                            </div>
                            <input
                                className="grow px-[62px] py-2 text-center placeholder:text-white-base/50 placeholder:text-sm placeholder:font-light bg-[#323335] rounded-2xl outline-none border-thin border-black text-white-base"
                                placeholder="Search for a model you want to hire"
                                type="text"
                            />
                            <button className="px-[62px] py-3 border-2 border-blue-primary text-white-base rounded-lg">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-12">
                        {profiles.map((profile) => (
                            <IndividualCard />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Explore;
