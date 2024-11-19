import React, { useEffect, useState } from "react";
import LogoHeader from "./shared/ui/LogoHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import BackButton from "./shared/ui/BackButton";

const inputStyle =
    "bg-transparent border-thin border-[#334155] rounded-br-3 px-[17px] py-[13px] w-full text-white-base font-body font-normal text-sm";

const formInputs = [
    { id: "bio", label: "Bio:", placeholder: "Yes" },
    {
        id: "socialAccount",
        label: "Link Your Most Followed Social Account:",
        placeholder: "No",
    },
    {
        id: "workedBefore",
        label: "Have you worked as a videographer before?",
        placeholder: "Full Time • Part Time",
    },
    {
        id: "yearsOfExperience",
        label: "How many years of experience do you have in videography?",
        placeholder: "Yes",
    },
    {
        id: "totalExperience",
        label: "How many years of experience do you have?",
        placeholder: "i.e. Devon Lean",
    },
    {
        id: "availableForTravel",
        label: "Are you available for travel for shoots?",
        placeholder: "Yes",
    },
    {
        id: "legallyWorking",
        label: "Are you legally eligible to work in your location?",
        placeholder: "********",
    },
    {
        id: "holdingBachelors",
        label: "Do you hold a bachelor's degree?",
        placeholder: "********",
    },
];

const initialFormValues = {
    bio: "",
    socialAccount: "",
    workedBefore: "",
    yearsOfExperience: "",
    totalExperience: "",
    availableForTravel: "",
    legallyWorking: "",
    holdingBachelors: "",
};

const IndividualForm = () => {
    const [category, setCategory] = useState("");
    const [check, setCheck] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmite = (e) => {
        e.preventDefault();
        console.log(formValues);

        localStorage.setItem("userData", JSON.stringify(formValues));

        setFormValues(initialFormValues);
        navigate("/individual-last-form", {
            state: { category: location.state.category },
        });
    };

    useEffect(() => {
        setCategory(location.state.category.toLowerCase());
    }, [location.state.category]);

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
            <section className="min-h-screen">
                <LogoHeader />
                <div className="container mx-auto my-10">
                    <div className="grid grid-cols-4 my-4">
                        <BackButton size={30} />
                        <div className="col-span-2 flex flex-col justify-center items-center gap-[14px]">
                            <h1 className="capitalize text-5xl font-display font-bold text-white-base">
                                {category}
                            </h1>
                            <p className="text-sm text-white-base/40 w-[50%] mx-auto text-center">
                                Highlight your specialty to attract the right
                                collaborations.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmite}>
                        <div className="flex justify-between items-center flex-wrap gap-4 p-4">
                            {formInputs.map(
                                ({ id, label, placeholder }, index) => (
                                    <motion.div
                                        key={id}
                                        className="flex flex-col gap-2 w-full md:w-[48%]"
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <label
                                            htmlFor={id}
                                            className="text-white-base font-body font-normal text-sm"
                                        >
                                            {label}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={placeholder}
                                            className={inputStyle}
                                            id={id}
                                            value={formValues[id]}
                                            onChange={handleInputChange}
                                        />
                                    </motion.div>
                                )
                            )}
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
                                <button
                                    type="submit"
                                    className={`${
                                        disabled
                                            ? "cursor-not-allowed bg-[#494B4E]"
                                            : "bg-blue-primary"
                                    } rounded-[46px] px-[72px] py-[11px] text-base font-semibold text-white-base transition-colors cursor-pointer duration-200`}
                                    disabled={disabled}
                                >
                                    Next
                                </button>
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

export default IndividualForm;
