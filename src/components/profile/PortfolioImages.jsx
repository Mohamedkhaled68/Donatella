import React from "react";
import { useUserStore } from "../../store/userStore";
import ModelSpecialtyInfo from "./ModelSpecialtyInfo";
import EditorSpecialtyInfo from "./EditorSpecialtyInfo";
import VideographerSpecialtyInfo from "./VideographerSpecialtyInfo";
import PhotographerSpecialtyInfo from "./PhotographerSpecialtyInfo";
import PortfolioGrid from "./PortfolioGrid";


const PortfolioImages = () => {
    const userStatus = useUserStore((state) => state.userStatus);

    return (
        <>
            {userStatus.individual.role === "MODEL" ? (
                <>
                    <PortfolioGrid userStatus={userStatus} />
                    <ModelSpecialtyInfo userStatus={userStatus} />
                </>
            ) : (
                <>
                    <PortfolioGrid userStatus={userStatus} />
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
