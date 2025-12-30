import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ArtistProfileForm,
    AthleteProfileForm,
    BackButton,
    BeautyProfileForm,
    EditorProfileForm,
    FashionProfileForm,
    Loading,
    LogoHeader,
    ModelProfileForm,
    MusicianProfileForm,
    PhotographerProfileForm,
    TourismProfileForm,
    VideographerProfileForm,
} from "../../components";
import GenericProfileForm from "../../components/onBoarding/Profile Forms/GenericProfileForm";
import LoadImage from "../../components/onBoarding/LoadImage";
import {
    initialModelImagesValues,
    initialMusicianImagesValues,
    initialRestImagesValues,
    initialFashionImagesValues,
    initialArtistImagesValues,
    initialAthleteImagesValues,
    initialBeatyImagesValues,
    initialTourismImagesValues,
    initialGenericImagesValues,
} from "../../utils/constants";

const modelImagesInputs = [
    { id: "profile", label: "Profile Picture" },
    { id: "portfolio", label: "Portfolio Picture" },
    { id: "headshot", label: "Headshot" },
    { id: "fullBody", label: "Full Body" },
];

const restImagesInputs = [
    { id: "portfolio1", label: "Portfolio - 1" },
    { id: "portfolio2", label: "Portfolio - 2" },
    { id: "profile", label: "Profile Picture" },
    { id: "reel", label: "Tik Tok / IG Reel" },
];

const musicianImagesInputs = [{ id: "profile", label: "Profile Picture" }];
const fashionImagesInputs = [
    { id: "previousWork1", label: "Previous Work - 1" },
    { id: "previousWork2", label: "Previous Work - 2" },
    { id: "certificateProof", label: "Certificate proof" },
    { id: "profile", label: "Profile Picture" },
];
const artistImagesInputs = [
    { id: "previousWork1", label: "Previous Work - 1" },
    { id: "previousWork2", label: "Previous Work - 2" },
    { id: "profile", label: "Profile Picture" },
];
const athleteImagesInputs = [
    { id: "fullbody", label: "Full Body Picture" },
    { id: "trophies", label: "Trophies or Medals" },
    { id: "profile", label: "Profile Picture" },
];
const beautyImagesInputs = [
    { id: "previousWork1", label: "Previous Work - 1" },
    { id: "previousWork2", label: "Previous Work - 2" },
    { id: "certificateProof", label: "Certificate proof" },
    { id: "profile", label: "Profile Picture" },
];
const tourismImagesInputs = [
    { id: "certificateProof", label: "Certificate proof" },
    { id: "profile", label: "Profile Picture" },
];

const genericImagesInputs = [
    { id: "profile", label: "Profile Picture" },
    { id: "portfolio1", label: "Portfolio - 1" },
    { id: "portfolio2", label: "Portfolio - 2" },
];

// Predefined category display names
const predefinedCategoryDisplayNames = [
    "Model",
    "Videographer",
    "Photographer",
    "Editor",
    "Musician",
    "Fashionista",
    "Artist",
    "Athlete",
    "Beautician",
    "Tour Guide",
];

// Predefined category names (enum values from backend)
const predefinedCategoryNames = [
    "MODEL",
    "VIDEOGRAPHER",
    "PHOTOGRAPHER",
    "EDITOR",
    "MUSIC_AND_SOUND_ENGINEER",
    "FASHION",
    "ARTIST",
    "ATHLETE",
    "BEAUTY",
    "TOURISM",
];

