import { FaPlus } from "react-icons/fa";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import useUploadImage from "../../hooks/auth/useUploadImage";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";
import toast from "react-hot-toast";

const PreviousWorkGrid = () => {
    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: uploadImage } = useUploadImage();
    const { setUserStatus, userStatus } = useUserStore((state) => state);
    const [loading, setLoading] = useState(null);
    const previousWork =
        userStatus?.individual?.specialtyInfo?.previousWork || [];

    const items = [
        ...previousWork,
        ...Array(4 - previousWork.length).fill(null),
    ];

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
            const updatedPreviousWork = [
                ...userStatus.individual.specialtyInfo.previousWork,
            ];
            updatedPreviousWork[index] = data; // Replace the image at the specific index

            const updatedSpecialtyInfo = {
                ...userStatus.individual.specialtyInfo,
                previousWork: updatedPreviousWork,
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
        <div className={`w-full grid grid-cols-4 gap-6 justify-items-center`}>
            {items.map((previousWork, index) => (
                <div key={index} className={`col-span-2 w-full h-[220px]`}>
                    {previousWork ? (
                        <div
                            className={`relative group max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                        >
                            <img
                                className="w-[100%] h-full object-cover"
                                src={previousWork}
                                alt="profileImage"
                            />
                            <div className="absolute bottom-0 left-0 w-full group-hover:opacity-100 opacity-0 duration-300">
                                <label
                                    className="w-full h-full cursor-pointer"
                                    htmlFor={`previousWork-upload-${index}`}
                                >
                                    <div className="w-full overflow-hidden flex justify-center items-center rounded-md border-thin border-white-base/30 h-full p-2 bg-[#3B3B3B]">
                                        {loading === index ? (
                                            <div className="text-center text-white">
                                                Uploading...
                                            </div>
                                        ) : (
                                            <FaPlus size={25} />
                                        )}
                                    </div>
                                    <input
                                        onChange={(event) =>
                                            handleImageUpload(event, index)
                                        }
                                        type="file"
                                        id={`previousWork-upload-${index}`}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label
                            className={`cursor-pointer relative max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                            htmlFor={`previousWork-upload-${index}`}
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
                                id={`previousWork-upload-${index}`}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PreviousWorkGrid;
