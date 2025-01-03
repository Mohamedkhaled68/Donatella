import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const WorkExperienceForm = ({
    setModal,
    workExperience,
    setWorkExperience,
}) => {
    const [validationErrors, setValidationErrors] = useState([]);

    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };

    const handleInputChange = (index, field, value) => {
        const updatedExperience = [...workExperience];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [field]: value || "",
        };

        const newErrors = validationErrors.filter((err) => err.index !== index);
        setValidationErrors(newErrors);

        setWorkExperience(updatedExperience);
    };

    const handleUntilNowChange = (index) => {
        const updatedExperience = [...workExperience];
        const currentExperience = updatedExperience[index];

        // Set endDate to today's date if "Until Now" is checked, otherwise reset it.
        updatedExperience[index] = {
            ...currentExperience,
            endDate: currentExperience.endDate ? "" : getTodayDate(),
        };

        setWorkExperience(updatedExperience);
    };

    const handleAddExperience = () => {
        setWorkExperience([
            ...workExperience,
            {
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                // No "untilNow" field added
            },
        ]);
    };

    const handleRemoveExperience = (index) => {
        const updatedExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(updatedExperience);

        const newErrors = validationErrors.filter((err) => err.index !== index);
        setValidationErrors(newErrors);
    };

    const validateDates = () => {
        const errors = [];

        workExperience.forEach((experience, index) => {
            if (!experience.startDate) {
                errors.push({
                    index,
                    message: "Start date is required",
                });
                return;
            }

            if (!experience.endDate) {
                errors.push({
                    index,
                    message: "End date is required if 'Until Now' is not checked",
                });
            } else {
                const start = new Date(experience.startDate);
                const end = new Date(experience.endDate);

                if (start >= end) {
                    errors.push({
                        index,
                        message: "Start date must be before end date",
                    });
                }
            }
        });

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateDates()) {
            console.log("Submitted Work Experience:", workExperience);
            setModal(false);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3, delay: 0.1 },
            }}
            transition={{ duration: 0.2 }}
            className="absolute w-full min-h-full flex justify-center z-[10000] items-center bg-black/50 py-10"
        >
            <motion.form
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-8 max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md"
            >
                <div className="grid grid-cols-3">
                    <div
                        onClick={() => setModal(false)}
                        className="w-[40px] h-[40px] flex justify-center items-center rounded-full p-2 hover:bg-white-base/30 transition-all duration-300 cursor-pointer"
                    >
                        <IoClose size={25} />
                    </div>
                    <h2 className="text-3xl font-bold font-display text-center">
                        Work Experience
                    </h2>
                </div>
                {workExperience.map((experience, index) => (
                    <div
                        key={index}
                        className="relative border border-gray-700 bg-gray-800 p-6 rounded-md shadow-sm space-y-4"
                    >
                        {workExperience.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveExperience(index)}
                                className="absolute top-2 right-2 text-white-base cursor-pointer hover:bg-white-base/30 transition-all duration-300"
                            >
                                <IoClose size={20} />
                            </button>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Job Title
                            </label>
                            <input
                                type="text"
                                value={experience.title || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter job title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                value={experience.company || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "company",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={experience.startDate || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "startDate",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-2">
                                    End Date
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        value={experience.endDate || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "endDate",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md bg-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex items-center w-full p-3 rounded-md bg-gray-700 text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`untilNow-${index}`}
                                            checked={!!experience.endDate && experience.endDate === getTodayDate()}
                                            onChange={() => handleUntilNowChange(index)}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`untilNow-${index}`}
                                            className="text-sm cursor-pointer"
                                        >
                                            Until Now
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {validationErrors.map(
                            (error) =>
                                error.index === index && (
                                    <div
                                        key={`error-${index}`}
                                        className="text-red-500 text-sm mt-2"
                                    >
                                        {error.message}
                                    </div>
                                )
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md transition"
                >
                    Add More Experience
                </button>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition"
                >
                    Submit
                </button>
            </motion.form>
        </motion.div>
    );
};

export default WorkExperienceForm;


