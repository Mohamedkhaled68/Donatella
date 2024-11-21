import React, { useEffect, useState } from "react";
import {
    initialModelImagesValues,
    initialModelProfileFormValues,
    modelProfileFormGroupData,
    onBoardingEnums,
} from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useOnboarding from "../../../hooks/auth/useOnboarding";

const userProfile = {
    bio: "my bio",
    socialAccount: "http://maes.com",
    yearsOfExperience: 1,
    workExperience: [
        {
            title: "model",
            company: "maes",
            startDate: "2024-01-15",
            endDate: "2024-06-30",
        },
    ],
    availableForTravel: true,
    legallyWorking: true,
    holdingBachelors: true,
};

const ModelProfileForm = ({ imageUrls }) => {
    const [formValues, setFormValues] = useState(initialModelProfileFormValues);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

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
        try {
            mutateAsync({
                role: "MODEL",
                ...userProfile,
                specialtyInfo: { ...formValues },
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            console.log({
                role: "MODEL",
                ...userProfile,
                specialtyInfo: { ...formValues },
            });
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

        // const errors = validateForm(formValues);
        // setErrors(errors);

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
                                    >
                                        {onBoardingEnums.map((enumObj, idx) => {
                                            if (id === enumObj.id) {
                                                const values = Object.keys(
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
                                                                        value
                                                                    }
                                                                    className="text-black font-normal capitalize"
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

export default ModelProfileForm;
