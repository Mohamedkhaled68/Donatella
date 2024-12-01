import React, { useEffect, useState } from "react";
import { BackButton, FormButton, FormGroup } from "../../components";
import {
    JobPostFormGroupData,
} from "../../utils/constants";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";

const initialJobPostFormValue = {
    title: "",
    jobCategory: "MODEL",
    requiredExperience: {
        minimum: 0,
        maximum: 0,
    },
    careerLevel: "MID_LEVEL",
    jobDuration: {
        minimum: 0,
        minimumPrefix: "DAY",
        maximum: 0,
        maximumPrefix: "DAY",
    },
    location: "",
    salary: 0,
    // tattos: "",
    description: "",
    requirements: "",
    educationLevel: "BACHELOR",
    tags: [],
};

const PostJob = () => {
    const [formValues, setFormValues] = useState({
        ...initialJobPostFormValues,
    });
    const [disabled, setDisabled] = useState(true);
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const { userStatus } = useUserStore((state) => state);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ ...formValues });
    };

    useEffect(() => {
        if (userStatus.role !== "ORGANIZATION") {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        if (isFilled && check) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues, check]);
    return (
        <>
            <section className="w-full h-full">
                <div className="container mx-auto py-5">
                    <div className="w-full grid grid-cols-3">
                        <BackButton />
                        <div className="flex flex-col items-center gap-3">
                            <h1 className="text-5xl font-bold text-white-base font-display">
                                Post a Job
                            </h1>
                            <p className="text-md font-light text-white-base/50 font-body w-[80%] mx-auto text-center">
                                Highlight your specialty to attract the right
                                collaborations.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-8 gap-4 pt-8">
                            {/* {JobPostFormGroupData.map((formGroup, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.1,
                                    }}
                                    className={
                                        formGroup.className
                                            ? formGroup.className
                                            : "col-span-8"
                                    }
                                    key={idx}
                                >
                                    <FormGroup
                                        label={formGroup.label}
                                        value={formGroup.value(formValues)}
                                        onChange={handleInputChange}
                                        id={formGroup.id}
                                        name={formGroup.name}
                                        placeholder={formGroup.placeholder}
                                    />
                                </motion.div>
                            ))} */}
                            <FormGroup
                                value={formValues}
                                type="text"
                                name="title"
                                id="title"
                            />
                            <input
                                className={`rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full col-span-2`}
                                type="text"
                                name="title"
                                id="title"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-[50px]">
                            <div className="flex flex-col gap-7 flex-1">
                                <div className="flex items-center gap-3">
                                    <div
                                        onClick={() => setCheck(!check)}
                                        className={`w-6 h-6 rounded-[5px] ${
                                            check
                                                ? "bg-blue-primary"
                                                : "bg-white-base/50"
                                        } flex justify-center items-center transition-colors cursor-pointer duration-200`}
                                    >
                                        <FaCheck className="text-white-base" />
                                    </div>
                                    <h1 className="text-[#64748B] text-base font-medium">
                                        I Agree To These Terms And Services.
                                    </h1>
                                </div>
                                <p className="text-sm text-[#64748B] font-extralight">
                                    I affirm that the information provided in
                                    this application is accurate and complete to
                                    the best of my knowledge, and that any
                                    falsification or omission may result in
                                    disqualification from the platform.
                                </p>
                            </div>
                            <div className="flex flex-col items-end flex-1 gap-[17px]">
                                <FormButton text={"Next"} disabled={disabled} />
                                <p className="text-right text-sm text-[#64748B]">
                                    Don't have an account yet?{" "}
                                    <Link
                                        className="text-blue-primary"
                                        to="/login"
                                    >
                                        Click here to create one!
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default PostJob;
