import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import toast from "react-hot-toast";
import Loading from "../shared/ui/Loading";

const EditorEditSpecialtyInfo = ({ setIsEditing }) => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const userSpecialtyInfo = useUserStore(
        (state) => state.userStatus?.individual?.specialtyInfo || {}
    );
    const { userStatus, setUserStatus } = useUserStore((state) => state);
    const [formState, setFormState] = useState({
        editingSoftware: userSpecialtyInfo.editingSoftware || "",
        colorGrading: userSpecialtyInfo.colorGrading || "",
        soundEditing: userSpecialtyInfo.soundEditing || "",
        visualEffects: userSpecialtyInfo.visualEffects || "",
        motionGraphics: userSpecialtyInfo.motionGraphics || "",
    });

    const { mutateAsync: updateMe } = useUpdateMe();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue =
            value === "true" ? true : value === "false" ? false : value;

        setFormState((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="bg-[#27292C] p-5 w-[70%] rounded-md left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-[1000]"
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
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="editingSoftware"
                        className="text-white-base font-body font-bold"
                    >
                        Editing Software
                    </label>
                    <input
                        type="text"
                        name="editingSoftware"
                        value={formState.editingSoftware}
                        onChange={handleChange}
                        className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="colorGrading"
                        className="text-white-base font-body font-bold"
                    >
                        Color Grading
                    </label>
                    <select
                        className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
                        value={formState.colorGrading}
                        onChange={handleChange}
                        id="colorGrading"
                        name="colorGrading"
                    >
                        <option value="Nikon">Select Option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="soundEditing"
                        className="text-white-base font-body font-bold"
                    >
                        Sound Editing
                    </label>
                    <select
                        className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
                        value={formState.soundEditing}
                        onChange={handleChange}
                        id="soundEditing"
                        name="soundEditing"
                    >
                        <option value="Nikon">Select Option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="visualEffects"
                        className="text-white-base font-body font-bold"
                    >
                        Visual Effects
                    </label>
                    <select
                        className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
                        value={formState.visualEffects}
                        onChange={handleChange}
                        id="visualEffects"
                        name="visualEffects"
                    >
                        <option value="Nikon">Select Option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="motionGraphics"
                        className="text-white-base font-body font-bold"
                    >
                        Motion Graphics
                    </label>
                    <select
                        className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
                        value={formState.motionGraphics}
                        onChange={handleChange}
                        id="motionGraphics"
                        name="motionGraphics"
                    >
                        <option value="Nikon">Select Option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
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

export default EditorEditSpecialtyInfo;
