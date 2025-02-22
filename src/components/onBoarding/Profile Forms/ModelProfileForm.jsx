import React, { useEffect, useState } from "react";
import {
    initialModelProfileFormValues,
    modelProfileFormGroupData,
    onBoardingEnums,
} from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import toast from "react-hot-toast";
import { isValidAge } from "../../../utils/helpers";

const ModelProfileForm = ({ imageUrls, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(initialModelProfileFormValues);
    const [disabled, setDisabled] = useState(true);

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (Number(value)) {
            return setFormValues({ ...formValues, [id]: Number(value) });
        } else {
            return setFormValues({ ...formValues, [id]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userProfile = JSON.parse(
            localStorage.getItem("USER_EXPERIENCE_FORM_DATA")
        );
        try {
            const profile = imageUrls.profile;
            const portfolio = imageUrls.portfolio;
            const headshot = imageUrls.headshot;
            const fullBody = imageUrls.fullBody;

            const isUserAgeValid = isValidAge(formValues.birthDate);
            if (!isUserAgeValid) {
                toast.error("Please enter a valid age.");
                return;
            }

            mutateAsync({
                individualProfile: {
                    role: "MODEL",
                    ...userProfile,
                    specialtyInfo: {
                        ...formValues,
                        profilePicture: profile,
                        portfolioPictures: [portfolio],
                        headShots: [headshot],
                        fullBodyShots: [fullBody],
                    },
                },
            });
        } catch (error) {
            toast.error(
                error.message ||
                    error.response.data.message ||
                    "Failed to create profile."
            );
        } finally {
            setLoading(false);
            setFormValues(initialModelProfileFormValues);
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
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="capitalize text-5xl font-display font-bold">
                        Model form
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
                    <div className="grid grid-cols-12 gap-3">
                        {modelProfileFormGroupData.map(
                            (
                                { label, type, name, id, value, className },
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
                                        inputStyle={
                                            className
                                                ? "max-w-[120px]"
                                                : "max-w-[170px]"
                                        }
                                        validate={false}
                                    >
                                        {onBoardingEnums.map((enumObj, idx) => {
                                            if (id === enumObj.id) {
                                                const values = Object.keys(
                                                    enumObj.enums
                                                );

                                                const myValues = Object.values(
                                                    enumObj.enums
                                                );
                                                return (
                                                    <React.Fragment key={id}>
                                                        <option
                                                            className="text-black font-normal"
                                                            value=""
                                                            key="default-option"
                                                        >
                                                            Choose
                                                        </option>
                                                        {values.map(
                                                            (
                                                                value,
                                                                valueIdx
                                                            ) => (
                                                                <option
                                                                    key={`${idx}-${valueIdx}`}
                                                                    value={
                                                                        id ===
                                                                        "nationality"
                                                                            ? myValues[
                                                                                  valueIdx
                                                                              ]
                                                                            : value
                                                                    }
                                                                    className="text-white-base font-normal capitalize"
                                                                >
                                                                    {isNaN(
                                                                        value
                                                                    )
                                                                        ? // Display the value as-is if it's not a number
                                                                          value
                                                                        : // Append the unit based on the field ID
                                                                          `${value}${
                                                                              id ===
                                                                              "weight"
                                                                                  ? "kg"
                                                                                  : "cm"
                                                                          }`}
                                                                </option>
                                                            )
                                                        )}
                                                    </React.Fragment>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </FormGroup>
                                </motion.div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col mt-10 gap-4">
                        <FormButton
                            text={"Create Account"}
                            disabled={disabled || loading}
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

export default ModelProfileForm;
