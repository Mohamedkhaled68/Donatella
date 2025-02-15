import React, { useEffect, useState } from "react";
import { Footer, IndividualCard, JobCard, Loading } from "../../components";
import { FaAngleDown } from "react-icons/fa6";
import { useUserStore } from "../../store/userStore";
import useGetIndividuals from "../../hooks/explore/useGetIndividuals";
import { motion } from "framer-motion";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { blueHeadIcon } from "../../assets";
import { VscColorMode } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import useGetJobs from "../../hooks/explore/useGetJobs";

const FILTER_OPTIONS = [
    {
        id: 0,
        icon: <IoMaleFemaleSharp color="#197FE5" size={25} />,
        label: "Gender",
        options: [
            { value: "", label: "Gender" },
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "OTHER", label: "Other" },
        ],
    },
    {
        id: 1,
        icon: <img width={25} src={blueHeadIcon} alt="Hair Color Icon" />,
        label: "Hair Color",
        options: [
            { value: "", label: "Hair Color" },
            { value: "BLACK", label: "Black" },
            { value: "BROWN", label: "Brown" },
            { value: "BLONDE", label: "Blonde" },
            { value: "RED", label: "Red" },
        ],
    },
    {
        id: 2,
        icon: <VscColorMode color="#197FE5" size={25} />,
        label: "Tone",
        options: [
            { value: "", label: "Tone" },
            { value: "LIGHT", label: "Light" },
            { value: "MEDIUM", label: "Medium" },
            { value: "DARK", label: "Dark" },
        ],
    },
    {
        id: 3,
        icon: <FaEye color="#197FE5" size={25} />,
        label: "Eye Color",
        options: [
            { value: "", label: "Eye Color" },
            { value: "BLUE", label: "Blue" },
            { value: "GREEN", label: "Green" },
            { value: "BROWN", label: "Brown" },
            { value: "HAZEL", label: "Hazel" },
        ],
    },
    {
        id: 4,
        icon: <GiRunningShoe color="#197FE5" size={25} />,
        label: "Shoe Size",
        options: Array.from({ length: 31 }, (_, i) => ({
            value: i + 20,
            label: `${i + 20} cm`,
        })),
    },
    {
        id: 5,
        icon: <PiDressBold color="#197FE5" size={25} />,
        label: "Dress Size",
        options: Array.from({ length: 11 }, (_, i) => ({
            value: i + 10,
            label: `${i + 10} cm`,
        })),
    },
];

const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: 0 },
    down: { rotate: "180deg" },
};

const activeStyle =
    "bg-white-base text-center w-full xl:py-[17px] py-[15px] text-black text-medium font-bold rounded-xl transition-all duration-300";
const inActiveStyle =
    "bg-[#27292C] text-center  w-full xl:py-[17px] py-[15px] text-white-base text-sm font-light rounded-xl transition-all duration-300 border-2 border-white-base";

const filters = [
    {
        id: "models",
        name: "Models",
        category: "MODEL",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "videographers",
        name: "Videographers",
        category: "VIDEOGRAPHER",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photographers",
        name: "Photographers",
        category: "PHOTOGRAPHER",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photo & Video Editors",
        name: "Photo & Video Editors",
        category: "EDITOR",
        activeStyle,
        inActiveStyle,
    },
];
const orgFilters = [
    {
        id: "modeling",
        name: "Modeling",
        category: "MODEL",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "videographing",
        name: "Videographing",
        category: "VIDEOGRAPHER",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photographing",
        name: "Photographing",
        category: "PHOTOGRAPHER",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "photo & Video Editing",
        name: "Photo & Video Editing",
        category: "EDITOR",

        activeStyle,
        inActiveStyle,
    },
];

const SearchBar = ({
    onSearch,
    setIsOpent,
    isOpen,
    userStatus,
    setLoading,
    cateSwitch,
    setCateSwitch,
}) => {
    return (
        <div className="w-full rounded-3xl bg-[#27292C] grid grid-cols-7 gap-[55px] px-[30px] py-4">
            {userStatus.role !== "INDIVIDUAL" && (
                <div
                    onClick={() => setIsOpent((prev) => !prev)}
                    className="lg:px-[42px] cursor-pointer col-span-1 py-3 flex justify-center gap-[3px] lg:gap-[10px] items-center border-2 border-white-base text-white-base rounded-lg"
                >
                    <p>Filters</p>
                    <motion.div
                        initial="up"
                        animate={isOpen ? "up" : "down"}
                        variants={filterAnimationVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex justify-center items-center"
                    >
                        <FaAngleDown />
                    </motion.div>
                </div>
            )}

            <select
                value={cateSwitch}
                onChange={async (e) => {
                    try {
                        setLoading(true);
                        setCateSwitch(e.target.value);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                        );
                        setLoading(false);
                    } catch (err) {}
                }}
                className="bg-transparent col-span-1 p-3 outline-none border-none text-white-base border border-white-base rounded-md cursor-pointer"
                name="cateSwitch"
                id="cateSwitch"
            >
                <option value="jobs">Jobs</option>
                <option value="profiles">Profiles</option>
            </select>

            <input
                className={`grow px-[62px] py-2 text-center ${
                    userStatus.role === "INDIVIDUAL" && "lg:col-span-5"
                } col-span-4 placeholder:text-white-base/50 placeholder:text-sm placeholder:font-light bg-[#323335] rounded-2xl outline-none border-thin border-black text-white-base`}
                placeholder="Search for a model you want to hire"
                type="text"
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className=" text-center py-3 border-2 col-span-1 border-blue-primary text-white-base rounded-lg">
                Search
            </button>
        </div>
    );
};

