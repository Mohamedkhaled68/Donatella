import React, { useEffect, useRef, useState } from "react";
import { initialMusicianProfileFormValues } from "../../../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const typeOfClients = [
    { id: "Record Labels & Artists" },
    { id: "Audio Post-Production Specialist" },
    { id: "Croporate Clients & Bussiness" },
    { id: "Event Planners & Concerts" },
    { id: "Advertising & Marketing Agencies" },
];
const professionalCategory = [
    { id: "Music Producer" },
    { id: "Sound Engineer" },
    { id: "Audio Post-Production Specialist" },
    { id: "Composer / Music Arranger" },
    { id: "Voiceover / Podcast Editor" },
    { id: "DJ & Live Performance Engineer" },
];

const MusicianProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialMusicianProfileFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();
    const formRef = useRef(null);

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
        const userProfile = JSON.parse(localStorage.getItem("userData"));
        try {
            const profile = imageUrls.profile;
            console.log({
                individualProfile: {
                    role: "MUSIC_AND_SOUND_ENGINEER",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        profilePicture: [profile],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "MUSIC_AND_SOUND_ENGINEER",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        // profilePicture: [profile],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialMusicianProfileFormValues);
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
                    Music & Sound Engineer
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form
                ref={formRef}
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
            >
                <div className="w-[90%] flex flex-col gap-8">
                    {/* Professional Category */}
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
                                    (Select one)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {professionalCategory.map(({ id }) => (
                                <div
                                    key={id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="professionalCategory"
                                        id={id}
                                        className="cursor-pointer"
                                        onChange={() =>
                                            setFormValues({
                                                ...formValues,
                                                category: [id],
                                            })
                                        }
                                    />
                                    <label
                                        className="select-none capitalize cursor-pointer text-sm"
                                        htmlFor={id}
                                    >
                                        {id}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Have you worked on major projects or with well-known artists? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"majorProjects"}
                            >
                                Have you worked on major projects or with
                                well-known artists?
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.majorProjects}
                            name={"majorProjects"}
                            id={"majorProjects"}
                            type={"text"}
                            placeholder={
                                "(Yes/No - if yes, list names or projects)"
                            }
                        />
                    </motion.div>

                    {/* What type of clients do you prefer working with? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                What type of clients do you prefer working with?
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {typeOfClients.map(({ id }) => (
                                <div
                                    key={id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="typeOfClients"
                                        id={id}
                                        className="cursor-pointer"
                                        onChange={() =>
                                            setFormValues({
                                                ...formValues,
                                                preferWorkingWith: [id],
                                            })
                                        }
                                    />
                                    <label
                                        className="select-none capitalize cursor-pointer text-sm"
                                        htmlFor={id}
                                    >
                                        {id}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-x-3">
                        {/* Do you have experience handling high-profile clients or live events? */}
                        <motion.div
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-white-base text-sm font-body font-normal"
                                    htmlFor={
                                        "experienceHandlingHighProfileClients"
                                    }
                                >
                                    Do you have experience handling high-profile
                                    clients or live events?
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="experienceHandlingHighProfileClients"
                                id="experienceHandlingHighProfileClients"
                                onChange={handleSelectInput}
                                value={
                                    formValues.experienceHandlingHighProfileClients
                                }
                            >
                                <option value="">Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </motion.div>

                        {/* Have your works won any awards or been nominated? */}
                        <motion.div
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-white-base text-sm font-body font-normal"
                                    htmlFor={"wonAwards"}
                                >
                                    Have your works won any awards or been
                                    nominated ?
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="wonAwards"
                                id="wonAwards"
                                onChange={handleSelectInput}
                                value={formValues.wonAwards}
                            >
                                <option value="">Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </motion.div>
                    </div>

                    {/* Share your Instagram / ArtStation / Behance / Website (Links) */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"portfolioUrl"}
                            >
                                Share your Instagram / ArtStation / Behance /
                                Website (Links)
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.portfolioUrl}
                            name={"portfolioUrl"}
                            id={"portfolioUrl"}
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

export default MusicianProfileForm;
