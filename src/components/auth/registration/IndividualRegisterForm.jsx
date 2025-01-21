import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useRegister from "../../../hooks/auth/useRegister";
import { validateForm } from "../../../utils/validators";
import FormGroup from "../../shared/ui/FormGroup";
import FormButton from "../../shared/ui/FormButton";
import { NavLink } from "react-router-dom";
import {
    individualRegisterFormGroupData,
    initialIndividualRegisterFormValues,
} from "../../../utils/constants";
import toast from "react-hot-toast";

const IndividualRegisterForm = ({ role, loading, setLoading }) => {
    const [formValues, setFormValues] = useState(
        initialIndividualRegisterFormValues
    );
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});

    const { mutateAsync, isSuccess } = useRegister();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await toast
            .promise(
                mutateAsync({ ...formValues, role: role.toUpperCase() }),
                {
                    loading: "Registering...",
                    success: "Registered successfully!",
                    error: (err) => err?.response?.data?.message,
                },
                {
                    success: {
                        icon: "🚀",
                    },
                }
            )
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setFormValues(initialIndividualRegisterFormValues);
                setLoading(false);
            });
    };

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        const errors = validateForm(formValues);
        setErrors(errors);

        setDisabled(!isFilled || Object.keys(errors).length !== 0);
    }, [formValues]);
    return (
        <>
            <form
                className="w-[100%] flex flex-col gap-4 mt-6"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-4">
                    {individualRegisterFormGroupData.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            className="col-span-1"
                        >
                            <FormGroup
                                label={group.label}
                                type={group.type}
                                name={group.name}
                                id={group.id}
                                placeholder={group.placeholder}
                                value={group.value(formValues)}
                                onChange={handleInputChange}
                                error={group.error(errors)}
                                validate={true}
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="flex flex-col items-start gap-2 mt-6">
                    <FormButton
                        loading={loading}
                        disabled={disabled}
                        text={"Sign Up"}
                    />
                    <p className="text-medium text-white-base/40">
                        Already have an account?{" "}
                        <NavLink className="text-blue-primary" to="/login">
                            Click here to log in!
                        </NavLink>
                    </p>
                </div>
            </form>
        </>
    );
};

export default IndividualRegisterForm;