const ProfileFormSection = () => {
    const [role, setRole] = useState("");
    const [categoryName, setCategoryName] = useState("");
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
            setRole(location.state.categoryName);
            setCategoryName(location.state.categoryName || location.state.category);
        }

        // Check if it's a dynamic category (not in predefined list)
        // Check by category name if available, otherwise by display name
        const catName = location.state?.categoryName || localStorage.getItem("USER_ROLE") || "";
        const isDynamicCategory = catName && !predefinedCategoryNames.includes(catName);

        if (isDynamicCategory) {
            setImageUrls(initialGenericImagesValues);
        } else if (location.state.categoryName === "MODEL") {
            setImageUrls(initialModelImagesValues);
        } else if (
            location.state.categoryName === "VIDEOGRAPHER" ||
            location.state.categoryName === "PHOTOGRAPHER" ||
            location.state.categoryName === "EDITOR"
        ) {
            setImageUrls(initialRestImagesValues);
        } else if (location.state.categoryName === "MUSIC_AND_SOUND_ENGINEER") {
            setImageUrls(initialMusicianImagesValues);
        } else if (location.state.categoryName === "FASHION") {
            setImageUrls(initialFashionImagesValues);
        } else if (location.state.categoryName === "ARTIST") {
            setImageUrls(initialArtistImagesValues);
        } else if (location.state.categoryName === "ATHLETE") {
            setImageUrls(initialAthleteImagesValues);
        } else if (location.state.categoryName === "BEAUTY") {
            setImageUrls(initialBeatyImagesValues);
        } else if (location.state.categoryName === "TOURISM") {
            setImageUrls(initialTourismImagesValues);
        }
    }, []);
    // [location.state, navigate]

    return (
        <>
            <section className="min-h-screen h-[100%] w-full text-white pb-10">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}
                <LogoHeader />
                <div className="flex gap-[50px]">
                    <BackButton
                        path={"/experience-form"}
                        className={"mt-10 ml-4"}
                    />
                    <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                        {role === "MODEL" && (
                            <ModelProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "VIDEOGRAPHER" && (
                            <VideographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "PHOTOGRAPHER" && (
                            <PhotographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "EDITOR" && (
                            <EditorProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "MUSIC_AND_SOUND_ENGINEER" && (
                            <MusicianProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "FASHION" && (
                            <FashionProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "ARTIST" && (
                            <ArtistProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "ATHLETE" && (
                            <AthleteProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "BEAUTY" && (
                            <BeautyProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "TOURISM" && (
                            <TourismProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {(() => {
                            const catName = categoryName || localStorage.getItem("USER_ROLE") || "";
                            const isDynamic = catName && !predefinedCategoryNames.includes(catName);
                            return isDynamic && imageUrls && (
                                <GenericProfileForm
                                    imageUrls={imageUrls}
                                    loading={loading}
                                    setLoading={setLoading}
                                    role={catName}
                                />
                            );
                        })()}
                        {role && (
                            <>
                                {role === "MODEL" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start h-full px-4">
                                        {modelImagesInputs.map((input) => (
                                            <LoadImage
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {role === "VIDEOGRAPHER" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start">
                                        {restImagesInputs.map((input) => (
                                            <LoadImage
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                className={
                                                    input.id.startsWith(
                                                        "portfolio"
                                                    )
                                                        ? "col-span-2 h-[150px]"
                                                        : "col-span-1 max-w-[250px] h-[320px]"
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                                {role === "PHOTOGRAPHER" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start">
                                        {restImagesInputs.map((input) => (
                                            <LoadImage
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                className={
                                                    input.id.startsWith(
                                                        "portfolio"
                                                    )
                                                        ? "col-span-2 h-[150px]"
                                                        : "col-span-1 max-w-[250px] h-[320px]"
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                                {role === "EDITOR" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start">
                                        {restImagesInputs.map((input) => (
                                            <LoadImage
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                className={
                                                    input.id.startsWith(
                                                        "portfolio"
                                                    )
                                                        ? "col-span-2 h-[150px]"
                                                        : "col-span-1 max-w-[250px] h-[320px]"
                                                }
                                            />
                                        ))}
                                    </div>
                                )}

                                {role === "MUSIC_AND_SOUND_ENGINEER" && (
                                    <div className="w-[50%] mx-auto">
                                        {musicianImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[50%] mx-auto"}
                                            />
                                        ))}
                                    </div>
                                )}

                                {role === "FASHION" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                        {fashionImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[320px]"}
                                            />
                                        ))}
                                    </div>
                                )}

                                {role === "ARTIST" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                        {artistImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[320px]"}
                                            />
                                        ))}
                                    </div>
                                )}
                                {role === "ATHLETE" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                        {athleteImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[320px]"}
                                            />
                                        ))}
                                    </div>
                                )}
                                {role === "BEAUTY" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                        {beautyImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[320px]"}
                                            />
                                        ))}
                                    </div>
                                )}
                                {role === "TOURISM" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                        {tourismImagesInputs.map((input) => (
                                            <LoadImage
                                                key={input.id}
                                                label={input.label}
                                                inputId={`${input.id}`}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                className={"h-[320px]"}
                                            />
                                        ))}
                                    </div>
                                )}
                                {(() => {
                                    const catName = categoryName || localStorage.getItem("USER_ROLE") || "";
                                    const isDynamic = catName && !predefinedCategoryNames.includes(catName);
                                    return isDynamic && (
                                        <div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
                                            {genericImagesInputs.map((input) => (
                                                <LoadImage
                                                    key={input.id}
                                                    label={input.label}
                                                    inputId={`${input.id}`}
                                                    onImageChange={
                                                        handleImageChange
                                                    }
                                                    className={
                                                        input.id.startsWith(
                                                            "portfolio"
                                                        )
                                                            ? "col-span-2 h-[150px]"
                                                            : "col-span-1 max-w-[250px] h-[320px]"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    );
                                })()}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileFormSection;
