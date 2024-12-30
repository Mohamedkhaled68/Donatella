import React, { useEffect, useState } from "react";
import { BackButton, FormButton, TagInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import usePostJob from "../../hooks/jobs/usePostJobs";

const initialJobPostFormValues = {
    title: "",
    jobCategory: "",
    requiredExperience: {
        minimum: "",
        maximum: "",
    },
    careerLevel: "",
    jobDuration: {
        minimum: 1,
        minimumPrefix: "",
        maximum: 2,
        maximumPrefix: "",
    },
    location: "",
    salary: "",
    description: "",
    requirements: "",
    educationLevel: "",
    tags: [],
};

const PostJob = () => {
    const [formValues, setFormValues] = useState(initialJobPostFormValues);
    const [disabled, setDisabled] = useState(true);
    const [tags, setTags] = useState([]);

    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const { userStatus } = useUserStore((state) => state);

    const { mutateAsync } = usePostJob();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

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

        // Convert the value to a number, ensuring it's a valid number
        const numericValue = value ? parseFloat(value) : "";

        // Check if it's a valid number, otherwise, set it to an empty string or a fallback value
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
        console.log({ ...formValues, tags: [...tags] });

        try {
            await mutateAsync({
                ...formValues,
                tags: ["0193e4c8-d9d0-bab9-8db3-fb6723df86c9"],
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (userStatus.role !== "ORGANIZATION") {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== "" && value !== 0
        );

        if (isFilled && check) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues, check]);

    return (
        <section className="w-full h-full">
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
                                <option value="MODEL">Model</option>
                                <option value="PHOTOGRAPHER">
                                    Photographer
                                </option>
                                <option value="VIDEOGRAPHER">
                                    Videographer
                                </option>
                                <option value="EDITOR">Editor</option>
                            </select>
                        </div>

                        {/* Experince Needed */}
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
                                    placeholder="Enter minimum experience"
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
                                    placeholder="Enter maximum experience"
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
                                            placeholder="Minimum Duration"
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
                                            placeholder="Maximum Duration"
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
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formValues.location}
                                onChange={handleInputChange}
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                placeholder="Enter job location"
                            />
                        </div>

                        {/* Salary */}
                        <div className="col-span-2">
                            <label
                                htmlFor="salary"
                                className="text-lg text-white-base font-semibold"
                            >
                                Salary
                            </label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                value={formValues.salary}
                                onChange={handleInputChange}
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                placeholder="Enter job salary"
                            />
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
                                <option value="ASSOCIATE_DEGREE">
                                    Associate Degree
                                </option>
                                <option value="BACHELOR">
                                    Bachelor's Degree
                                </option>
                                <option value="MASTERS">Master's Degree</option>
                                <option value="DOCTORATE">Doctorate</option>
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
                            <input
                                id="description"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                placeholder="Enter job description"
                            />
                        </div>

                        {/* Requirements */}
                        <div className="col-span-4">
                            <label
                                htmlFor="requirements"
                                className="text-lg text-white-base font-semibold"
                            >
                                Requirements
                            </label>
                            <input
                                id="requirements"
                                name="requirements"
                                value={formValues.requirements}
                                onChange={handleInputChange}
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full mt-2"
                                placeholder="Enter job requirements"
                            />
                        </div>
                    </div>
                    <TagInput tags={tags} setTags={setTags} />
                    <div className="flex justify-between items-center mt-[50px]">
                        <div className="flex flex-col gap-7 flex-1">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setCheck(!check)}
                                    className={`w-6 h-6 rounded-[5px] ${
                                        check
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
                        <div className="flex flex-col items-end flex-1 gap-[17px]">
                            <FormButton text={"Next"} disabled={disabled} />
                            <p className="text-right text-sm text-[#64748B]">
                                Don't have an account yet?{" "}
                                <Link className="text-blue-primary" to="/login">
                                    Click here to create one!
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PostJob;
