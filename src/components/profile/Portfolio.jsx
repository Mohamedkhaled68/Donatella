import React, { useEffect, useState } from "react";
import Border from "./Border";
import PortfolioImages from "./PortfolioImages";
import { useUserStore } from "../../store/userStore";
import ReelGrid from "./ReelGrid";
import FullBodyGrid from "./FullBodyGrid";
import HeadshotGrid from "./HeadshotGrid";
import { FiEdit } from "react-icons/fi";
import ModelEditSpecialtyInfo from "./ModelEditSpecialtyInfo";
import AthleteFullbodyGrid from "./AthleteFullbodyGrid";
import AthleteTrophieGrid from "./AthleteTrophieGrid";
import CertificatesGrid from "./CertificatesGrid";
import PreviousWorkGrid from "./PreviousWorkGrid";
import VideographerEditSpecialtyInfo from "./VideographerEditSpecialtyInfo";
import { useModal } from "../../store/useModal";
import PhotographerEditSpecialtyInfo from "./PhotographerEditSpecialtyInfo";
import EditorEditSpecialtyInfo from "./EditorEditSpecialtyInfo";

const Portfolio = () => {
    const [isEditing, setIsEditing] = useState(false);
    const userStatus = useUserStore((state) => state.userStatus);
    const setModal = useModal((state) => state.setModal);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing && userStatus.individual.role === "MODEL") {
            setModal(<ModelEditSpecialtyInfo setIsEditing={setIsEditing} />);
        } else if (isEditing && userStatus.individual.role === "VIDEOGRAPHER") {
            setModal(
                <VideographerEditSpecialtyInfo setIsEditing={setIsEditing} />
            );
        } else if (isEditing && userStatus.individual.role === "PHOTOGRAPHER") {
            setModal(
                <PhotographerEditSpecialtyInfo setIsEditing={setIsEditing} />
            );
        } else if (isEditing && userStatus.individual.role === "EDITOR") {
            setModal(<EditorEditSpecialtyInfo setIsEditing={setIsEditing} />);
        } else {
            setModal(null);
        }
    }, [isEditing]);

    const check =
        userStatus.individual.role === "MODEL" ||
        userStatus.individual.role === "ATHLETE" ||
        userStatus.individual.role === "VIDEOGRAPHER" ||
        userStatus.individual.role === "PHOTOGRAPHER" ||
        userStatus.individual.role === "EDITOR";

    return (
        <>
            <>
                {/* PORTFOLIO */}
                <div className="py-5 flex flex-col gap-6 my-8 relative">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[38px] font-bold font-display">
                            {userStatus.individual.role === "ATHLETE"
                                ? "Trophies"
                                : "Portfolio"}
                        </h1>
                        {[
                            "MODEL",
                            "VIDEOGRAPHER",
                            "PHOTOGRAPHER",
                            "EDITOR",
                        ].includes(userStatus.individual.role) && (
                            <FiEdit
                                size={20}
                                onClick={handleEditClick}
                                className="cursor-pointer"
                            />
                        )}
                    </div>

                    {userStatus.individual.role === "ATHLETE" && (
                        <AthleteTrophieGrid />
                    )}

                    {["BEAUTY", "ARTIST", "FASHION"].includes(
                        userStatus.individual.role
                    ) && <PreviousWorkGrid />}

                    {[
                        "MODEL",
                        "EDITOR",
                        "VIDEOGRAPHER",
                        "PHOTOGRAPHER",
                    ].includes(userStatus.individual.role) && (
                        <PortfolioImages />
                    )}
                </div>
                {/* HEADSHOTS && CERTIFICATES */}
                {userStatus.individual.role === "MODEL" ||
                    userStatus.individual.role === "TOURISM" ||
                    userStatus.individual.role === "BEAUTY" ||
                    (userStatus.individual.role === "FASHION" && (
                        <>
                            <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        {userStatus.individual.role ===
                                            "TOURISM" ||
                                        userStatus.individual.role ===
                                            "BEAUTY" ||
                                        userStatus.individual.role === "FASHION"
                                            ? "Certificates"
                                            : "Headshots"}
                                    </h1>
                                </div>

                                {userStatus.individual.role === "TOURISM" && (
                                    <CertificatesGrid userStatus={userStatus} />
                                )}
                                {userStatus.individual.role === "MODEL" && (
                                    <HeadshotGrid userStatus={userStatus} />
                                )}
                                {userStatus.individual.role === "BEAUTY" && (
                                    <CertificatesGrid userStatus={userStatus} />
                                )}
                                {userStatus.individual.role === "FASHION" && (
                                    <CertificatesGrid userStatus={userStatus} />
                                )}
                            </div>
                        </>
                    ))}
                {/* FULL BODY && REELS */}
                {check && (
                    <div className="py-5 flex flex-col gap-6 my-8 h-full">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-[38px] font-bold font-display">
                                {userStatus.individual.role === "MODEL" && (
                                    <>Full Body</>
                                )}
                                {userStatus.individual.role ===
                                    "VIDEOGRAPHER" && <>TikToks / Reels</>}
                                {userStatus.individual.role ===
                                    "PHOTOGRAPHER" && <>TikToks / Reels</>}
                                {userStatus.individual.role === "EDITOR" && (
                                    <>TikToks / Reels</>
                                )}
                                {userStatus.individual.role === "ATHLETE" && (
                                    <>Body Pictures</>
                                )}
                            </h1>
                        </div>
                        {userStatus.individual.role === "MODEL" && (
                            <FullBodyGrid userStatus={userStatus} />
                        )}
                        {userStatus.individual.role === "VIDEOGRAPHER" && (
                            <ReelGrid userStatus={userStatus} />
                        )}
                        {userStatus.individual.role === "PHOTOGRAPHER" && (
                            <ReelGrid userStatus={userStatus} />
                        )}
                        {userStatus.individual.role === "EDITOR" && (
                            <ReelGrid userStatus={userStatus} />
                        )}
                        {userStatus.individual.role === "ATHLETE" && (
                            <AthleteFullbodyGrid userStatus={userStatus} />
                        )}
                    </div>
                )}
            </>
        </>
    );
};

export default Portfolio;
