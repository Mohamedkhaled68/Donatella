import React, { useEffect, useRef, useState } from "react";
import { initialFashionProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const professionalCategory = [
    { id: "Fashion Stylist" },
    { id: "Jewelry Stylist" },
    { id: "Wardrobe Consultant / Image Consultant" },
    { id: "Runway & Fashion Show Stylist" },
    { id: "Bridal & Occasion Stylist" },
];

const FashionProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialFashionProfileFormValues
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
        const userProfile = JSON.parse(localStorage.getItem("userData"));
        try {
            const profile = imageUrls.profile;
            const certificateProof = imageUrls.certificateProof;
            const previousWork1 = imageUrls.previousWork1;
            const previousWork2 = imageUrls.previousWork2;
            console.log({
                individualProfile: {
                    role: "FASHION",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        // profilePicture: [profile],
                        certificate: [certificateProof],
                        // prevWork: [previousWork1, previousWork2],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "FASHION",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        yearsOfExperience: 1,
                        // profilePicture: [profile],
                        certificate: [certificateProof],
                        // prevWork: [previousWork1, previousWork2],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialFashionProfileFormValues);
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
                    Fashion and Jewelry Stylist
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
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

                    {/* Notable Clients, Brands, or Publications */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"publications"}
                            >
                                Notable Clients, Brands, or Publications
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.publications}
                            name={"publications"}
                            id={"publications"}
                            type={"text"}
                            placeholder={"Oscars, Movies..."}
                        />
                    </motion.div>

                    {/* Do you have a personal styling portfolio or Instagram page showcasing your work?*/}
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
                                Do you have a personal styling portfolio or
                                Instagram page showcasing your work?
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

                    <div className="grid grid-cols-2 gap-x-3">
                        {/* Do you have formal training or certifications in fashion styling? */}
                        <motion.div
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-white-base text-sm font-body font-normal"
                                    htmlFor={"formalTrainingOrCertifications"}
                                >
                                    Do you have formal training or
                                    certifications in fashion styling?
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="formalTrainingOrCertifications"
                                id="formalTrainingOrCertifications"
                                onChange={handleSelectInput}
                                value={
                                    formValues.formalTrainingOrCertifications
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
                                    htmlFor={"workedWithCelebrities"}
                                >
                                    Have you worked with celebrities or
                                    high-profile clients?
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="workedWithCelebrities"
                                id="workedWithCelebrities"
                                onChange={handleSelectInput}
                                value={formValues.workedWithCelebrities}
                            >
                                <option value="">Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </motion.div>
                    </div>
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

export default FashionProfileForm;
