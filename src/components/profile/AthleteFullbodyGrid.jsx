import { FaPlus } from "react-icons/fa";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import useUploadImage from "../../hooks/auth/useUploadImage";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";
import toast from "react-hot-toast";

const AthleteFullbodyGrid = () => {
    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: uploadImage } = useUploadImage();
    const { setUserStatus, userStatus } = useUserStore((state) => state);
    const [loading, setLoading] = useState(null);
    const fullBody = userStatus?.individual?.specialtyInfo?.bodyPictures || [];

    const items = [...fullBody, ...Array(4 - fullBody.length).fill(null)];

    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];

        if (!file) return;
        if (file.size > 1 * 1024 * 1024)
            return toast.error("File size exceeds 1MB limit.");
        setLoading(index);

        try {
            // Upload the image and get the URL or data
            const data = await uploadImage(file);

            // Create a new array with the updated image at the specified index
            const updatedFullBodyShots = [
                ...userStatus.individual.specialtyInfo.bodyPictures,
            ];
            updatedFullBodyShots[index] = data; // Replace the image at the specific index

            const updatedSpecialtyInfo = {
                ...userStatus.individual.specialtyInfo,
                bodyPictures: updatedFullBodyShots,
            };

            const updatedUserStatus = {
                ...userStatus,
                individual: {
                    ...userStatus.individual,
                    specialtyInfo: updatedSpecialtyInfo,
                },
            };

            // Update the backend
            const { firstName, lastName, fullName, ...rest } =
                updatedUserStatus.individual;
            await updateMe({ ...rest });

            setUserStatus(updatedUserStatus);
            setLoading(null);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Error uploading image"
            );
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center h-full">
            {items.map((fullBody, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-6 w-[230px] min-h-[380px]"
                >
                    {fullBody ? (
                        <div className="relative group w-full h-full overflow-hidden rounded-md border-thin border-white-base/30">
                            <img
                                className="max-w-[100%] h-full object-cover"
                                src={fullBody}
                                alt="profileImage"
                            />
                            <div className="absolute bottom-0 left-0  w-full group-hover:opacity-100 opacity-0 duration-300">
                                <label
                                    className="w-full h-full cursor-pointer"
                                    htmlFor={`fullbody-upload-${index}`}
                                >
                                    <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full p-2 bg-[#3B3B3B]">
                                        {loading === index ? (
                                            <div className="text-center text-white">
                                                Uploading...
                                            </div> // Display loading text
                                        ) : (
                                            <FaPlus size={25} />
                                        )}
                                    </div>
                                    <input
                                        onChange={(event) =>
                                            handleImageUpload(event, index)
                                        }
                                        type="file"
                                        id={`fullbody-upload-${index}`}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label
                            className="w-full h-full cursor-pointer"
                            htmlFor={`fullbody-upload-${index}`}
                        >
                            <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full bg-[#3B3B3B]">
                                {loading === index ? (
                                    <div className="text-center text-white">
                                        Uploading...
                                    </div> // Display loading text
                                ) : (
                                    <FaPlus size={75} />
                                )}
                            </div>
                            <input
                                onChange={(event) =>
                                    handleImageUpload(event, index)
                                }
                                type="file"
                                id={`fullbody-upload-${index}`}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AthleteFullbodyGrid;
