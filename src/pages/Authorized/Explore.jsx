import React, { useEffect, useState } from "react";
import {
    FilterButtons,
    FilterDropdown,
    Footer,
    IndividualCard,
    JobCard,
    Loading,
    SearchContainer,
} from "../../components";
import { useUserStore } from "../../store/userStore";
import useGetIndividuals from "../../hooks/explore/useGetIndividuals";
import useGetJobs from "../../hooks/explore/useGetJobs";
import toast from "react-hot-toast";

const Explore = () => {
    const [filter, setFilter] = useState("MODEL");
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [cateSwitch, setCateSwitch] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    const { userStatus } = useUserStore((state) => state);
    const { mutateAsync: getIndividuals } = useGetIndividuals();
    const { mutateAsync: getJobs } = useGetJobs();

    // Handle advanced filter changes
    const handleAdvancedFilterChange = (filterId, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [filterId]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (cateSwitch) {
                try {
                    if (cateSwitch === "jobs") {
                        const jobsData = await getJobs([
                            filter,
                            searchTerm.trim(),
                        ]);
                        let filteredJobs = jobsData.items;

                        setData(filteredJobs);
                    } else {
                        const profilesData = await getIndividuals([
                            filter,
                            searchTerm.trim(),
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
                    toast.error(
                        error?.response?.data?.message || "Error fetching data"
                    );
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [filter, searchTerm, filterValues, cateSwitch]);

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
                    {cateSwitch && (
                        <FilterButtons setFilter={setFilter} filter={filter} />
                    )}

                    <div className="flex justify-between items-center mt-12">
                        <SearchContainer
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
                        onFilterChange={handleAdvancedFilterChange}
                    />

                    {loading && (
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
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
                                {data.map((profile, idx) => (
                                    <IndividualCard
                                        profile={profile}
                                        key={idx}
                                        className={
                                            filter === "MODEL"
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
