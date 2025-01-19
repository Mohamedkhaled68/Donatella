import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CountryEnum,
    initialOrgProfileFormValues,
    OrgProfileFormGroupData,
} from "../../../utils/constants";
import FormGroup from "../../shared/ui/FormGroup";
import FormButton from "../../shared/ui/FormButton";
import useOnboarding from "../../../hooks/auth/useOnboarding";

const OrganizationProfileForm = ({ loading, setLoading, imageUrl }) => {
    const [formValues, setFormValues] = useState(initialOrgProfileFormValues);
    const [disabled, setDisabled] = useState(true);

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            mutateAsync({
                organizationProfile: {
                    ...formValues,
                    logo: imageUrl,
                },
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setFormValues(initialOrgProfileFormValues);
        }
    };

    useEffect(() => {
        const isInputsFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        // const errors = validateForm(formValues);
        // setErrors(errors);

        setDisabled(!isInputsFilled || !imageUrl);
        // setDisabled(!isInputsFilled);
    }, [formValues, imageUrl]);
    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="capitalize text-5xl font-display font-bold">
                        Organization form
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
                    <div className="w-[80%] grid grid-cols-2 gap-4">
                        {OrgProfileFormGroupData.map(
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
                                        className ? className : "col-span-1"
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
                                    >
                                        <option value="">Select Country</option>
                                        {Object.entries(CountryEnum.enums).map(
                                            ([country, code]) => (
                                                <option key={code} value={code}>
                                                    {country
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .trim()}
                                                </option>
                                            )
                                        )}
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

export default OrganizationProfileForm;
