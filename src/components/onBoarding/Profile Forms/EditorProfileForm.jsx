import React, { useEffect, useState } from "react";
import { initialEditorProfileFormValues } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const EditorProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialEditorProfileFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormValues({ ...formValues, [id]: value });
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        const booleanValue = value === "yes";

        setFormValues({ ...formValues, [id]: booleanValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userProfile = JSON.parse(localStorage.getItem("userData"));
        try {
            const portfolio1 = imageUrls.portfolio1;
            const portfolio2 = imageUrls.portfolio2;
            const profile = imageUrls.profile;
            const reel = imageUrls.reel;

            console.log({
                individualProfile: {
                    role: "EDITOR",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        portfolioPictures: [portfolio1, portfolio2],
                        profilePicture: [profile],
                        reels: [reel],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "EDITOR",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        portfolioPictures: [portfolio1, portfolio2],
                        profilePicture: [profile],
                        reels: [reel],
                    },
                },
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setFormValues(initialEditorProfileFormValues);
        }
    };

    useEffect(() => {
        const isInputsFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        const isImagesFilled = Object.values(imageUrls).every(
            (value) => value !== null
        );

        // const errors = validateForm(formValues);
        // setErrors(errors);

        setDisabled(!isInputsFilled || !isImagesFilled);
    }, [formValues, imageUrls]);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="capitalize text-5xl font-display font-bold">
                    Editor form
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
                                htmlFor={"editingSoftware"}
                            >
                                Main Software owned / used
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.editingSoftware}
                            name={"editingSoftware"}
                            id={"editingSoftware"}
                            type={"text"}
                            placeholder={"Software"}
                        />
                    </motion.div>

                    {/* Color Grading Select */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"colorGrading"}
                            >
                                Do you Offer Color Grading?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="colorGrading"
                            id="colorGrading"
                            value={formValues.colorGrading ? "yes" : "no"} // Ensure it shows 'yes' or 'no'
                            onChange={handleSelectChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </motion.div>

                    {/* Sound Effects Select */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-sm font-body font-normal"
                                htmlFor={"soundEditing"}
                            >
                                Do you Offer Sound Effects?
                            </label>
                        </div>
                        <select
                            className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                            name="soundEditing"
                            id="soundEditing"
                            value={formValues.soundEditing ? "yes" : "no"}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </motion.div>

                    <div className="w-full flex justify-between items-center gap-5">
                        <motion.div
                            className="flex flex-col gap-2 w-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-white-base text-sm font-body font-normal"
                                    htmlFor={"visualEffects"}
                                >
                                    Visual Effects
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="visualEffects"
                                id="visualEffects"
                                value={formValues.visualEffects ? "yes" : "no"}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-2 w-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-white-base text-sm font-body font-normal"
                                    htmlFor={"motionGraphics"}
                                >
                                    Motion Graphics
                                </label>
                            </div>
                            <select
                                className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                                name="motionGraphics"
                                id="motionGraphics"
                                value={formValues.motionGraphics ? "yes" : "no"}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-col mt-10 gap-4">
                    <FormButton
                        text={"Create Account"}
                        disabled={disabled}
                        loading={loading}
                        className={"max-w-[250px] py-4"}
                    />
                    <p className="text-right text-sm text-[#64748B]">
                        Don't have an account yet?{" "}
                        <Link className="text-blue-primary" to="/login">
                            Click here to create one!
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default EditorProfileForm;
