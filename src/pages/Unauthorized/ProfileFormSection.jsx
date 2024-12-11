import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    BackButton,
    EditorProfileForm,
    Loading,
    LogoHeader,
    ModelProfileForm,
    PhotographerProfileForm,
    VideographerProfileForm,
} from "../../components";
import LoadImage from "../../components/onBoarding/LoadImage";
import {
    initialModelImagesValues,
    initialRestImagesValues,
} from "../../utils/constants";

const modelImagesInputs = [
    { id: "profile", label: "Profile Picture" },
    { id: "cover", label: "Cover Picture" },
    { id: "headshot", label: "Headshot" },
    { id: "fullBody", label: "Full Body" },
];

const restImagesInputs = [
    { id: "portfolio1", label: "Portfolio - 1" },
    { id: "portfolio2", label: "Portfolio - 2" },
    { id: "profile", label: "Profile Picture" },
    { id: "reel", label: "Tik Tok / IG Reel" },
];

const ProfileFormSection = () => {
    const [role, setRole] = useState("");
    const [imageUrls, setImageUrls] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (inputId, imageUrl) => {
        setImageUrls((prev) => ({
            ...prev,
            [inputId]: imageUrl,
        }));
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate("/experience-form");
        } else {
            setRole(location.state.category);
        }

        if (location.state.category === "MODEL") {
            setImageUrls(initialModelImagesValues);
        } else {
            setImageUrls(initialRestImagesValues);
        }
    }, [location.state, navigate]);

    return (
        <>
            <section className="min-h-screen w-full text-white pb-10">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}
                <LogoHeader />
                <div className="flex gap-[50px]">
                    <BackButton className={"mt-10 ml-4"}/>
                    <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                        {role.toLocaleLowerCase() === "model" && (
                            <ModelProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role.toLocaleLowerCase() === "videographer" && (
                            <VideographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role.toLocaleLowerCase() === "photographer" && (
                            <PhotographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role.toLocaleLowerCase() === "editor" && (
                            <EditorProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        <div className="grid grid-cols-2 gap-6 justify-items-center">
                            {role.toLocaleLowerCase() === "model" &&
                                modelImagesInputs.map((input, idx) => (
                                    <LoadImage
                                        onImageChange={handleImageChange}
                                        key={input.id}
                                        label={input.label}
                                        inputId={`${input.id}`}
                                        className={
                                            input.id.startsWith("portfolio")
                                                ? "col-span-2"
                                                : "col-span-1 max-w-[250px] h-[320px]"
                                        }
                                    />
                                ))}
                            {role.toLocaleLowerCase() !== "model" &&
                                restImagesInputs.map((input, idx) => (
                                    <LoadImage
                                        onImageChange={handleImageChange}
                                        key={input.id}
                                        label={input.label}
                                        inputId={`${input.id}`}
                                        className={
                                            input.id.startsWith("portfolio")
                                                ? "col-span-2 h-[150px]"
                                                : "col-span-1 max-w-[250px] h-[320px]"
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileFormSection;
