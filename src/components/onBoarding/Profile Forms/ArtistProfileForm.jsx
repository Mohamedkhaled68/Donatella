import React, { useEffect, useState } from "react";
import { initialArtistProfileFormValues } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";
import toast from "react-hot-toast";

const professionalCategory = [
    { id: "Painter" },
    { id: "Sketch Artist / Illustrator" },
    { id: "Mural / Street Artist" },
    { id: "Sculptor / 3D Artist" },
    { id: "Digital Artist (Concept Art, NFT Art, etc)" },
];
const Expertise = [
    { id: "Realism / Hyperrealism" },
    { id: "Abstract / Expressionism" },
    { id: "Surrealism / Fantasy" },
    { id: "Portraits" },
    { id: "Concept Art & Illustration" },
    { id: "Digital Art & NFT Creation" },
];

const FashionProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialArtistProfileFormValues
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
            const previousWork1 = imageUrls.previousWork1;
            const previousWork2 = imageUrls.previousWork2;

            console.log({
                individualProfile: {
                    role: "ARTIST",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        // profilePicture: [profile],
                        previousWork: [previousWork1, previousWork2],
                    },
                },
            });

            await mutateAsync({
                individualProfile: {
                    role: "ARTIST",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        // profilePicture: [profile],
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
            setFormValues(initialArtistProfileFormValues);
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
                    Artists and Visuals
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

                    {/* Notable Exhibitions, Publications, or Awards */}
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
                                Notable Exhibitions, Publications, or Awards
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

                    {/* Have you collaborated with brands or clients?*/}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white-base text-lg font-body font-normal"
                                htmlFor={"previousClients"}
                            >
                                Have you collaborated with brands or clients?
                            </label>
                        </div>
                        <TextInput
                            onChange={handleInputChange}
                            value={formValues.previousClients}
                            name={"previousClients"}
                            id={"previousClients"}
                            type={"text"}
                            placeholder={"Provide link here"}
                        />
                    </motion.div>

                    {/* Artistic style & Expertise (Select up to 3 relevant styles) */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-white-base text-lg font-body font-normal">
                                Artistic style & Expertise{" "}
                                <span className="text-white-base text-sm font-normal italic font-display tracking-widest">
                                    (Select up to 3 relevant styles)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap pl-2">
                            {Expertise.map(({ id }) => {
                                const isChecked =
                                    formValues.expertise.includes(id);

                                return (
                                    <div
                                        key={id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="expertise"
                                            id={id}
                                            className="cursor-pointer"
                                            checked={isChecked}
                                            onChange={() => {
                                                if (isChecked) {
                                                    // Remove from selection
                                                    setFormValues({
                                                        ...formValues,
                                                        expertise:
                                                            formValues.expertise.filter(
                                                                (item) =>
                                                                    item !== id
                                                            ),
                                                    });
                                                } else {
                                                    // Add to selection, but limit to 3
                                                    if (
                                                        formValues.expertise
                                                            .length >= 3
                                                    ) {
                                                        toast.error(
                                                            "You can select up to 3 options."
                                                        );
                                                        return;
                                                    }
                                                    setFormValues({
                                                        ...formValues,
                                                        expertise: [
                                                            ...formValues.expertise,
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

export default FashionProfileForm;
