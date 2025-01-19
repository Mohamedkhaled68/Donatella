import React, { useState } from "react";
import { dateFormat } from "../../utils/helpers";
import { FiEdit } from "react-icons/fi";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import { useUserStore } from "../../store/userStore";

const Experience = ({ userStatus }) => {
    const [isEditing, setIsEditing] = useState(false); // Toggle form visibility
    const [experience, setExperience] = useState(
        userStatus.individual?.workExperience || []
    );

    const { mutateAsync: updateMe } = useUpdateMe();
    const { setUserStatus } = useUserStore((state) => state);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index][field] = value;
    
        // Validation logic for date fields
        if (field === "startDate" || field === "endDate") {
            const { startDate, endDate } = updatedExperience[index];
            if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
                alert("Start date must be before the end date.");
                return; 
            }
        }
    
        setExperience(updatedExperience);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
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

            console.log("Updated Experience:", experience);
        } catch (err) {
            console.log(err);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="py-5 flex flex-col gap-6 my-8">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-[38px] font-bold font-display">
                    Experience & Awards
                </h1>
                <FiEdit
                    size={20}
                    onClick={handleEditClick}
                    className="cursor-pointer"
                />
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
                            <label className="font-medium text-lg">
                                Experience {index + 1}
                            </label>
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
                                value={exp.startDate}
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
                                value={exp.endDate}
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
                    <div className="flex items-center gap-2">
                        <div
                            onClick={() => setIsEditing(false)}
                            className="cursor-pointer text-center grow px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 grow bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
