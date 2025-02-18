import React, { useEffect, useState } from "react";
import { initialTourismProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const specializations = [
    { id: "Cultural Tourism" },
    { id: "Historical Site Tours" },
    { id: "Archeological Tours" },
    { id: "Religious Tourism" },
    { id: "Local Heritage & Traditions" },
    { id: "Adventure & Ecotourism" },
    { id: "Face & Body Painting" },
];

const TourismProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialTourismProfileFormValues
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

            console.log({
                individualProfile: {
                    role: "TOURISM",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        // profilePicture: [profile],
                        certificates: [certificateProof],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "TOURISM",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        yearsofExperience: 1,
                        // profilePicture: [profile],
                        certificates: [certificateProof],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialTourismProfileFormValues);
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
                    Tourism & Historical Advisor
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <div className="w-[90%] flex flex-col gap-8">
                    {/* What is your specializations */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                What is your specializations{" "}
                                <span className="text-white-base text-sm font-normal italic font-display tracking-widest">
                                    (Select All That Apply)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {specializations.map(({ id }) => {
                                return (
                                    <div
                                        key={id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="specializations"
                                            id={id}
                                            className="cursor-pointer"
                                            onChange={() => {
                                                setFormValues({
                                                    ...formValues,
                                                    specializations: [
                                                        ...formValues.specializations,
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

                    {/* Do you have experience managing travel logistics (transportations, hotels, etc.)? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"experienceManagingTravelLogistics"}
                            >
                                Do you have experience managing travel logistics
                                (transportations, hotels, etc.)?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="experienceManagingTravelLogistics"
                            id="experienceManagingTravelLogistics"
                            onChange={handleSelectInput}
                            value={formValues.experienceManagingTravelLogistics}
                        >
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </motion.div>

                    {/* What is your current or most recent employer?*/}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"currentOrMostRecentEmployer"}
                            >
                                What is your current or most recent employer?
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.currentOrMostRecentEmployer}
                            name={"currentOrMostRecentEmployer"}
                            id={"currentOrMostRecentEmployer"}
                            type={"text"}
                            placeholder={"(Tour Company, Museum, or Freelance)"}
                        />
                    </motion.div>

                    {/* Do you have a valid tour guide licence or any offical certifications? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"license"}
                            >
                                Do you have a valid tour guide licence or any
                                offical certifications?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="license"
                            id="license"
                            onChange={handleSelectInput}
                            value={formValues.license}
                        >
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </motion.div>

                    {/* Do you speak more than one language? */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"otherLanguage"}
                            >
                                Do you speak more than one language?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="otherLanguage"
                            id="otherLanguage"
                            onChange={handleSelectInput}
                            value={formValues.otherLanguage}
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

export default TourismProfileForm;
