import React, { useEffect, useState } from "react";
import {
    initialPhotographerProfileFormValues,
    photographerProfileFormGroupData,
} from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { motion } from "framer-motion";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";

const PhotographerProfileForm = ({ imageUrls, loading, setLoading, role }) => {
    const [formValues, setFormValues] = useState(
        initialPhotographerProfileFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormValues({ ...formValues, [id]: value });
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
                    role: "PHOTOGRAPHER",
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
                    role: "PHOTOGRAPHER",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        portfolioPictures: [portfolio1, portfolio2],
                        profilePicture: [profile],
                        reels: [reel],
                    },
                },
            });

            return new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setFormValues(initialPhotographerProfileFormValues);
            navigate("/");
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
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="capitalize text-5xl font-display font-bold">
                        Photographer form
                    </h1>
                    <p className="text-gray-400 mt-2 text-md">
                        Create your profile, showcase your skills, and find your
                        next project.
                    </p>
                </div>
                <form
                    className="flex flex-col items-start"
                    onSubmit={handleSubmit}
                >
                    <div className="w-[80%] flex flex-col gap-4">
                        {photographerProfileFormGroupData.map(
                            (
                                {
                                    label,
                                    type,
                                    name,
                                    id,
                                    value,
                                    className,
                                    placeholder,
                                },
                                idx
                            ) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -40, y: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.1,
                                    }}
                                    key={id}
                                    className={
                                        className ? className : "col-span-4"
                                    }
                                >
                                    <FormGroup
                                        label={label}
                                        type={type}
                                        name={name}
                                        id={id}
                                        value={value(formValues)}
                                        onChange={handleInputChange}
                                        placeholder={placeholder}
                                        validate={false}
                                    />
                                </motion.div>
                            )
                        )}
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
        </>
    );
};

export default PhotographerProfileForm;
