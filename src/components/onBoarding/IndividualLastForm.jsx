import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoHeader from "../shared/ui/LogoHeader";
import LoadImage from "./LoadImage";
import useOnboarding from "../../hooks/auth/useOnboarding";

const imagesInputs = [
    { id: 1, label: "Profile Picture" },
    { id: 2, label: "Cover Picture" },
    { id: 3, label: "Headshot" },
    { id: 4, label: "Full Body" },
];

const initialFormValues = {
    birthdate: "",
    gender: "male",
    nationality: "egyptian",
    skinTone: "fair",
    hairColor: "blonde",
    eyeColor: "green",
    bust: "56",
    hip: "26",
    waist: "16",
    dressSize: "18",
    shoeSize: "20",
    weight: "80",
    height: "150",
};

const IndividualLastForm = () => {
    const [role, setRole] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);

    const { mutateAsync, isSuccess } = useOnboarding();

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await mutateAsync({
                role,
                specialtyInfo: {
                    birthDate: "2015-05-15",
                    gender: "MALE",
                    nationality: "EG",
                    skinToneEnum: "MEDIUM",
                    hairColorEnum: "BROWN",
                    eyeColorEnum: "BLUE",
                    weight: 70,
                    height: 180,
                    waist: 75,
                    hips: 90,
                    shoeSize: 42,
                    dressSize: 10,
                    bust: 66,
                },
            });
        } catch (error) {
            // setError("An error occurred.");
            console.log(error.message);
        } finally {
            console.log({
                role,
                specialtyInfo: { ...formValues },
            });
            setFormValues(initialFormValues);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    useEffect(() => {
        if (!location.state) {
            navigate("/individual-form");
        } else {
            setRole(location.state.category);
        }
    }, [location.state, navigate]);

    return (
        <section className="min-h-screen w-full  text-white">
            <LogoHeader />
            <form
                onSubmit={handleSubmit}
                className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8"
            >
                <div className="flex flex-col">
                    <div className="mb-10">
                        <h1 className="capitalize text-5xl font-display font-bold">
                            {role.toLowerCase()} form
                        </h1>
                        <p className="text-gray-400 mt-2 text-md">
                            Create your profile, showcase your skills, and find
                            your next project.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Birthdate
                            </label>
                            <input
                                onChange={handleInputChange}
                                type="date"
                                value={formValues.birthdate}
                                id="birthdate"
                                placeholder="DD/MM/YYYY"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Gender
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.gender}
                                id="gender"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="male">
                                    Male
                                </option>
                                <option className="text-black" value="female">
                                    Female
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Nationality
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.nationality}
                                id="nationality"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="egyptian">
                                    Egyptian
                                </option>
                                <option className="text-black" value="american">
                                    American
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Skin Tone
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.skinTone}
                                id="skinTone"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="fair">
                                    Fair
                                </option>
                                <option className="text-black" value="fair">
                                    Fair
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Hair Color
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.hairColor}
                                id="hairColor"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="blonde">
                                    Blonde
                                </option>
                                <option className="text-black" value="red">
                                    Red
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Eye Color
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.eyeColor}
                                id="eyeColor"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="green">
                                    Green
                                </option>
                                <option className="text-black" value="brown">
                                    Brown
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Bust
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.bust}
                                id="bust"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="56">
                                    56cm
                                </option>
                                <option className="text-black" value="57">
                                    57cm
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Hip
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.hip}
                                id="hip"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="26">
                                    26cm
                                </option>
                                <option className="text-black" value="27">
                                    27cm
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Waist
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.waist}
                                id="waist"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="16">
                                    16cm
                                </option>
                                <option className="text-black" value="14">
                                    17cm
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-5 mb-10">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Dress Size
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.dressSize}
                                id="dressSize"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="18">
                                    18cm
                                </option>
                                <option className="text-black" value="19">
                                    19cm
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Shoe Size
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.shoeSize}
                                id="shoeSize"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="20">
                                    20cm
                                </option>
                                <option className="text-black" value="21">
                                    21cm
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Weight
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.weight}
                                id="weight"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="80">
                                    80kg
                                </option>
                                <option className="text-black" value="81">
                                    81kg
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#E4E4E7] text-sm">
                                Hight
                            </label>
                            <select
                                onChange={handleInputChange}
                                value={formValues.height}
                                id="height"
                                className=" text-center text-white bg-transparent border border-gray-700 rounded-full px-[18px] py-[14px] appearance-none"
                            >
                                <option className="text-black" value="150">
                                    150cm
                                </option>
                                <option className="text-black" value="151">
                                    151cm
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[17px]">
                        <button
                            type="submit"
                            className={`${
                                disabled
                                    ? "cursor-not-allowed bg-[#494B4E]"
                                    : "bg-blue-primary"
                            } rounded-[46px] px-[30px] py-[12px] text-base font-semibold text-white-base transition-colors cursor-pointer duration-200`}
                            // disabled={disabled}
                        >
                            Create Account
                        </button>
                        <p className="text-right text-sm text-[#64748B]">
                            Don't have an account yet?{" "}
                            <Link className="text-blue-primary" to="/login">
                                Click here to create one!
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 justify-items-center">
                    {imagesInputs.map((input) => (
                        <LoadImage
                            key={input.id}
                            label={input.label}
                            inputId={`file-input-${input.id}`}
                        />
                    ))}
                </div>
            </form>
        </section>
    );
};

const InputField = ({ label, placeholder, type }) => (
    <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">{label}</label>
        <input
            type={type || "text"}
            placeholder={placeholder}
            className="w-full text-center text-white bg-transparent border border-gray-700 rounded-full px-4 py-2"
        />
    </div>
);

export default IndividualLastForm;
