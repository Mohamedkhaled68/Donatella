import React, { useEffect, useState } from "react";
import { initialAthleteProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const professionalCategory = [
    { id: "Proffessional Athlete" },
    { id: "Retired Athlete / Sports Ambassador" },
    { id: "Public Figure / Sports Influencer" },
    { id: "Coach / trainer" },
    { id: "Fitness Blogger" },
    { id: "Health & Wellness Expert" },
    { id: "Body Builder" },
];

const AthleteProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialAthleteProfileFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormValues({ ...formValues, [id]: value });
    };

    const handleSelectInput = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value === "true" ? true : value === "false" ? false : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userProfile = JSON.parse(
            localStorage.getItem("USER_EXPERIENCE_FORM_DATA")
        );
        try {
            const profile = imageUrls.profile;
            const fullbody = imageUrls.fullbody;
            const trophies = imageUrls.trophies;
            console.log({
                individualProfile: {
                    role: "ATHLETE",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        profilePicture: profile,
                        bodyPictures: [fullbody],
                        trophiePictures: [trophies],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "ATHLETE",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        AchievementsOrTitles: [formValues.AchievementsOrTitles],
                        yearsofExperience: 1,
                        profilePicture: profile,
                        bodyPictures: [fullbody],
                        trophiePictures: [trophies],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialAthleteProfileFormValues);
        }
    };

    useEffect(() => {
        const isInputsFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        const isImagesFilled = Object.values(imageUrls).every(
            (value) => value !== null
        );

        setDisabled(!isInputsFilled || !isImagesFilled);
    }, [formValues, imageUrls]);

    return (
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="capitalize text-5xl font-display font-bold">
                    Athletes & Sports Ensuthiast
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <div className="w-[90%] flex flex-col gap-8">
                    {/* Professional Category (Select up to 3 relevant styles) */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                Professional Category{" "}
                                <span className="text-white-base text-sm font-normal italic font-display tracking-widest">
                                    (Select up to 3 relevant category)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {professionalCategory.map(({ id }) => {
                                const isChecked =
                                    formValues.category.includes(id);

                                return (
                                    <div
                                        key={id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="professionalCategory"
                                            id={id}
                                            className="cursor-pointer"
                                            checked={isChecked}
                                            onChange={() => {
                                                if (isChecked) {
                                                    // Remove from selection
                                                    setFormValues({
                                                        ...formValues,
                                                        category:
                                                            formValues.category.filter(
                                                                (item) =>
                                                                    item !== id
                                                            ),
                                                    });
                                                } else {
                                                    // Add to selection, but limit to 3
                                                    if (
                                                        formValues.category
                                                            .length >= 3
                                                    ) {
                                                        toast.error(
                                                            "You can select up to 3 options."
                                                        );
                                                        return;
                                                    }
                                                    setFormValues({
                                                        ...formValues,
                                                        category: [
                                                            ...formValues.category,
                                                            id,
                                                        ],
                                                    });
                                                }
                                            }}
                                        />
                                        <label
                                            className="select-none capitalize cursor-pointer text-sm"
                                            htmlFor={id}
                                        >
                                            {id}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Top Achievements or Titles */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"AchievementsOrTitles"}
                            >
                                Top Achievements or Titles
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.AchievementsOrTitles}
                            name={"AchievementsOrTitles"}
                            id={"AchievementsOrTitles"}
                            type={"text"}
                            placeholder={"Olympics Medalist, FIFA Player"}
                        />
                    </motion.div>

                    {/* Are you affiliated with any clubs, organizations, or brands? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"affiliated"}
                            >
                                Are you affiliated with any clubs,
                                organizations, or brands?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="affiliated"
                            id="affiliated"
                            onChange={handleSelectInput}
                            value={formValues.affiliated}
                        >
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </motion.div>

                    {/* Instagram / ArtStation / Behance / Website (links)*/}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"portfolio"}
                            >
                                Instagram / ArtStation / Behance / Website
                                (links)
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.portfolio}
                            name={"portfolio"}
                            id={"portfolio"}
                            type={"text"}
                            placeholder={"Provide link here"}
                        />
                    </motion.div>
                </div>

                <div className="flex flex-col items-center mt-10 gap-4">
                    <FormButton
                        text={"Create Account"}
                        disabled={disabled}
                        loading={loading}
                        className={"max-w-[250px] py-4"}
                    />
                    <p className="text-right text-sm text-[#64748B]">
                        Already have an account?{" "}
                        <Link className="text-blue-primary" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AthleteProfileForm;
