import React, { useEffect, useState } from "react";
import { Footer, IndividualCard, JobCard } from "../../components";
import { IoMenu } from "react-icons/io5";
import { useUserStore } from "../../store/userStore";

const activeStyle =
    "bg-white-base px-[77px] py-[17px] text-black text-medium font-bold rounded-xl transition-all duration-300";
const inActiveStyle =
    "bg-[#27292C] border-2 border-white-base px-[77px] py-[17px] text-white-base text-sm font-light rounded-xl transition-all duration-300";

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
const orgFilters = [
    {
        id: "modeling",
        name: "Modeling",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "videographing",
        name: "Videographing",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photographing",
        name: "Photographing",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photo & Video Editing",
        name: "Photo & Video Editing",
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

const jobsData = [
    {
        company: "EMG Models",
        location: "New York, USA",
        description:
            "Seeking a Talented Fashion Model for an Urban Photoshoot to Showcase Our Latest Collection",
        rate: "$12/HR",
        duration: "1-2 months",
        tags: ["Fashion", "Photoshoot", "Model", "Urban"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "United Models",
        location: "Los Angeles, USA",
        description:
            "Looking for an Experienced Photographer to Capture the Magic of a Luxury Wedding Celebration",
        rate: "$18/HR",
        duration: "2-3 months",
        tags: ["Wedding", "Photography", "Luxury", "Experience"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Every Inch",
        location: "San Francisco, USA",
        description:
            "Searching for a Creative Model to Bring Our Short Film Vision to Life with Stunning Visuals",
        rate: "$10/HR",
        duration: "1-2 weeks",
        tags: ["Film", "Visuals", "Creativity", "Model"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Vibrant Vision",
        location: "Seattle, USA",
        description:
            "Charismatic Fashion Model for a High-End Photoshoot of Our Exclusive Collection",
        rate: "$20/HR",
        duration: "3 months",
        tags: ["Fashion", "Charisma", "Photoshoot", "High-End"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Capture Dreams",
        location: "Chicago, USA",
        description:
            "Talented Photographer Wanted for a Large-Scale Corporate Event Coverage",
        rate: "$25/HR",
        duration: "2 weeks",
        tags: ["Corporate", "Photography", "Event", "Professional"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Visionary Shoots",
        location: "Miami, USA",
        description: "Lifestyle Photographer for a Casual Beach Photoshoot",
        rate: "$15/HR",
        duration: "1 week",
        tags: ["Lifestyle", "Beach", "Photography", "Relaxed"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Starlight Studios",
        location: "Austin, USA",
        description:
            "Seeking a Unique Model for Our Sci-Fi Inspired Magazine Cover Shoot",
        rate: "$30/HR",
        duration: "1-2 months",
        tags: ["Sci-Fi", "Model", "Magazine", "Unique"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Eventful Moments",
        location: "Boston, USA",
        description:
            "Energetic Photographer Needed for a Marathon Event Coverage",
        rate: "$22/HR",
        duration: "1 week",
        tags: ["Event", "Marathon", "Photography", "Energy"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Classic Capture",
        location: "Dallas, USA",
        description:
            "Experienced Wedding Photographer to Document a Romantic Destination Wedding",
        rate: "$28/HR",
        duration: "1 month",
        tags: ["Wedding", "Photography", "Romantic", "Destination"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Urban Edge",
        location: "Houston, USA",
        description: "Seeking a Male Model for an Edgy Urban Wear Campaign",
        rate: "$18/HR",
        duration: "2 months",
        tags: ["Urban", "Male", "Model", "Fashion"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Sunset Shoots",
        location: "Phoenix, USA",
        description: "Model Needed for a Golden Hour Beach Photoshoot",
        rate: "$15/HR",
        duration: "2 weeks",
        tags: ["Beach", "Golden Hour", "Model", "Photography"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Timeless Tales",
        location: "Orlando, USA",
        description:
            "Looking for an Artistic Photographer to Capture Timeless Moments",
        rate: "$26/HR",
        duration: "3 weeks",
        tags: ["Artistic", "Photography", "Timeless", "Creativity"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Fresh Frames",
        location: "Denver, USA",
        description: "Model Required for a High-Energy Athletic Wear Campaign",
        rate: "$20/HR",
        duration: "1 month",
        tags: ["Athletic", "Energy", "Model", "Campaign"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Elegant Edits",
        location: "Nashville, USA",
        description: "Fashion Photographer Needed for a Runway Show Coverage",
        rate: "$35/HR",
        duration: "1 day",
        tags: ["Runway", "Fashion", "Photography", "Professional"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Modern Muse",
        location: "Portland, USA",
        description:
            "Creative Director and Photographer for a Lifestyle Brand Photoshoot",
        rate: "$40/HR",
        duration: "2 months",
        tags: ["Creative", "Lifestyle", "Photography", "Director"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Golden Glimpse",
        location: "Las Vegas, USA",
        description:
            "Experienced Event Photographer for a Grand Casino Night Event",
        rate: "$30/HR",
        duration: "2 days",
        tags: ["Event", "Casino", "Photography", "Grand"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Vivid Visions",
        location: "San Diego, USA",
        description:
            "Talented Model Needed for a Vibrant Summerwear Collection",
        rate: "$18/HR",
        duration: "3 weeks",
        tags: ["Summer", "Fashion", "Model", "Vibrant"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Prime Pixels",
        location: "Charlotte, USA",
        description:
            "Creative Photographer Required for a Product Photography Session",
        rate: "$25/HR",
        duration: "1 week",
        tags: ["Product", "Photography", "Creative", "Session"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
    {
        company: "Studio Solace",
        location: "San Jose, USA",
        description:
            "Photographer Needed for a Cozy Indoor Lifestyle Photoshoot",
        rate: "$22/HR",
        duration: "1 month",
        tags: ["Lifestyle", "Cozy", "Photography", "Indoor"],
        logo: "https://via.placeholder.com/50",
        rating: 4,
    },
    {
        company: "Cinematic Frames",
        location: "Atlanta, USA",
        description: "Lead Photographer for a Cinematic Short Film Project",
        rate: "$50/HR",
        duration: "2-3 months",
        tags: ["Cinematic", "Film", "Photography", "Lead"],
        logo: "https://via.placeholder.com/50",
        rating: 5,
    },
];

const Explore = () => {
    const [filter, setFilter] = useState("models");
    const [orgFilter, setOrgFilter] = useState("modeling");
    const [jobs, setJobs] = useState(jobsData);
    const { userStatus } = useUserStore((state) => state);
    const handleFilter = (id) => {
        if (userStatus.role === "INDIVIDUAL") {
            setOrgFilter(id);
        } else {
            setFilter(id);
        }
    };

    function haveCommonLetters(word1, word2) {
        // Convert both words to lowercase for case-insensitive comparison
        const prefix1 = word1.toLowerCase().slice(0, 2);
        const prefix2 = word2.toLowerCase().slice(0, 2);

        // Check if the first three letters are equal
        return prefix1 === prefix2;
    }

    useEffect(() => {
        const filteredJobs = jobsData.filter((job) =>
            job.tags.some((tag) => haveCommonLetters(tag, orgFilter))
        );

        setJobs(filteredJobs);
    }, [orgFilter]);

    return (
        <>
            <section className="min-h-screen mb-10">
                <div className="container mx-auto w-full">
                    <div className="flex justify-between items-center my-12">
                        {userStatus.role === "INDIVIDUAL"
                            ? orgFilters.map((i) => (
                                  <button
                                      key={i.id}
                                      className={`${
                                          orgFilter === i.id
                                              ? i.activeStyle
                                              : i.inActiveStyle
                                      }`}
                                      onClick={() => handleFilter(i.id)}
                                  >
                                      {i.name}
                                  </button>
                              ))
                            : filters.map((i) => (
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
                    {userStatus.role === "INDIVIDUAL" ? (
                        <>
                            <div className="flex flex-col gap-5">
                                {jobs.map((job, idx) => (
                                    <JobCard
                                        key={idx}
                                        filter={orgFilter}
                                        job={job}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-5 justify-items-center">
                                {profiles.map((profile, idx) => (
                                    <IndividualCard
                                        key={idx}
                                        filter={filter}
                                        className={
                                            filter === "models"
                                                ? ""
                                                : "col-span-2 min-w-full max-h-[350px]"
                                        }
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Explore;
