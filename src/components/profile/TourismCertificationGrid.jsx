import { FaPlus } from "react-icons/fa";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import useUploadImage from "../../hooks/auth/useUploadImage";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";
import toast from "react-hot-toast";

const TourismCertificationGrid = ({ userStatus }) => {
    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: uploadImage } = useUploadImage();
    const { setUserStatus } = useUserStore((state) => state);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    // Get the reels array or use an empty array if undefined
    const certificates =
        userStatus?.individual?.specialtyInfo?.certificates || [];

    // Ensure there are always 4 items by adding placeholders for missing items
    const items =
        userStatus?.individual?.role === "TOURISM"
            ? [...certificates, ...Array(3 - certificates.length).fill(null)]
            : [...certificates, ...Array(4 - certificates.length).fill(null)];

    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];
        if (file.size > 1 * 1024 * 1024)
            return toast.error("File size exceeds 1MB limit.");

        if (!file) return;

        setLoading(index);
        setError(null);

        try {
            // Upload the image and get the URL or data
            const data = await uploadImage(file);

            // Create a new array with the updated image at the specified index
            const updatedCertificate = [
                ...userStatus.individual.specialtyInfo.certificates,
            ];
            updatedCertificate[index] = data; // Replace the image at the specific index

            const updatedSpecialtyInfo = {
                ...userStatus.individual.specialtyInfo,
                portfolioPictures: updatedCertificate,
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
            toast.error("Error uploading image, please try again.");
            setLoading(null);
        }
    };

    return (
        <div
            className={`w-full grid ${
                userStatus?.individual?.role === "TOURISM"
                    ? "grid-cols-3 gap-x-[7.3rem]"
                    : "grid-cols-4 gap-6"
            } justify-items-center`}
        >
            {items.map((certificate, index) => (
                <div
                    key={index}
                    className={`${
                        userStatus?.individual?.role === "TOURISM"
                            ? "w-[350px] h-full"
                            : "col-span-2 h-[220px] w-full"
                    }`}
                >
                    {certificate ? (
                        <div
                            className={`relative group max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                        >
                            <img
                                className="w-[100%] h-full object-cover"
                                src={certificate}
                                alt="profileImage"
                            />
                            <div className="absolute bottom-0 left-0 w-full group-hover:opacity-100 opacity-0 duration-300">
                                <label
                                    className="w-full h-full cursor-pointer"
                                    htmlFor={`certificate-upload-${index}`}
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
                                        id={`certificate-upload-${index}`}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label
                            className={`${
                                userStatus?.individual?.role === "TOURISM"
                                    ? "h-full"
                                    : "col-span-2"
                            } cursor-pointer relative max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30`}
                            htmlFor={`certificate-upload-${index}`}
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
                                id={`certificate-upload-${index}`}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TourismCertificationGrid;
