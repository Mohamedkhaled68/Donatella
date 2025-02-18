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
            console.log(location.state.category);
            setRole(location.state.category);
        }

        if (location.state.category === "Model") {
            setImageUrls(initialModelImagesValues);
        } else if (
            location.state.category === "Videographer" ||
            location.state.category === "Photographer" ||
            location.state.category === "Editor"
        ) {
            setImageUrls(initialRestImagesValues);
        } else if (location.state.category === "Musician") {
            setImageUrls(initialMusicianImagesValues);
        } else if (location.state.category === "Fashionista") {
            setImageUrls(initialFashionImagesValues);
        } else if (location.state.category === "Artist") {
            setImageUrls(initialArtistImagesValues);
        } else if (location.state.category === "Athlete") {
            setImageUrls(initialAthleteImagesValues);
        } else if (location.state.category === "Beautician") {
            setImageUrls(initialBeatyImagesValues);
        } else if (location.state.category === "Tour Guide") {
            setImageUrls(initialTourismImagesValues);
        }
    }, []);
    // [location.state, navigate]

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
                    <BackButton className={"mt-10 ml-4"} />
                    <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                        {role === "Model" && (
                            <ModelProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Videographer" && (
                            <VideographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Photographer" && (
                            <PhotographerProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Editor" && (
                            <EditorProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Musician" && (
                            <MusicianProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Fashionista" && (
                            <FashionProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Artist" && (
                            <ArtistProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Athlete" && (
                            <AthleteProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Beautician" && (
                            <BeautyProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role === "Tour Guide" && (
                            <TourismProfileForm
                                imageUrls={imageUrls}
                                loading={loading}
                                setLoading={setLoading}
                                role={role}
                            />
                        )}
                        {role && (
                            <>
                                {role === "model" && (
                                    <div className="grid grid-cols-2 gap-6 justify-items-center self-start">
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

                                {role === "Videographer" && (
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
                                {role === "Photographer" && (
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
                                {role === "Editor" && (
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

                                {role === "Musician" && (
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

                                {role === "Fashionista" && (
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

                                {role === "Artist" && (
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
                                {role === "Athlete" && (
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
                                {role === "Beautician" && (
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
                                {role === "Tour Guide" && (
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
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileFormSection;
