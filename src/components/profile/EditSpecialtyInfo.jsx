import React, { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { IoCloseSharp } from "react-icons/io5";
import { CountryEnum } from "../../utils/constants";
import { motion } from "framer-motion";

const EditSpecialtyInfo = ({ setIsEditing }) => {
    const userSpecialtyInfo = useUserStore(
        (state) => state.userStatus?.individual?.specialtyInfo || {}
    );

    const [formState, setFormState] = useState({
        gender: userSpecialtyInfo.gender || "",
        birthDate: userSpecialtyInfo.birthDate || "",
        nationality: userSpecialtyInfo.nationality || "",
        height: userSpecialtyInfo.height || "",
        weight: userSpecialtyInfo.weight || "",
        eyeColorEnum: userSpecialtyInfo.eyeColorEnum || "",
        skinToneEnum: userSpecialtyInfo.skinToneEnum || "",
        hairColorEnum: userSpecialtyInfo.hairColorEnum || "",
        dressSize: userSpecialtyInfo.dressSize || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log("Updated Specialty Info:", formState);
    };

    return (
        <motion.div
            initial={{ opacity: 0  }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="bg-[#27292C] p-5 w-[70%] rounded-md left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-[1000]"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-white-base font-display font-bold text-[38px]">
                    Edit Specialty
                </h1>
                <IoCloseSharp
                    className="cursor-pointer"
                    onClick={() => {
                        setIsEditing(false);
                    }}
                    size={25}
                />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                {/* Gender */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="gender"
                        className="text-white-base font-body font-bold"
                    >
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        value={formState.gender}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        <option value="OTHER">Other</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                {/* Birthdate */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="birthDate"
                        className="text-white-base font-body font-bold"
                    >
                        Birthdate
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        value={formState.birthDate}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    />
                </div>
                {/* Nationality */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="nationality"
                        className="text-white-base font-body font-bold"
                    >
                        Nationality
                    </label>
                    <select
                        name="nationality"
                        id="nationality"
                        value={formState.nationality}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(CountryEnum.enums).map(
                            ([label, value]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Other inputs */}
                {["height", "weight", "dressSize"].map((field) => (
                    <div className="flex flex-col gap-2" key={field}>
                        <label
                            htmlFor={field}
                            className="text-white-base font-body font-bold"
                        >
                            {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                            {field === "height"
                                ? "(cm)"
                                : field === "weight"
                                ? "(kg)"
                                : "(inches)"}
                        </label>
                        <input
                            type="number"
                            name={field}
                            id={field}
                            value={formState[field]}
                            onChange={handleChange}
                            className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                        />
                    </div>
                ))}
                {/* Save Button */}
                <button
                    type="submit"
                    className="bg-blue-primary text-white-base font-body font-bold py-3 px-5 rounded-md mt-5 self-end"
                >
                    Save Changes
                </button>
            </form>
        </motion.div>
    );
};

export default EditSpecialtyInfo;
