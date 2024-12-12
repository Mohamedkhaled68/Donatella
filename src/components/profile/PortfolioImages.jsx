import React from "react";
import { useUserStore } from "../../store/userStore";
import { profileGirl } from "../../assets";
import { FaPlus } from "react-icons/fa6";
import ModelSpecialtyInfo from "./ModelSpecialtyInfo";
import EditorSpecialtyInfo from "./EditorSpecialtyInfo";
import VideographerSpecialtyInfo from "./VideographerSpecialtyInfo";
import PhotographerSpecialtyInfo from "./PhotographerSpecialtyInfo";

const imagesModel = [
    {
        id: 1,
        src: profileGirl,
        alt: "profileImage",
    },
    {
        id: 2,
        src: null,
        alt: "",
    },
    {
        id: 3,
        src: null,
        alt: "",
    },
];
const images = [
    {
        id: 1,
        src: profileGirl,
        alt: "profileImage",
    },
    {
        id: 2,
        src: null,
        alt: "",
    },
    {
        id: 3,
        src: null,
        alt: "",
    },
    {
        id: 4,
        src: null,
        alt: "",
    },
];

const PortfolioImages = () => {
    const userStatus = useUserStore((state) => state.userStatus);

    return (
        <>
            {userStatus.individual.role === "MODEL" ? (
                <>
                    <div className="w-full grid grid-cols-3 justify-items-center gap-x-[7.3rem] ">
                        {imagesModel.map(({ id, src, alt }) => {
                            return (
                                <div key={id} className="w-[350px]">
                                    {src ? (
                                        <div className="max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={src}
                                                alt={alt}
                                            />
                                        </div>
                                    ) : (
                                        <div className="max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin cursor-pointer bg-[#3B3B3B] border-white-base/30">
                                            <FaPlus size={75} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <ModelSpecialtyInfo userStatus={userStatus} />
                </>
            ) : (
                <>
                    <div className="w-full grid grid-cols-4  justify-items-center gap-6">
                        {images.map(({ id, src, alt }) => {
                            return (
                                <div
                                    key={id}
                                    className="col-span-2 h-[170px] w-full"
                                >
                                    {src ? (
                                        <div className="max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin border-white-base/30">
                                            <img
                                                className="max-w-[100%] object-cover"
                                                src={src}
                                                alt={alt}
                                            />
                                        </div>
                                    ) : (
                                        <div className="max-w-full overflow-hidden h-full flex justify-center items-center rounded-md border-thin cursor-pointer bg-[#3B3B3B] border-white-base/30">
                                            <FaPlus size={75} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {userStatus.individual.role === "EDITOR" && (
                        <EditorSpecialtyInfo
                            info={userStatus.individual.specialtyInfo}
                        />
                    )}
                    {userStatus.individual.role === "VIDEOGRAPHER" && (
                        <VideographerSpecialtyInfo
                            info={userStatus.individual.specialtyInfo}
                        />
                    )}
                    {userStatus.individual.role === "PHOTOGRAPHER" && (
                        <PhotographerSpecialtyInfo
                            info={userStatus.individual.specialtyInfo}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default PortfolioImages;
