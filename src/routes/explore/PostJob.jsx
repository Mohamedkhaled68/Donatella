import React, { useEffect, useState } from "react";
import { BackButton, FormButton, Loading, TagInput } from "../../components";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import usePostJob from "../../hooks/jobs/usePostJobs";
import useGetTags from "../../hooks/explore/useGetTags";
import { useGetEnabledCategories } from "../../hooks/explore/useGetEnabledCategories";
import { CountryEnum, initialJobPostFormValues } from "../../utils/constants";
import { isValidDurationRange } from "../../utils/helpers";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const initialRequirements = [
    {
        id: "requirement-1",
        content: "",
    },
    {
        id: "requirement-2",
        content: "",
    },
    {
        id: "requirement-3",
        content: "",
    },
    {
        id: "requirement-4",
        content: "",
    },
];

const RequirementsWindow = ({ formValues, setFormValues, setInputWindow }) => {
    const [requirements, setRequirements] = useState(initialRequirements);
    const [disabled, setDisabled] = useState(false);

    const handleInputsChange = (e) => {
        const { id, value } = e.target;
        const index = parseInt(id.split("-")[1]) - 1; // Extract index from id

        setRequirements((prevRequirements) =>
            prevRequirements.map((requirement, i) =>
                i === index ? { ...requirement, content: value } : requirement
            )
        );
    };
    const handleSubmit = () => {
        setFormValues({
            ...formValues,
            requirements: JSON.stringify(requirements),
        });
    };

    useEffect(() => {
        const isFilled = requirements.every(
            (requirement) => requirement.content
        );
        if (isFilled) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [requirements]);

    useEffect(() => {
        if (formValues.requirements) {
            const reqs = JSON.parse(formValues.requirements);
            setRequirements(reqs);
        }
    }, []);

    return (
        <>
            <div className="w-[50%] mx-auto rounded-md bg-gray-900 p-8 text-white-base">
                <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
                    <label htmlFor="description" className="text-xl">
                        Add Requirements
                    </label>

                    {requirements.map((requirement, index) => (
                        <input
                            key={requirement.id}
                            onChange={handleInputsChange}
                            value={requirement.content}
                            className="w-full my-3 rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id={`requirement-${index + 1}`}
                        />
                    ))}

                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => {
                                setInputWindow({ status: false, type: "" });
                            }}
                            className={`bg-red-500 button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                handleSubmit();
                                setInputWindow({ status: false, type: "" });
                            }}
                            disabled={disabled}
                            className={`${disabled
                                    ? "cursor-not-allowed bg-[#494B4E] pointer-events-none"
                                    : "bg-blue-primary"
                                } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
const DescriptionWindow = ({
    formValues,
    handleInputChange,
    setInputWindow,
}) => {
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        if (formValues.description) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues.description]);
    return (
        <>
            <div className="w-[50%] mx-auto rounded-md bg-gray-900 p-8 text-white-base">
                <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
                    <label htmlFor="description" className="text-xl slef-start">
                        Add Description
                    </label>
                    <textarea
                        className="w-full my-3 rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={formValues.description}
                        onChange={handleInputChange}
                        placeholder="Enter job description"
                    ></textarea>
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => {
                                setInputWindow({ status: false, type: "" });
                            }}
                            className={`bg-red-500 button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                setInputWindow({ status: false, type: "" });
                            }}
                            disabled={disabled}
                            className={`${disabled
                                    ? "cursor-not-allowed bg-[#494B4E] pointer-events-none"
                                    : "bg-blue-primary"
                                } button text-white-base px-[72px] py-3 text-medium font-semibold transition-colors cursor-pointer duration-200`}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const PostJob = () => {
    const [formValues, setFormValues] = useState(initialJobPostFormValues);
    const [tags, setTags] = useState([]);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [check, setCheck] = useState(false);
    const [inputWindow, setInputWindow] = useState({ status: false, type: "" });
    const [noFixedSalary, setNoFixedSalary] = useState(false);

    const navigate = useNavigate();
    const { userStatus } = useUserStore((state) => state);

    const { mutateAsync } = usePostJob();
    const { mutateAsync: getTags } = useGetTags();
    const { data: categories, isLoading: categoriesLoading } = useGetEnabledCategories();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== "salary") {
            if (Number(value)) {
                toast.error(`Please include charachters in ${name} field `);
                return;
            }
        }
        // Explicitly check for an empty string
        const parsedValue =
            value === "" ? "" : isNaN(value) ? value : Number(value);
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: parsedValue,
        }));
    };

    const handleNumberInputChange = (e, field) => {
        const { name, value } = e.target;
        const numericValue = value ? parseFloat(value) : "";
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: {
                ...prevValues[field],
                [name]: isNaN(numericValue) ? "" : numericValue,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (
                formValues.requiredExperience.minimum >
                formValues.requiredExperience.maximum
            ) {
                toast.error(
                    "Minimum experience should be less than maximum experience"
                );
                setCheck(false);
                setFormValues({
                    ...formValues,
                    requiredExperience: {
                        minimum: "",
                        maximum: "",
                    },
                });
                return;
            }

            // Add the new duration validation
            if (
                !isValidDurationRange(
                    formValues.jobDuration.minimum,
                    formValues.jobDuration.minimumPrefix,
                    formValues.jobDuration.maximum,
                    formValues.jobDuration.maximumPrefix
                )
            ) {
                toast.error(
                    "Invalid duration range. Please check your minimum and maximum durations."
                );
                setCheck(false);
                setFormValues({
                    ...formValues,
                    jobDuration: {
                        minimum: 1,
                        minimumPrefix: "",
                        maximum: 2,
                        maximumPrefix: "",
                    },
                });
                return;
            }

            const submitData = { ...formValues, tags: selectedTags };
            // If no fixed salary is selected, don't send salary field
            if (noFixedSalary) {
                delete submitData.salary;
            }
            console.log(submitData);
            await mutateAsync(submitData);
            setFormValues(initialJobPostFormValues);
            setSelectedTags([]);
            toast.success("Job posted successfully");
            navigate("/");
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setCheck(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getTagsFunc = async () => {
            try {
                const data = await getTags();
                setTags(data);
            } catch (err) {
                console.log(err);
            }
        };

        getTagsFunc();
    }, [isInputVisible]);

    useEffect(() => {
        if (userStatus.role !== "ORGANIZATION") {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const isFilled = Object.entries(formValues).every(([key, value]) => {
            // Skip salary validation if noFixedSalary is true
            if (key === "salary" && noFixedSalary) {
                return true;
            }
            return value !== "" && value !== 0;
        });
        if (
            isFilled &&
            check &&
            !loading &&
            selectedTags.length !== 0 &&
            formValues.jobDuration.maximumPrefix !== "" &&
            formValues.jobDuration.minimumPrefix !== "" &&
            (noFixedSalary || formValues.salary !== "")
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues, check, selectedTags, noFixedSalary]);

    useEffect(() => {
        if (inputWindow.status) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [inputWindow.status]);

    return (
        <section className="relative w-full h-full">
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1000] flex justify-center items-center">
                    <Loading />
                </div>
            )}
            {inputWindow.status && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { duration: 0.3 } }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1000] flex justify-center items-center"
                >
                    {inputWindow.type === "description" && (
                        <DescriptionWindow
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            setInputWindow={setInputWindow}
                        />
                    )}
                    {inputWindow.type === "requirements" && (
                        <RequirementsWindow
                            formValues={formValues}
                            setInputWindow={setInputWindow}
                            setFormValues={setFormValues}
                        />
                    )}
                </motion.div>
            )}

            <div className="container mx-auto py-5">
                <div className="w-full grid grid-cols-3">
                    <BackButton />
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="text-5xl font-bold text-white-base font-display">
                            Post a Job
                        </h1>
                        <p className="text-md font-light text-white-base/50 font-body w-[80%] mx-auto text-center">
                            Highlight your specialty to attract the right
                            collaborations.
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-8 gap-4 pt-8">
                        {/* Job Title */}
                        <div className="col-span-2">
                            <label
                                htmlFor="title"
                                className="text-lg text-white-base font-semibold"
                            >
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formValues.title}
                                onChange={handleInputChange}
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                placeholder="Enter job title"
                            />
                        </div>

                        {/* Job Category */}
                        <div className="col-span-2">
                            <label
                                htmlFor="jobCategory"
                                className="text-lg text-white-base font-semibold"
                            >
                                Job Category
                            </label>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                value={formValues.jobCategory}
                                onChange={handleInputChange}
                                name="jobCategory"
                                id="jobCategory"
                            >
                                <option value="">Choose a category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.displayName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Experience Needed */}
                        <div className="col-span-2 self-end">
                            <label
                                htmlFor="jobCategory"
                                className="text-lg text-white-base font-semibold"
                            >
                                Experience Needed
                            </label>
                            <div className="rounded-[28px] flex items-center justify-center gap-3 h-fit self-end border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body mt-2">
                                <input
                                    type="number"
                                    id="minimum"
                                    name="minimum"
                                    value={
                                        formValues.requiredExperience.minimum
                                    }
                                    onChange={(e) =>
                                        handleNumberInputChange(
                                            e,
                                            "requiredExperience"
                                        )
                                    }
                                    className="rounded-[28px] px-[18px] py-[14px] outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                    placeholder="Min Years"
                                />
                                <span>~</span>
                                <input
                                    type="number"
                                    id="maximum"
                                    name="maximum"
                                    value={
                                        formValues.requiredExperience.maximum
                                    }
                                    onChange={(e) =>
                                        handleNumberInputChange(
                                            e,
                                            "requiredExperience"
                                        )
                                    }
                                    className="rounded-[28px] px-[18px] py-[14px] outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                    placeholder="Max Years"
                                />
                            </div>
                        </div>

                        {/* Job Duration */}
                        <div className="col-span-2 self-end">
                            <label
                                htmlFor="jobDuration"
                                className="text-lg text-white-base font-semibold"
                            >
                                Job Duration
                            </label>
                            <div className="rounded-[28px] flex items-center gap-3 h-fit self-end border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body mt-2">
                                <div className="flex items-center w-full gap-3">
                                    {/* Minimum Duration Input */}
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            id="minimum"
                                            name="minimum"
                                            value={
                                                formValues.jobDuration.minimum
                                            }
                                            onChange={(e) =>
                                                handleNumberInputChange(
                                                    e,
                                                    "jobDuration"
                                                )
                                            }
                                            className="px-[10px] py-[14px] outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                            placeholder="Min Duration"
                                        />
                                    </div>

                                    {/* Duration Prefix */}
                                    <div className="flex-1">
                                        <select
                                            value={
                                                formValues.jobDuration
                                                    .minimumPrefix
                                            }
                                            name="minimumPrefix"
                                            id="minimumPrefix"
                                            onChange={(e) => {
                                                setFormValues({
                                                    ...formValues,
                                                    jobDuration: {
                                                        ...formValues.jobDuration,
                                                        minimumPrefix:
                                                            e.target.value,
                                                    },
                                                });
                                            }}
                                            className=" outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                        >
                                            <option value="">Unit</option>
                                            <option value="YEAR">Year</option>
                                            <option value="MONTH">Month</option>
                                            <option value="WEEK">Week</option>
                                            <option value="DAY">Day</option>
                                        </select>
                                    </div>
                                </div>
                                <span className="">~</span>
                                <div className="flex items-center w-full gap-3">
                                    {/* Maximum Duration Input */}
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            id="maximum"
                                            name="maximum"
                                            value={
                                                formValues.jobDuration.maximum
                                            }
                                            onChange={(e) =>
                                                handleNumberInputChange(
                                                    e,
                                                    "jobDuration"
                                                )
                                            }
                                            className="rounded-[28px] px-[18px] py-[14px] outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                            placeholder="Max Duration"
                                        />
                                    </div>

                                    {/* Duration Prefix */}
                                    <div className="flex-1">
                                        <select
                                            value={
                                                formValues.jobDuration
                                                    .maximumPrefix
                                            }
                                            name="maximumPrefix"
                                            id="maximumPrefix"
                                            onChange={(e) => {
                                                setFormValues({
                                                    ...formValues,
                                                    jobDuration: {
                                                        ...formValues.jobDuration,
                                                        maximumPrefix:
                                                            e.target.value,
                                                    },
                                                });
                                            }}
                                            className="outline-none bg-transparent text-[#94A3B8] text-medium font-body w-full"
                                        >
                                            <option value="">Unit</option>
                                            <option value="YEAR">Year</option>
                                            <option value="MONTH">Month</option>
                                            <option value="WEEK">Week</option>
                                            <option value="DAY">Day</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Career Level */}
                        <div className="col-span-2">
                            <label
                                htmlFor="careerLevel"
                                className="text-lg text-white-base font-semibold"
                            >
                                Career Level
                            </label>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                value={formValues.careerLevel}
                                onChange={handleInputChange}
                                name="careerLevel"
                                id="careerLevel"
                            >
                                <option value="">Choose a career level</option>
                                <option value="ENTRY_LEVEL">Entry Level</option>
                                <option value="MID_LEVEL">Mid-Level</option>
                                <option value="SENIOR_LEVEL">Senior</option>
                            </select>
                        </div>

                        {/* Job Location */}
                        <div className="col-span-2">
                            <label
                                htmlFor="location"
                                className="text-lg text-white-base font-semibold"
                            >
                                Location
                            </label>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                value={formValues.location}
                                onChange={handleInputChange}
                                name="location"
                                id="location"
                            >
                                <option value="">Select Country</option>
                                {Object.entries(CountryEnum.enums).map(
                                    ([country, code]) => (
                                        <option key={code} value={code}>
                                            {country
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Salary */}
                        <div className="col-span-2">
                            <label
                                htmlFor="salary"
                                className="text-lg text-white-base font-semibold"
                            >
                                Salary
                            </label>
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={formValues.salary}
                                    onChange={handleInputChange}
                                    disabled={noFixedSalary}
                                    className={`rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full ${noFixedSalary ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    placeholder="Job Salary in SAR"
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div
                                    onClick={() => {
                                        setNoFixedSalary(!noFixedSalary);
                                        if (!noFixedSalary) {
                                            setFormValues({
                                                ...formValues,
                                                salary: "",
                                            });
                                        }
                                    }}
                                    className={`w-5 h-5 rounded-[5px] ${noFixedSalary
                                            ? "bg-blue-primary"
                                            : "bg-white-base/50"
                                        } flex justify-center items-center transition-colors cursor-pointer duration-200`}
                                >
                                    <FaCheck className="text-white-base" />
                                </div>
                                <label
                                    htmlFor="noFixedSalary"
                                    className="text-sm text-white-base/70 font-medium cursor-pointer"
                                    onClick={() => {
                                        setNoFixedSalary(!noFixedSalary);
                                        if (!noFixedSalary) {
                                            setFormValues({
                                                ...formValues,
                                                salary: "",
                                            });
                                        }
                                    }}
                                >
                                    Let talent specify cost in proposal
                                </label>
                            </div>
                        </div>

                        {/* Education Level */}
                        <div className="col-span-2">
                            <label
                                htmlFor="educationLevel"
                                className="text-lg text-white-base font-semibold"
                            >
                                Education Level
                            </label>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                value={formValues.educationLevel}
                                onChange={handleInputChange}
                                name="educationLevel"
                                id="educationLevel"
                            >
                                <option value="">
                                    Choose your education level
                                </option>
                                <option value="HIGH_SCHOOL">High School</option>

                                <option value="BACHELOR">
                                    Bachelor's Degree
                                </option>
                                <option value="OTHER">Other Degree</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="col-span-4">
                            <label
                                htmlFor="description"
                                className="text-lg text-white-base font-semibold"
                            >
                                Description
                            </label>
                            <button
                                onClick={() =>
                                    setInputWindow({
                                        ...inputWindow,
                                        status: true,
                                        type: "description",
                                    })
                                }
                                type="button"
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-white-base text-medium text-center font-body px-[18px] py-[14px] w-full mt-2 hover:bg-blue-primary duration-300"
                            >
                                Add Description
                            </button>
                        </div>

                        {/* Requirements */}
                        <div className="col-span-4">
                            <label
                                htmlFor="requirements"
                                className="text-lg text-white-base font-semibold"
                            >
                                Requirements
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    setInputWindow({
                                        ...inputWindow,
                                        status: true,
                                        type: "requirements",
                                    })
                                }
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-white-base text-medium text-center font-body px-[18px] py-[14px] w-full mt-2 hover:bg-blue-primary duration-300"
                            >
                                Add Requirements
                            </button>
                        </div>
                    </div>
                    <TagInput
                        isInputVisible={isInputVisible}
                        setIsInputVisible={setIsInputVisible}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        tags={tags}
                    />
                    <div className="flex justify-between items-center mt-[50px]">
                        <div className="flex flex-col gap-7 flex-1">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setCheck(!check)}
                                    className={`w-6 h-6 rounded-[5px] ${check
                                            ? "bg-blue-primary"
                                            : "bg-white-base/50"
                                        } flex justify-center items-center transition-colors cursor-pointer duration-200`}
                                >
                                    <FaCheck className="text-white-base" />
                                </div>
                                <h1 className="text-[#64748B] text-base font-medium">
                                    I Agree To These Terms And Services.
                                </h1>
                            </div>
                            <p className="text-sm text-[#64748B] font-extralight">
                                I affirm that the information provided in this
                                application is accurate and complete to the best
                                of my knowledge, and that any falsification or
                                omission may result in disqualification from the
                                platform.
                            </p>
                        </div>
                        <div className="flex flex-col items-end flex-1 gap-[17px] pb-5">
                            <FormButton
                                text={"Post Job"}
                                disabled={disabled || loading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PostJob;
