// import React, { useState } from "react";
// import { FiEdit } from "react-icons/fi";
// import { CgCloseR } from "react-icons/cg";
// import { CiImageOn } from "react-icons/ci";
// import { MdOutlineAddBox } from "react-icons/md";

// const LoadImage = ({ label, inputId, onImageChange, className }) => {
//     const [media, setMedia] = useState(null);

//     const handleMediaChange = (e) => {
//         const file = e.target.files[0];
//         if (
//             file &&
//             (file.type.startsWith("image/") || (inputId === "reel" && file.type.startsWith("video/")))
//         ) {
//             const mediaUrl = URL.createObjectURL(file);
//             setMedia(mediaUrl);
//             onImageChange(inputId, mediaUrl);
//         } else {
//             alert("Please select a valid file (image or video).");
//         }
//     };

//     const handleRemoveMedia = () => {
//         setMedia(null);
//         onImageChange(inputId, null);
//     };

//     return (
//         <div
//             className={`w-full flex flex-col justify-between items-center relative rounded-md overflow-hidden border border-gray-700 ${className}`}
//         >
//             <div className="absolute left-[0.8px] top-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center h-[50px] rounded-md bg-black/60 text-xl font-medium font-display px-[40px]">
//                 {label}
//             </div>

//             <div className="flex-grow flex justify-center items-center">
//                 {media ? (
//                     inputId === "reel" && media.endsWith(".mp4") ? ( // Display video if inputId is reel
//                         <video
//                             src={media}
//                             muted
//                             autoPlay={false}
//                             className="w-full h-full object-cover"
//                         />
//                     ) : (
//                         <img
//                             src={media}
//                             alt="Uploaded"
//                             className="w-full h-full object-cover"
//                         />
//                     )
//                 ) : (
//                     <CiImageOn className="text-gray-500" size={100} />
//                 )}
//             </div>

//             <div className="absolute left-[0.8px] bottom-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center rounded-md h-[50px] bg-black/60 px-[40px]">
//                 {media ? (
//                     <div className="w-full flex justify-between items-center">
//                         <div>
//                             <label htmlFor={inputId} className="cursor-pointer">
//                                 <FiEdit size={20} />
//                             </label>
//                             <input
//                                 id={inputId}
//                                 type="file"
//                                 accept={inputId === "reel" ? "image/*,video/*" : "image/*"}
//                                 onChange={handleMediaChange}
//                                 className="hidden"
//                             />
//                         </div>
//                         <CgCloseR
//                             onClick={handleRemoveMedia}
//                             className="cursor-pointer"
//                             size={20}
//                         />
//                     </div>
//                 ) : (
//                     <div className="w-full flex justify-center items-center">
//                         <label htmlFor={inputId} className="cursor-pointer">
//                             <MdOutlineAddBox size={25} />
//                         </label>
//                         <input
//                             id={inputId}
//                             type="file"
//                             accept={inputId === "reel" ? "image/*,video/*" : "image/*"}
//                             onChange={handleMediaChange}
//                             className="hidden"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LoadImage;

import React, { useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";

const LoadImage = ({ label, inputId, onImageChange, className }) => {
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);

    const handleMediaChange = async (e) => {
        const file = e.target.files[0];
        if (
            file &&
            (file.type.startsWith("image/") ||
                (inputId === "reel" && file.type.startsWith("video/")))
        ) {
            const mediaUrl = URL.createObjectURL(file);

            // Handle video thumbnail generation
            if (file.type.startsWith("video/")) {
                setLoading(true);
                const thumbnail = await generateVideoThumbnail(mediaUrl);
                setMedia(thumbnail);
                onImageChange(inputId, thumbnail);
                setLoading(false);
            } else {
                setMedia(mediaUrl);
                onImageChange(inputId, mediaUrl);
            }
        } else {
            alert("Please select a valid file (image or video).");
        }
    };

    const generateVideoThumbnail = (videoUrl) => {
        return new Promise((resolve) => {
            const videoElement = document.createElement("video");
            videoElement.src = videoUrl;
            videoElement.currentTime = 2; // Capture frame at 2 seconds

            videoElement.onloadeddata = () => {
                const canvas = document.createElement("canvas");
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const context = canvas.getContext("2d");
                context.drawImage(
                    videoElement,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const thumbnail = canvas.toDataURL("image/png");
                resolve(thumbnail);
                URL.revokeObjectURL(videoUrl);
            };
        });
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        onImageChange(inputId, null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleMediaChange({ target: { files: [file] } });
    };

    return (
        <div
            className={`w-full flex flex-col justify-between items-center relative rounded-md overflow-hidden border border-gray-700 ${className}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="absolute left-[0.8px] top-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center h-[50px] rounded-md bg-black/60 text-xl font-medium font-display px-[40px]">
                {label}
            </div>

            <div className="flex-grow flex justify-center items-center">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : media ? (
                    <img
                        src={media}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                            (e.target.src = "fallback-image-url.png")
                        }
                    />
                ) : (
                    <CiImageOn className="text-gray-500" size={100} />
                )}
            </div>

            <div className="absolute left-[0.8px] bottom-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center rounded-md h-[50px] bg-black/60 px-[40px]">
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
                                accept={
                                    inputId === "reel"
                                        ? "image/*,video/*"
                                        : "image/*"
                                }
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
                            accept={
                                inputId === "reel"
                                    ? "image/*,video/*"
                                    : "image/*"
                            }
                            onChange={handleMediaChange}
                            className="hidden"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadImage;