const FilterButtons = ({ filters, activeFilter, onFilterChange }) => (
    <div className="grid grid-cols-4 gap-10 justify-items-center my-12">
        {filters.map((filter) => (
            <button
                key={filter.id}
                className={
                    filter.id === activeFilter
                        ? filter.activeStyle
                        : filter.inActiveStyle
                }
                onClick={() => onFilterChange(filter.id)}
            >
                {filter.name}
            </button>
        ))}
    </div>
);

const FilterDropdown = ({ isOpen, filterOptions, onFilterChange }) => (
    <>
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={filterAnimationVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-between items-center mb-12 mt-5 overflow-hidden"
        >
            <div className="w-full rounded-3xl bg-[#27292C] flex justify-between items-center gap-[55px] px-[39px] py-2">
                {filterOptions.map((option) => (
                    <div key={option.id} className="flex items-center">
                        {option.icon}
                        <select
                            className="bg-transparent p-3 outline-none border-none text-white-base"
                            name={option.id}
                            id={option.id}
                            onChange={(e) =>
                                onFilterChange(option.id, e.target.value)
                            }
                        >
                            {option.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </motion.div>
    </>
);

const Explore = () => {
    const [filter, setFilter] = useState("models");
    const [orgFilter, setOrgFilter] = useState("modeling");
    const [openFilter, setOpenFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValues, setFilterValues] = useState({});
    const [data, setData] = useState([]);
    const [cateSwitch, setCateSwitch] = useState("");
    const [loading, setLoading] = useState(false);

    const { userStatus } = useUserStore((state) => state);
    const { mutateAsync: getIndividuals } = useGetIndividuals();
    const { mutateAsync: getJobs } = useGetJobs();

    // Handle filter changes
    const handleFilterChange = (id) => {
        if (userStatus.role === "INDIVIDUAL") {
            setOrgFilter(id);
        } else {
            setFilter(id);
        }
    };

    // Handle advanced filter changes
    const handleAdvancedFilterChange = (filterId, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [filterId]: value,
        }));
    };

    // Fetch data based on user role
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (cateSwitch) {
                try {
                    if (cateSwitch === "jobs") {
                        // Fetch jobs for individuals
                        const filtered = orgFilters.find(
                            (f) => f.id === orgFilter
                        );
                        const jobsData = await getJobs([
                            filtered.category,
                            searchTerm.toLocaleLowerCase(),
                        ]);
                        let filteredJobs = jobsData.items;

                        setData(filteredJobs);
                    } else {
                        // Fetch profiles for organizations
                        const filtered = filters.find((f) => f.id === filter);
                        const profilesData = await getIndividuals([
                            filtered.category,
                            searchTerm.toLocaleLowerCase(),
                        ]);
                        console.log(profilesData);

                        let filteredProfiles = profilesData.items;

                        // Apply advanced filters
                        Object.entries(filterValues).forEach(([key, value]) => {
                            if (value) {
                                filteredProfiles = filteredProfiles.filter(
                                    (profile) =>
                                        profile.specialtyInfo[key] === value
                                );
                            }
                        });

                        setData(filteredProfiles);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [
        filter,
        orgFilter,
        searchTerm,
        filterValues,
        getIndividuals,
        getJobs,
        userStatus.role,
        cateSwitch,
    ]);

    useEffect(() => {
        if (userStatus.role === "INDIVIDUAL") {
            setCateSwitch("jobs");
        } else {
            setCateSwitch("profiles");
        }
    }, [userStatus.role]);

    return (
        <>
            <section className="min-h-screen mb-10">
                <div className="container mx-auto w-full">
                    <FilterButtons
                        filters={
                            userStatus.role === "INDIVIDUAL"
                                ? orgFilters
                                : filters
                        }
                        activeFilter={
                            userStatus.role === "INDIVIDUAL"
                                ? orgFilter
                                : filter
                        }
                        onFilterChange={handleFilterChange}
                    />

                    <div className="flex justify-between items-center mt-12">
                        <SearchBar
                            userStatus={userStatus}
                            setIsOpent={setOpenFilter}
                            onSearch={setSearchTerm}
                            isOpen={openFilter}
                            setLoading={setLoading}
                            cateSwitch={cateSwitch}
                            setCateSwitch={setCateSwitch}
                        />
                    </div>

                    <FilterDropdown
                        isOpen={openFilter}
                        filterOptions={FILTER_OPTIONS}
                        onFilterChange={handleAdvancedFilterChange}
                    />

                    {loading  && (
                        <div className="w-full h-full py-20 flex justify-center items-center">
                            <Loading
                                dimensions={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            />
                        </div>
                    )}

                    {!loading && data.length === 0 && (
                        <div className="w-full h-full py-20 flex justify-center items-center">
                            <div className="text-center">
                                <h1 className="text-2xl text-white-base font-bold font-display">
                                    No{" "}
                                    {userStatus.role === "INDIVIDUAL"
                                        ? "jobs"
                                        : "profiles"}{" "}
                                    found
                                </h1>
                            </div>
                        </div>
                    )}

                    {!loading &&
                        data.length > 0 &&
                        cateSwitch !== "" &&
                        (cateSwitch === "jobs" ? (
                            <div className="flex flex-col gap-5">
                                {data.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        filter={orgFilter}
                                        job={job}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
                                {data.map((profile, idx) => (
                                    <IndividualCard
                                        profile={profile}
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
                        ))}
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Explore;
