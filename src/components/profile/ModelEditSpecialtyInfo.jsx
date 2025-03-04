import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { IoCloseSharp } from "react-icons/io5";
import {
    BustSizeEnum,
    CountryEnum,
    DressSizeEnum,
    EyeColorEnum,
    HairColorEnum,
    HeightEnum,
    HipSizeEnum,
    ShoeSizeEnum,
    SkinToneEnum,
    WaistSizeEnum,
    WeightEnum,
} from "../../utils/constants";
import { motion } from "framer-motion";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import toast from "react-hot-toast";
import Loading from "../shared/ui/Loading";

const ModelEditSpecialtyInfo = ({ setIsEditing }) => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const userSpecialtyInfo = useUserStore(
        (state) => state.userStatus?.individual?.specialtyInfo || {}
    );
    const { userStatus, setUserStatus } = useUserStore((state) => state);

    const { mutateAsync: updateMe } = useUpdateMe();

    const [formState, setFormState] = useState({
        gender: userSpecialtyInfo.gender || "",
        birthDate: userSpecialtyInfo.birthDate || "",
        nationality: userSpecialtyInfo.nationality || "",
        height: userSpecialtyInfo.height || "",
        weight: userSpecialtyInfo.weight || "",
        eyeColorEnum: userSpecialtyInfo.eyeColorEnum || "",
        skinToneEnum: userSpecialtyInfo.skinToneEnum || "",
        hairColorEnum: userSpecialtyInfo.hairColorEnum || "",
        dressSize: userSpecialtyInfo.dressSize || "",
        shoeSize: userSpecialtyInfo.shoeSize || "",
        waist: userSpecialtyInfo.waist || "",
        hips: userSpecialtyInfo.hips || "",
        bust: userSpecialtyInfo.bust || "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Convert value to a number if it is a valid number
        if (!isNaN(value) && value.trim() !== "") {
            value = Number(value);
        }

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        console.log(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateMe({
                role: userStatus.individual.role,
                specialtyInfo: {
                    ...userStatus.individual.specialtyInfo,
                    ...formState,
                },
            });

            setUserStatus({
                ...userStatus,
                individual: {
                    ...userStatus.individual,
                    specialtyInfo: {
                        ...userStatus.individual.specialtyInfo,
                        ...formState,
                    },
                },
            });
            toast.success("Specialty info updated successfully.");
            setIsEditing(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isFilled = Object.values(formState).every(
            (value) => value !== ""
        );

        setDisabled(!isFilled);
    }, [formState]);

    useEffect(() => {
        console.log(userStatus.individual.specialtyInfo.birthDate);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="bg-[#27292C] p-5 w-[70%] rounded-md left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-[1000] h-[90vh] overflow-y-scroll custom-scrollbar"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-white-base font-display font-bold text-[38px]">
                    Edit Specialty
                </h1>
                <IoCloseSharp
                    className="cursor-pointer text-white-base p-1 hover:bg-white-base/20 rounded-full duration-300"
                    onClick={() => {
                        setIsEditing(false);
                    }}
                    size={35}
                />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                {/* Gender */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="gender"
                        className="text-white-base font-body font-bold"
                    >
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        value={formState.gender}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        <option value="OTHER">Other</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                {/* Birthdate */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="birthDate"
                        className="text-white-base font-body font-bold"
                    >
                        Birthdate
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        value={formState.birthDate}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    />
                </div>
                {/* Nationality */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="nationality"
                        className="text-white-base font-body font-bold"
                    >
                        Nationality
                    </label>
                    <select
                        name="nationality"
                        id="nationality"
                        value={formState.nationality}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(CountryEnum.enums).map(
                            ([label, value]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Height */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="height"
                        className="text-white-base font-body font-bold"
                    >
                        Height
                    </label>
                    <select
                        name="height"
                        id="height"
                        value={formState.height}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(HeightEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* weight */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="weight"
                        className="text-white-base font-body font-bold"
                    >
                        Weight
                    </label>
                    <select
                        name="weight"
                        id="weight"
                        value={formState.weight}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(WeightEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Eye Color */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="eyeColor"
                        className="text-white-base font-body font-bold"
                    >
                        Eye Color
                    </label>
                    <select
                        name="eyeColorEnum"
                        id="eyeColor"
                        value={formState.eyeColorEnum}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(EyeColorEnum.enums).map(
                            ([label, value]) => (
                                <option
                                    className="capitalize"
                                    key={value}
                                    value={value}
                                >
                                    {label.toLowerCase()}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/*Skin Tone */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="skintone"
                        className="text-white-base font-body font-bold"
                    >
                        Skin tone
                    </label>
                    <select
                        name="skinToneEnum"
                        id="skintone"
                        value={formState.skinToneEnum}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(SkinToneEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/*Hair Color */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="hairColor"
                        className="text-white-base font-body font-bold"
                    >
                        Hair Color
                    </label>
                    <select
                        name="hairColorEnum"
                        id="hairColor"
                        value={formState.hairColorEnum}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(HairColorEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/*Dress Size */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="dressSize"
                        className="text-white-base font-body font-bold"
                    >
                        Dress Size
                    </label>
                    <select
                        name="dressSize"
                        id="dressSize"
                        value={formState.dressSize}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(DressSizeEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/*Shoe Size */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="shoeSize"
                        className="text-white-base font-body font-bold"
                    >
                        Shoe Size
                    </label>
                    <select
                        name="shoeSize"
                        id="shoeSize"
                        value={formState.shoeSize}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(ShoeSizeEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Waist */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="waist"
                        className="text-white-base font-body font-bold"
                    >
                        Waist
                    </label>
                    <select
                        name="waist"
                        id="waist"
                        value={formState.waist}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(WaistSizeEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Hips */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="hips"
                        className="text-white-base font-body font-bold"
                    >
                        Hips
                    </label>
                    <select
                        name="hips"
                        id="hips"
                        value={formState.hips}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(HipSizeEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Bust */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="bust"
                        className="text-white-base font-body font-bold"
                    >
                        Bust
                    </label>
                    <select
                        name="bust"
                        id="bust"
                        value={formState.bust}
                        onChange={handleChange}
                        className="bg-[#27292C] border-thin border-white-base/30 text-sm font-light font-body text-white-base rounded-md p-3"
                    >
                        {Object.entries(BustSizeEnum.enums).map(
                            ([label, value]) => (
                                <option key={label} value={label}>
                                    {value}
                                </option>
                            )
                        )}
                    </select>
                </div>
                {/* Save Button */}
                <button
                    type="submit"
                    disabled={disabled || loading}
                    className={`${
                        disabled ? "bg-[#494B4E]" : "bg-blue-primary"
                    } text-white-base font-body font-bold py-3 px-5 rounded-md mt-5 self-end`}
                >
                    {loading ? <Loading /> : "Save Chnges"}
                </button>
            </form>
        </motion.div>
    );
};

export default ModelEditSpecialtyInfo;
