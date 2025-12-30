import React, { useEffect, useState } from "react";
import {
    CountryEnum,
    initialOrgProfileFormValues,
} from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import toast from "react-hot-toast";
import TextInput from "../../shared/ui/TextInput";
import { countryCodes } from "../../../utils/CountryCodes";
const formatUrl = (url) => {
    if (!url) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }
    return url;
};

const OrganizationProfileForm = ({
    loading,
    setLoading,
    imageUrl,
    setPreviewUrl,
    setMedia,
}) => {
    const [formValues, setFormValues] = useState(initialOrgProfileFormValues);
    const [disabled, setDisabled] = useState(true);
    const [countryCode, setCountryCode] = useState("");

    const { mutateAsync } = useOnboarding();

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const conCode = countryCodes.find(
            (c) => c.code === countryCode
        ).dial_code;

        if (conCode.endsWith("0") && formValues.phone.startsWith("0")) {
            formValues.phone = formValues.phone.slice(1);
        }

        const tikTokUrl = formatUrl(formValues.tiktok);
        const instagramUrl = formatUrl(formValues.instagram);
        const websiteUrl = formatUrl(formValues.website);


        try {
            if (!tikTokUrl.includes("tiktok.com")) {
                toast.error("Please enter a valid TikTok URL.");
                return;
            }

            if (!instagramUrl.includes("instagram.com")) {
                toast.error("Please enter a valid Instagram URL.");
                return;
            }
            console.log(formValues.phone);


            if (!/^\d{7,15}$/.test(formValues.phone)) {
                toast.error("Please enter a valid phone number.");
                return;
            }

            const updatedFormValues = {
                ...formValues,
                instagram: formatUrl(formValues.instagram),
                website: websiteUrl,
                tiktok: formatUrl(formValues.tiktok),
                phone: `${conCode}${formValues.phone}`,
            };

            await mutateAsync({
                organizationProfile: {
                    ...updatedFormValues,
                    logo: imageUrl,
                },
            });

            toast.success("Profile created successfully!");
            setFormValues(initialOrgProfileFormValues);
            setPreviewUrl(null);
            setMedia(null);
        } catch (error) {
            const message = error?.message;
            toast.error(
                Array.isArray(message)
                    ? message[0]
                    : message || "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isInputsFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        setDisabled(!isInputsFilled || !imageUrl);
    }, [formValues, imageUrl]);

    useEffect(() => {
        if (formValues.location) {
            const code = countryCodes.find(
                (c) => c.code === formValues.location
            );

            setCountryCode(code.code);
        }
    }, [formValues.location]);
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
                    <div className="w-[95%] grid grid-cols-2 gap-4">
                        {/* BIO */}
                        <div className={`flex flex-col gap-2 col-span-2`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="bio"
                                >
                                    Bio
                                </label>
                            </div>
                            <TextInput
                                onChange={handleInputChange}
                                value={formValues.bio}
                                name={"bio"}
                                id={"bio"}
                                type={"text"}
                                placeholder={"i.e. Devion"}
                            />
                        </div>
                        {/* NAME */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="name"
                                >
                                    Organization Name
                                </label>
                            </div>
                            <TextInput
                                onChange={handleInputChange}
                                value={formValues.name}
                                name={"name"}
                                id={"name"}
                                type={"text"}
                                placeholder={"i.e. Devion"}
                            />
                        </div>
                        {/* LOCATION */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="location"
                                >
                                    Location
                                </label>
                            </div>
                            <select
                                className={`cursor-pointer rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full`}
                                onChange={handleInputChange}
                                value={formValues.location}
                                name="location"
                                id="location"
                            >
                                <option value="">Select Location</option>
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
                        {/* INSTAGRAM */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="instagram"
                                >
                                    Instagram
                                </label>
                            </div>
                            <TextInput
                                onChange={handleInputChange}
                                value={formValues.instagram}
                                name={"instagram"}
                                id={"instagram"}
                                type={"text"}
                                placeholder={"i.e. Devion"}
                            />
                        </div>
                        {/* TIK TOK */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="tiktok"
                                >
                                    Tiktok
                                </label>
                            </div>
                            <TextInput
                                onChange={handleInputChange}
                                value={formValues.tiktok}
                                name={"tiktok"}
                                id={"tiktok"}
                                type={"text"}
                                placeholder={"i.e. Devion"}
                            />
                        </div>
                        {/* WEBSITE */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="website"
                                >
                                    Website
                                </label>
                            </div>
                            <TextInput
                                onChange={handleInputChange}
                                value={formValues.website}
                                name={"website"}
                                id={"website"}
                                type={"text"}
                                placeholder={"i.e. Devion"}
                            />
                        </div>
                        {/* PHONE */}
                        <div className={`flex flex-col gap-2 col-span-1`}>
                            <div className="flex justify-between items-center">
                                <label
                                    className={`text-white-base text-sm font-body font-normal `}
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                            </div>
                            <div className="grid grid-cols-6 gap-x-2">
                                <select
                                    className={`col-span-2 cursor-pointer rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[5px] py-[1px] w-full`}
                                    onChange={(event) => {
                                        setCountryCode(event.target.value);
                                    }}
                                    value={countryCode}
                                    name="countryCode"
                                    id="countryCode"
                                >
                                    {countryCodes.map((code) => (
                                        <option
                                            value={code.code}
                                            key={code.code}
                                        >
                                            {code.dial_code}
                                        </option>
                                    ))}
                                </select>

                                <TextInput
                                    onChange={handleInputChange}
                                    value={formValues.phone}
                                    name={"phone"}
                                    id={"phone"}
                                    type={"text"}
                                    placeholder={"i.e. Devion"}
                                    className={"col-span-4"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-10 gap-4 pb-5">
                        <FormButton
                            text={"Create Account"}
                            disabled={disabled}
                            loading={loading}
                            className={"max-w-[250px] py-4"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default OrganizationProfileForm;
