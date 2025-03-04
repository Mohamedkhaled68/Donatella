import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";
import { MdOutlineAddBox } from "react-icons/md";
import { Loading, LogoHeader, OrganizationProfileForm } from "../../components";
import { CiImageOn } from "react-icons/ci";
import useUploadImage from "../../hooks/auth/useUploadImage";
import toast from "react-hot-toast";

const OrgProfileForm = () => {
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const inputId = "media";

    const { mutateAsync: uploadImage } = useUploadImage();

    const handleMediaChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024)
            return toast.error("File size exceeds 1MB limit.");

        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload an image.");
            return;
        }
        setImageLoading(true);
        try {
            const data = await uploadImage(file);
            setMedia(data);

            setPreviewUrl(data);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to upload image."
            );
        } finally {
            setImageLoading(false);
        }
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        setPreviewUrl("");
    };

    return (
        <>
            <section className="relative min-h-screen w-full text-white pb-10">
                <LogoHeader />
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
                        <Loading />
                    </div>
                )}
                <div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
                    <OrganizationProfileForm
                        loading={loading}
                        setLoading={setLoading}
                        imageUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        setMedia={setMedia}
                    />
                    {/* Left Side */}
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="h-[80%] w-full flex flex-col gap-12 justify-center items-center">
                            {imageLoading ? (
                                <div className="border-thin border-white-base/10 w-[400px] h-[400px] rounded-full overflow-hidden flex justify-center items-center">
                                    <Loading />
                                </div>
                            ) : (
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
                            )}

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
                                                accept="image/jpeg,image/png"
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
                                            accept="image/jpeg,image/png"
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
