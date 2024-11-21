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

const IndividualRegisterForm = ({ role }) => {
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

        try {
            console.log({ ...formValues, role: role.toUpperCase() });
            await mutateAsync({ ...formValues, role: role.toUpperCase() });
        } catch (error) {
            console.log("An error occurred.");
        } finally {
            console.log({ ...formValues, role: role.toUpperCase() });
            toast.success("Registered successfully!!");
            setFormValues(initialIndividualRegisterFormValues);
        }
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
                <div className="grid grid-cols-4 gap-5">
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
                            className="col-span-2"
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
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center gap-2 mt-6">
                    <FormButton disabled={disabled} text={"Sign Up"} />
                    <p className="text-medium text-white-base/40">
                        Don't have an account?{" "}
                        <NavLink className="text-blue-primary" to="/signup">
                            Create free account
                        </NavLink>
                    </p>
                </div>
            </form>
        </>
    );
};

export default IndividualRegisterForm;
