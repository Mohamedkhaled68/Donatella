import React, { useEffect, useState } from "react";
import { initialGenericProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const GenericProfileForm = ({ imageUrls, loading, setLoading, role }) => {
    const [formValues, setFormValues] = useState(
        initialGenericProfileFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userProfile = JSON.parse(
            localStorage.getItem("USER_EXPERIENCE_FORM_DATA")
        );
        try {
            const portfolio1 = imageUrls.portfolio1;
            const portfolio2 = imageUrls.portfolio2;
            const profile = imageUrls.profile;

            // Get the category name from localStorage (stored in SelectCategory)
            const categoryName = localStorage.getItem("USER_ROLE") || role;

            await mutateAsync({
                individualProfile: {
                    role: categoryName, // Use category name (not displayName)
                    ...userProfile,
                    specialtyInfo: {
                        description: formValues.description,
                        portfolioPictures: [portfolio1, portfolio2].filter(Boolean),
                        profilePicture: profile,
                    },
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
            setFormValues(initialGenericProfileFormValues);
        }
    };

    useEffect(() => {
        const isInputsFilled = formValues.description !== "";

        const isImagesFilled = imageUrls.profile !== null;

        setDisabled(!isInputsFilled || !isImagesFilled);
    }, [formValues, imageUrls]);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="capitalize text-5xl font-display font-bold">
                    Profile Form
                </h1>
                <p className="text-gray-400 mt-2 text-md">
                    Create your profile, showcase your skills, and find your
                    next project.
                </p>
            </div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <div className="w-[80%] flex flex-col gap-5">
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"description"}
                            >
                                Description / Bio
                            </label>
                        </div>
                        <textarea
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full min-h-[120px] resize-none"
                            name="description"
                            id="description"
                            placeholder="Tell us about yourself, your skills, and experience..."
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </motion.div>
                </div>

                <div className="flex flex-col mt-10 gap-4">
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

export default GenericProfileForm;

