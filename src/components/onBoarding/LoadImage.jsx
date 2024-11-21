// import React, { useState } from "react";
// import { FiEdit } from "react-icons/fi";
// import { CgCloseR } from "react-icons/cg";
// import { CiImageOn } from "react-icons/ci";
// import { MdOutlineAddBox } from "react-icons/md";

// const LoadImage = ({ label, inputId, onImageChange, className }) => {
//     const [image, setImage] = useState(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith("image/")) {
//             const imageUrl = URL.createObjectURL(file);
//             setImage(imageUrl);
//             onImageChange(inputId, imageUrl);
//         } else {
//             alert("Please select a valid image file.");
//         }
//     };

//     const handleRemoveImage = () => {
//         setImage(null);
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
//                 {image ? (
//                     <img
//                         src={image}
//                         alt="Uploaded"
//                         className="w-full h-full object-cover"
//                     />
//                 ) : (
//                     <CiImageOn className="text-gray-500" size={100} />
//                 )}
//             </div>

//             <div className="absolute left-[0.8px] bottom-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center rounded-md h-[50px] bg-black/60 px-[40px]">
//                 {image ? (
//                     <div className="w-full flex justify-between items-center">
//                         <div>
//                             <label htmlFor={inputId} className="cursor-pointer">
//                                 <FiEdit size={20} />
//                             </label>
//                             <input
//                                 id={inputId}
//                                 type="file"
//                                 accept="image/*, video/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                             />
//                         </div>
//                         <CgCloseR
//                             onClick={handleRemoveImage}
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
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="hidden"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LoadImage;


import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";

const LoadImage = ({ label, inputId, onImageChange, className }) => {
    const [media, setMedia] = useState(null);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (
            file &&
            (file.type.startsWith("image/") || (inputId === "reel" && file.type.startsWith("video/")))
        ) {
            const mediaUrl = URL.createObjectURL(file);
            setMedia(mediaUrl);
            onImageChange(inputId, mediaUrl);
        } else {
            alert("Please select a valid file (image or video).");
        }
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        onImageChange(inputId, null);
    };

    return (
        <div
            className={`w-full flex flex-col justify-between items-center relative rounded-md overflow-hidden border border-gray-700 ${className}`}
        >
            <div className="absolute left-[0.8px] top-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center h-[50px] rounded-md bg-black/60 text-xl font-medium font-display px-[40px]">
                {label}
            </div>

            <div className="flex-grow flex justify-center items-center">
                {media ? (
                    inputId === "reel" && media.endsWith(".mp4") ? ( // Display video if inputId is reel
                        <video
                            src={media}
                            muted
                            autoPlay={false}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={media}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                    )
                ) : (
                    <CiImageOn className="text-gray-500" size={100} />
                )}
            </div>

            <div className="absolute left-[0.8px] bottom-[0.8px] w-[calc(100%-0.8px)] flex justify-center items-center rounded-md h-[50px] bg-black/60 px-[40px]">
                {media ? (
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <label htmlFor={inputId} className="cursor-pointer">
                                <FiEdit size={20} />
                            </label>
                            <input
                                id={inputId}
                                type="file"
                                accept={inputId === "reel" ? "image/*,video/*" : "image/*"}
                                onChange={handleMediaChange}
                                className="hidden"
                            />
                        </div>
                        <CgCloseR
                            onClick={handleRemoveMedia}
                            className="cursor-pointer"
                            size={20}
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-center items-center">
                        <label htmlFor={inputId} className="cursor-pointer">
                            <MdOutlineAddBox size={25} />
                        </label>
                        <input
                            id={inputId}
                            type="file"
                            accept={inputId === "reel" ? "image/*,video/*" : "image/*"}
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
