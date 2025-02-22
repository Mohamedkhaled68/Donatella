import React, { useEffect, useState } from "react";
import { initialBeautyProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const experties = [
    { id: "Bridal Makeup" },
    { id: "Special Effects Makeup" },
    { id: "Editorial & Fashion Makeup" },
    { id: "Runway Makeup" },
    { id: "Film & Tv Makeup" },
    { id: "Theatre Makeup" },
    { id: "Face & Body Painting" },
];
const makeupBrands = [
    { id: "MAC Cosmetics" },
    { id: "Fenty Beauty" },
    { id: "Huda Beauty" },
    { id: "NARS" },
    { id: "Dior Beauty" },
    { id: "Other" },
];

const BeautyProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialBeautyProfileFormValues
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
            const certificateProof = imageUrls.certificateProof;
            const previousWork1 = imageUrls.previousWork1;
            const previousWork2 = imageUrls.previousWork2;
            console.log({
                individualProfile: {
                    role: "BEAUTY",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        profilePicture: profile,
                        certificates: [certificateProof],
                        previousWork: [previousWork1, previousWork2],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "BEAUTY",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        profilePicture: profile,
                        certificates: [certificateProof],
                        previousWork: [previousWork1, previousWork2],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialBeautyProfileFormValues);
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
                    Beauty and Cosmetics
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <div className="w-[90%] flex flex-col gap-8">
                    {/* Areas of Experts */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                Areas of Experts{" "}
                                <span className="text-white-base text-sm font-normal italic font-display tracking-widest">
                                    (Select All That Apply)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {experties.map(({ id }) => {
                                return (
                                    <div
                                        key={id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="experties"
                                            id={id}
                                            className="cursor-pointer"
                                            onChange={() => {
                                                setFormValues({
                                                    ...formValues,
                                                    expertise: [
                                                        ...formValues.expertise,
                                                        id,
                                                    ],
                                                });
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

                    {/* Have you worked on high level shoots or events? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"hasHighLevelExperience"}
                            >
                                Have you worked on high level shoots or events?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="hasHighLevelExperience"
                            id="hasHighLevelExperience"
                            onChange={handleSelectInput}
                            value={formValues.hasHighLevelExperience}
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
                                htmlFor={"protofolio"}
                            >
                                Instagram / ArtStation / Behance / Website
                                (links)
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.protofolio}
                            name={"protofolio"}
                            id={"protofolio"}
                            type={"text"}
                            placeholder={"Provide link here"}
                        />
                    </motion.div>

                    {/* preferred Brands */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                Preferred makeup brands you work with
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {makeupBrands.map(({ id }) => {
                                return (
                                    <div
                                        key={id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="preferredBrands"
                                            id={id}
                                            className="cursor-pointer"
                                            onChange={() => {
                                                setFormValues({
                                                    ...formValues,
                                                    preferredBrands: [
                                                        ...formValues.preferredBrands,
                                                        id,
                                                    ],
                                                });
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

                    {/* Have you received formal training in makeup artistry? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"hasFormalTraining"}
                            >
                                Have you received formal training in makeup
                                artistry?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="hasFormalTraining"
                            id="hasFormalTraining"
                            onChange={handleSelectInput}
                            value={formValues.hasFormalTraining}
                        >
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
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

export default BeautyProfileForm;
