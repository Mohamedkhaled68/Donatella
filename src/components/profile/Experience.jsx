import React, { useEffect, useState } from "react";
import { dateFormat } from "../../utils/helpers";
import { FiEdit, FiPlus } from "react-icons/fi";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import { useUserStore } from "../../store/userStore";
import toast from "react-hot-toast";

const formateDate = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const Experience = ({ userStatus, setLoading }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [experience, setExperience] = useState(
        userStatus.individual?.workExperience || []
    );

    const { mutateAsync: updateMe } = useUpdateMe();
    const { setUserStatus } = useUserStore((state) => state);

    const handleEditClick = () => setIsEditing(true);

    const handleInputChange = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index][field] = value;

        // Validate date fields
        if (field === "startDate" || field === "endDate") {
            const { startDate, endDate } = updatedExperience[index];
            if (
                startDate &&
                endDate &&
                new Date(startDate) >= new Date(endDate)
            ) {
                toast.error("Start date must be before the end date.");
                return;
            }
        }

        setExperience(updatedExperience);
    };

    const handleAddExperience = () => {
        setExperience([
            ...experience,
            { title: "", company: "", startDate: "", endDate: "" },
        ]);
        if (!isEditing) setIsEditing(true);
    };

    const handleRemoveExperience = (index) => {
        const updatedExperience = experience.filter((_, i) => i !== index);
        setExperience(updatedExperience);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { firstName, lastName, fullName, ...rest } =
                userStatus.individual;

            await updateMe({ ...rest, workExperience: [...experience] });

            setUserStatus({
                ...userStatus,
                individual: {
                    ...userStatus.individual,
                    workExperience: [...experience],
                },
            });

            setIsEditing(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isExperienceComplete = (ex) => {
            return ex.every(
                ({ title, company, startDate, endDate }) =>
                    title.trim() !== "" &&
                    company.trim() !== "" &&
                    startDate.trim() !== "" &&
                    endDate.trim() !== ""
            );
        };

        if (isEditing && isExperienceComplete(experience)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [experience, isEditing]);

    return (
        <div className="py-5 flex flex-col gap-6 my-8">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-[38px] font-bold font-display">
                    Experience & Awards
                </h1>
                <div className="flex items-center gap-4">
                    <FiPlus
                        size={20}
                        onClick={handleAddExperience}
                        className="cursor-pointer"
                    />
                    <FiEdit
                        size={20}
                        onClick={handleEditClick}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            {!isEditing ? (
                <div className="flex flex-col gap-3">
                    {experience.map(
                        ({ company, startDate, endDate, title }, idx) => (
                            <div key={idx}>
                                <span className="text-[20px] font-body font-bold">
                                    {dateFormat(startDate)} -{" "}
                                    {dateFormat(endDate)}{" "}
                                </span>
                                <span className="font-normal text-md">
                                    :{" "}
                                    <span className="capitalize">{title}</span>{" "}
                                    at{" "}
                                    <span className="capitalize">
                                        {company}
                                    </span>
                                </span>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4"
                >
                    {experience.map((exp, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-lg">
                                    Experience {index + 1}
                                </label>
                                {experience.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveExperience(index)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={exp.title}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "company",
                                        e.target.value
                                    )
                                }
                                className="p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                placeholder="Start Date"
                                value={
                                    exp.startDate
                                        ? formateDate(exp.startDate)
                                        : ""
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "startDate",
                                        e.target.value
                                    )
                                }
                                className="p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                placeholder="End Date"
                                value={
                                    exp.endDate ? formateDate(exp.endDate) : ""
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                                className="p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    {/* <div className="flex items-center gap-2 mt-4">
                        <button
                            type="button"
                            onClick={handleAddExperience}
                            className="px-4 py-2 grow bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Add Another Experience
                        </button>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <div
                            onClick={() => {
                                setIsEditing(false);
                                setExperience(
                                    userStatus.individual.workExperience
                                );
                            }}
                            className="cursor-pointer text-center grow px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </div>
                        <button
                            type="submit"
                            disabled={disabled}
                            className="px-4 py-2 grow bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Experience;
