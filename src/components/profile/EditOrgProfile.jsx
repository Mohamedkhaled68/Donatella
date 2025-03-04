import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/userStore";
import useUploadImage from "../../hooks/auth/useUploadImage";
import toast from "react-hot-toast";
import Loading from "../shared/ui/Loading";
import { useModal } from "../../store/useModal";
import { FiEdit } from "react-icons/fi";
import { CountryEnum } from "../../utils/constants";
import { formatUrl, isNotEmailOrLink } from "../../utils/helpers";
import useUpdateOrg from "../../hooks/user/useUpdateOrg";

const EditOrgProfile = () => {
    const [formValues, setformValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { userStatus, setUserStatus } = useUserStore((state) => state);
    const { mutateAsync: uploadImage } = useUploadImage();
    const { mutateAsync: updateOrg } = useUpdateOrg();
    const setModal = useModal((state) => state.setModal);
    const fileInputRef = useRef();

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 1 * 1024 * 1024)
            return toast.error("File size exceeds 1MB limit.");

        const data = await uploadImage(file);
        setformValues({ ...formValues, logo: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValues) return;
        if (formValues.name.length < 3)
            return toast.error("Name should be at least 3 characters long.");
        if (
            formValues.instagram.length > 0 &&
            !formValues.instagram.includes("instagram.com") &&
            !isNotEmailOrLink(formValues.instagram)
        )
            return toast.error("Please enter a valid Instagram URL.");
        if (
            formValues.tiktok.length > 0 &&
            !formValues.tiktok.includes("tiktok.com") &&
            !isNotEmailOrLink(formValues.tiktok)
        )
            return toast.error("Please enter a valid Tiktok URL.");

        const tikTokUrl = formatUrl(formValues.tiktok);
        const instagramUrl = formatUrl(formValues.instagram);
        const websiteUrl = formatUrl(formValues.website);

        setLoading(true);
        try {
            await updateOrg(formValues);
            const updatedUserStatus = {
                ...userStatus,
                organization: {
                    ...formValues,
                    website: websiteUrl,
                    tiktok: tikTokUrl,
                    instagram: instagramUrl,
                    logo: formValues.logo,
                },
            };
            setUserStatus(updatedUserStatus);
            toast.success("Profile updated successfully!");
            setModal(null);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setformValues(userStatus.organization);
    }, [userStatus.organization]);

    useEffect(() => {
        if (!formValues) return;
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );
        if (isFilled) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues]);
    if (!formValues) return null;

    return (
        <>
            <div className="bg-gray-900 rounded-lg w-[60%] mx-auto p-4 flex justify-center items-center text-white-base">
                <div className="bg-gray-800 rounded-md p-4 w-full h-[550px] overflow-y-scroll custom-scrollbar">
                    <div className="w-full flex items-center justify-between">
                        <div className="relative w-fit">
                            <div className="w-[100px] h-[100px] rounded-full bg-slate-400 overflow-hidden flex justify-center items-center">
                                <img
                                    className="w-full h-full object-cover"
                                    src={formValues.logo}
                                    alt=""
                                />
                            </div>
                            <div
                                className="absolute bottom-0 -right-3 cursor-pointer"
                                onClick={handleEditClick}
                            >
                                <FiEdit size={18} />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }} // Hide the file input
                                accept="image/*" // Optional: Restrict to image files only
                            />
                        </div>
                        <div className="flex flex-col items-end grow gap-4">
                            <button
                                onClick={() => setModal(null)}
                                className="px-10 py-2  w-[30%] bg-transparent rounded-full text-white-base border border-white-base text-lg text-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={disabled || loading}
                                className={`px-10 py-2 w-[30%] ${
                                    disabled || loading
                                        ? "bg-gray-500 user-events-none cursor-not-allowed"
                                        : "bg-blue-primary"
                                } rounded-full text-white-base text-lg text-center duration-300 flex justify-center items-center`}
                            >
                                {loading ? <Loading /> : "Done"}
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="w-full grid grid-cols-2 gap-x-5 gap-y-3  ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="orgName">
                                    Organization Name
                                </label>
                                <input
                                    id="orgName"
                                    type="text"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            name: e.target.value,
                                        })
                                    }
                                    value={formValues?.name}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="location">Location</label>
                                <select
                                    className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body p-3 w-full"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            location: e.target.value,
                                        })
                                    }
                                    value={formValues?.location}
                                    id="location"
                                >
                                    <option value="">Select Country</option>
                                    {Object.entries(CountryEnum.enums).map(
                                        ([country, code]) => (
                                            <option key={code} value={code}>
                                                {country
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="instagram">Instagram</label>
                                <input
                                    id="instagram"
                                    type="text"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            instagram: e.target.value,
                                        })
                                    }
                                    value={formValues?.instagram}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="tiktok">Tiktok</label>
                                <input
                                    id="tiktok"
                                    type="text"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            tiktok: e.target.value,
                                        })
                                    }
                                    value={formValues?.tiktok}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="website">Website</label>
                                <input
                                    id="website"
                                    type="text"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            website: e.target.value,
                                        })
                                    }
                                    value={formValues?.website}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            phone: e.target.value,
                                        })
                                    }
                                    value={formValues?.phone}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <label htmlFor="bio">bio</label>
                                <textarea
                                    id="bio"
                                    rows={5}
                                    onChange={(e) =>
                                        setformValues({
                                            ...formValues,
                                            bio: e.target.value,
                                        })
                                    }
                                    value={formValues?.bio}
                                    className="w-full bg-gray-700 rounded-md p-3 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOrgProfile;
