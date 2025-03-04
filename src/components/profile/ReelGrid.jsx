import { FaPlus } from "react-icons/fa";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import useUploadVideo from "../../hooks/auth/useUploadVideo";

const ReelGrid = ({ userStatus }) => {
    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: uploadVideo } = useUploadVideo();
    const { setUserStatus } = useUserStore((state) => state);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);

    const reels = userStatus?.individual?.specialtyInfo?.reels || [];
    const items = [...reels, ...Array(4 - reels.length).fill(null)];

    const handleReelUpload = async (event, index) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024)
            return toast.error("File size exceeds 5MB limit.");
        setLoading(index);
        setError(null);

        try {
            const data = await uploadVideo(file);
            const updatedReels = [...userStatus.individual.specialtyInfo.reels];
            updatedReels[index] = data;

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

            const { firstName, lastName, fullName, ...rest } =
                updatedUserStatus.individual;
            await updateMe({ ...rest });

            setUserStatus(updatedUserStatus);
            setLoading(null);
        } catch (err) {
            setError("Error uploading Reel, please try again.");
            setLoading(null);
        }
    };

    useEffect(() => {
        if (currentVideo) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }
        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [currentVideo]);

    return (
        <>
            {currentVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="z-[1000] fixed inset-0 bg-black/70 flex justify-center items-center"
                    role="dialog"
                    aria-modal="true"
                />
            )}

            <div className="grid grid-cols-4 gap-x-[7.5rem] justify-items-center h-full">
                {currentVideo && (
                    <div
                        className="absolute bg-[#3B3B3B] p-4 rounded-lg shadow-lg z-[100000]"
                        style={{
                            top: `${window.scrollY - 30}px`,
                            left: `50%`,
                            transform: "translateX(-50%)",
                            width: "500px",
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                setCurrentVideo(null);
                            }}
                            className="top-3 right-3 text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition"
                            aria-label="Close video modal"
                        >
                            <IoClose size={20} />
                        </button>
                        <div>
                            <video
                                className="w-full h-auto max-h-[80vh] object-contain"
                                src={currentVideo}
                                controls
                            />
                        </div>
                    </div>
                )}
                {items.map((reel, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-center items-center gap-6 w-[230px] min-h-[380px]"
                    >
                        {reel ? (
                            <div className="relative group w-full h-full overflow-hidden rounded-md border-thin border-white-base/30">
                                <div className="w-full h-full flex justify-center items-center relative">
                                    <video
                                        className="w-[100%] object-fill"
                                        src={reel}
                                        alt="reel"
                                    />
                                    <div
                                        onClick={() => {
                                            setCurrentVideo(reel);
                                        }}
                                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] h-[50px] rounded-full bg-[#3B3B3B] flex justify-center items-center group hover:scale-105 duration-300 cursor-pointer"
                                    >
                                        <FaPlay className="group-hover:scale-105 duration-300" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0  w-full group-hover:opacity-100 opacity-0 duration-300">
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
                                                handleReelUpload(event, index)
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
                                        </div>
                                    ) : (
                                        <FaPlus size={75} />
                                    )}
                                </div>
                                <input
                                    onChange={(event) =>
                                        handleReelUpload(event, index)
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
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReelGrid;
