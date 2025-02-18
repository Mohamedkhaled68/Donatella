import React, { useEffect, useState } from "react";
import {
    BackButton,
    FormButton,
    FormGroup,
    LogoHeader,
    WorkExperienceForm,
} from "../../components";
import {
    ExperienceFormGroupData,
    initialExperienceFormValues,
} from "../../utils/constants";
import { formatUrl, isNotEmailOrLink } from "../../utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ExperienceFormSection = () => {
    const [formValues, setFormValues] = useState(initialExperienceFormValues);
    const [workExperience, setWorkExperience] = useState([
        { title: "", company: "", startDate: "2020-01-01", endDate: "" },
    ]);
    const [category, setCategory] = useState("");
    const [modal, setModal] = useState(false);
    const [check, setCheck] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const getCategory = (cate) => {
        switch (cate) {
            case "tour guide":
                return "Tourism & Historical Advisor";
            case "beautician":
                return "Beauty and Cosmetics";
            case "athlete":
                return "Athletes & Sports Enthusiast";
            case "artist":
                return "Artists and Visuals";
            case "fashionista":
                return "Fashion and Jewelry Stylist";
            case "musician":
                return "Music & Sound Engineer";
            default:
                return cate;
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleExperienceModal = () => {
        setModal(true);
    };

    const handleSubmite = (e) => {
        e.preventDefault();

        const transformedFormValues = Object.fromEntries(
            Object.entries(formValues).map(([key, value]) => {
                if (value === "true") return [key, true];
                if (value === "false") return [key, false];
                if (!isNaN(value) && value !== "") return [key, Number(value)];
                return [key, value];
            })
        );

        if (isNotEmailOrLink(formValues.socialAccount)) {
            toast.error("Please enter a valid URL or email address.");
            return;
        }
        console.log({
            ...transformedFormValues,
            socialAccount: formatUrl(formValues.socialAccount),
            workExperience,
        });

        localStorage.setItem(
            "userData",
            JSON.stringify({ ...transformedFormValues, workExperience })
        );

        setFormValues(initialExperienceFormValues);
        navigate("/profile-form", {
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

        const hasNonEmptyExperience = workExperience.some(
            (experience) =>
                experience.title &&
                experience.company &&
                experience.startDate &&
                experience.endDate
        );

        if (isFilled && check && hasNonEmptyExperience) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues, check, workExperience]);
    return (
        <>
            <AnimatePresence>
                {modal && (
                    <WorkExperienceForm
                        setModal={setModal}
                        workExperience={workExperience}
                        setWorkExperience={setWorkExperience}
                    />
                )}
            </AnimatePresence>
            <section className="min-h-screen">
                <LogoHeader />
                <div className="container mx-auto my-10">
                    <div className="grid grid-cols-4 my-4">
                        <BackButton size={30} />
                        <div className="col-span-2 flex flex-col justify-center items-center gap-[14px]">
                            <h1 className="capitalize text-5xl text-center font-display font-bold text-white-base">
                                {getCategory(category)}
                            </h1>
                            <p className="text-sm text-white-base/40 w-[50%] mx-auto text-center">
                                Highlight your specialty to attract the right
                                collaborations.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmite}>
                        <div className="flex justify-between items-center flex-wrap gap-4 p-4">
                            {ExperienceFormGroupData.map(
                                (
                                    {
                                        id,
                                        label,
                                        placeholder,
                                        type,
                                        value,
                                        name,
                                    },
                                    index
                                ) => (
                                    <motion.div
                                        key={id}
                                        className="flex flex-col gap-2 w-full first:w-full md:w-[48%]"
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <FormGroup
                                            label={
                                                id === "hasWorkExperience"
                                                    ? label(category)
                                                    : label
                                            }
                                            id={id}
                                            value={value(formValues)}
                                            placeholder={placeholder}
                                            type={type}
                                            name={name}
                                            onChange={handleInputChange}
                                            validate={false}
                                        >
                                            <option
                                                key={`${id} empty`}
                                                value=""
                                            >
                                                choose
                                            </option>
                                            <option
                                                key={`${id} option yes`}
                                                value={true}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                key={`${id} option no`}
                                                value={false}
                                            >
                                                No
                                            </option>
                                        </FormGroup>
                                    </motion.div>
                                )
                            )}
                            <motion.div
                                className="flex flex-col gap-2 w-full md:w-[48%]"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className={`flex flex-col gap-2`}>
                                    <div className="flex justify-between items-center">
                                        <label
                                            className={`text-white-base text-sm font-body font-normal`}
                                            htmlFor="workExperience"
                                        >
                                            Where have you previously worked as
                                            a{" "}
                                            <span className="capitalize">
                                                {category}
                                            </span>
                                            ?
                                        </label>
                                    </div>

                                    <div
                                        onClick={handleExperienceModal}
                                        className={`rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-white-base text-center text-medium font-body px-[18px] py-[14px] w-full hover:bg-blue-primary transition-all duration-300 cursor-pointer`}
                                    >
                                        Add Experience
                                    </div>
                                </div>
                            </motion.div>
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
                            <div className="flex flex-col items-end flex-1 gap-[17px] pb-5">
                                <FormButton text={"Next"} disabled={disabled} />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ExperienceFormSection;
