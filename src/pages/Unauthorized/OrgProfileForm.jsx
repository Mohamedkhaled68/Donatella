import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";
import { MdOutlineAddBox } from "react-icons/md";
import { LogoHeader, OrganizationProfileForm } from "../../components";
import { CiImageOn } from "react-icons/ci";

const OrgProfileForm = () => {
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(null); // Store the uploaded file
    const [previewUrl, setPreviewUrl] = useState(""); // Store preview URL
    const inputId = "media";

    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file size (e.g., max 5MB)
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        // if (file.size > maxFileSize) {
        //     alert("File size exceeds 5MB limit.");
        //     return;
        // }

        // Validate file type (image or video)
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please upload an image or video.");
            return;
        }

        setMedia(file);
        setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        setPreviewUrl("");
    };

    return (
        <>
            <section className="min-h-screen w-full text-white pb-10">
                <LogoHeader />
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <p>Loading...</p>
                    </div>
                )}
                <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                    <OrganizationProfileForm
                        loading={loading}
                        setLoading={setLoading}
                        imageUrl={previewUrl}
                    />
                    {/* Left Side */}
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="h-[80%] w-full flex flex-col gap-12 justify-center items-center">
                            <div className="border-thin border-white-base/10 w-[400px] h-[400px] rounded-full overflow-hidden flex justify-center items-center">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <CiImageOn
                                        className="text-gray-500"
                                        size={100}
                                    />
                                )}
                            </div>
                            <div className="flex w-[30%] justify-center items-center rounded-md h-[50px] bg-black/60 px-[40px]">
                                {media ? (
                                    <div className="w-full flex justify-between items-center">
                                        <div>
                                            <label
                                                htmlFor={inputId}
                                                className="cursor-pointer"
                                                aria-label="Edit media"
                                            >
                                                <FiEdit size={20} />
                                            </label>
                                            <input
                                                id={inputId}
                                                type="file"
                                                accept="image/*,video/*"
                                                onChange={handleMediaChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <CgCloseR
                                            onClick={handleRemoveMedia}
                                            className="cursor-pointer"
                                            size={20}
                                            aria-label="Remove media"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full flex justify-center items-center">
                                        <label
                                            htmlFor={inputId}
                                            className="cursor-pointer"
                                            aria-label="Add media"
                                        >
                                            <MdOutlineAddBox size={25} />
                                        </label>
                                        <input
                                            id={inputId}
                                            type="file"
                                            accept="image/*,video/*"
                                            onChange={handleMediaChange}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrgProfileForm;
