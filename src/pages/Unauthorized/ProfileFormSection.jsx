import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoHeader, ModelProfileForm } from "../../components";
import LoadImage from "../../components/onBoarding/LoadImage";
import { initialModelImagesValues } from "../../utils/constants";

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
    const [imageUrls, setImageUrls] = useState(initialModelImagesValues);

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
            navigate("/individual-form");
        } else {
            console.log(location.state.category);

            setRole(location.state.category);
        }
    }, [location.state, navigate]);

    return (
        <>
            <section className="min-h-screen w-full text-white pb-10">
                <LogoHeader />
                <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                    {role.toLocaleLowerCase() === "model" && (
                        <ModelProfileForm imageUrls={imageUrls} />
                    )}
                    <div className="grid grid-cols-2 gap-6 justify-items-center">
                        {modelImagesInputs.map((input, idx) => (
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileFormSection;