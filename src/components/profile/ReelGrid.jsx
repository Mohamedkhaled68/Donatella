import { FaPlus } from "react-icons/fa";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import useUploadImage from "../../hooks/auth/useUploadImage";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";

const ReelGrid = ({ userStatus }) => {
    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: uploadImage } = useUploadImage();
    const { setUserStatus } = useUserStore((state) => state);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    // Get the reels array or use an empty array if undefined
    const reels = userStatus?.individual?.specialtyInfo?.reels || [];

    // Ensure there are always 4 items by adding placeholders for missing items
    const items = [...reels, ...Array(4 - reels.length).fill(null)];

    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];

        if (!file) return;

        setLoading(index);
        setError(null);

        try {
            // Upload the image and get the URL or data
            const data = await uploadImage(file);
            console.log(data);
            

            // Create a new array with the updated image at the specified index
            const updatedReels = [...userStatus.individual.specialtyInfo.reels];
            updatedReels[index] = data; // Replace the image at the specific index

            const updatedSpecialtyInfo = {
                ...userStatus.individual.specialtyInfo,
                reels: updatedReels,
            };

            const updatedUserStatus = {
                ...userStatus,
                individual: {
                    ...userStatus.individual,
                    specialtyInfo: updatedSpecialtyInfo,
                },
            };

            console.log(updatedUserStatus);

            // Update the backend
            const { firstName, lastName, fullName, ...rest } =
                updatedUserStatus.individual;
            await updateMe({ ...rest });

            setUserStatus(updatedUserStatus);
            console.log("Updated user status:", updatedUserStatus);
            setLoading(null);
        } catch (err) {
            console.error("Error uploading image:", err);
            setError("Error uploading image, please try again.");
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center">
            {items.map((reel, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-6 w-[228px]"
                >
                    {reel ? (
                        <div className="relative w-full h-full overflow-hidden rounded-md border-thin border-white-base/30">
                            <img
                                className="max-w-[100%] h-full object-cover"
                                src={reel}
                                alt="reel"
                            />
                            <div className="absolute bottom-0 left-0  w-full">
                                <label
                                    className="w-full h-full cursor-pointer"
                                    htmlFor={`reel-upload-${index}`}
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
                                        id={`reel-upload-${index}`}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label
                            className="w-full h-full cursor-pointer"
                            htmlFor={`reel-upload-${index}`}
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
                                id={`reel-upload-${index}`}
                                className="hidden"
                            />
                        </label>
                    )}
                    {error && (
                        <div className="text-red-500 text-sm mt-2 text-center">
                            {error}
                        </div> // Display error message
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReelGrid;
