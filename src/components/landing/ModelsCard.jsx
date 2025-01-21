import React from "react";
import Button from "../shared/ui/Button";
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ModelsCard = ({
    title,
    description,
    image,
    button,
    isMobile,
    setOpenNote,
    openNote,
    cardId,
}) => {
    const navigate = useNavigate();
    const handleOpenNote = () => {
        if (isMobile) {
            setOpenNote((prev) => ({
                ...prev,
                [cardId]: true,
            }));
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="bg-white relative col-span-1 py-4 px-10 h-full rounded-br-4 flex flex-col items-center justify-center gap-5">
            {openNote && (
                <div
                    style={{
                        position: "absolute", // Positioned relative to the document
                        top: `50%`,
                        left: `50%`,
                        transform: "translate(-50%, -50%)", // Centered on the calculated position
                        width: "300px",
                        backgroundColor: "#1e293b",
                        color: "#f8fafc",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpenNote(false)}
                    >
                        <FaX />
                    </div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "1.5rem",
                            fontStyle: "italic",
                        }}
                        className="font-display py-2"
                    >
                        Sign is currently only available on desktop
                    </p>
                </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-display text-center">
                {title}
            </h1>
            <p className="text-center text-[14px] lg:text-lg font-extralight">
                {description}
            </p>

            <div className="relative rounded-[100px] overflow-hidden group w-full h-full">
                <img
                    className="w-full h-full object-cover filter grayscale group-hover:scale-110 duration-500 group-hover:grayscale-0"
                    src={image}
                    alt="guy"
                />
                <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] bg-black/45 group-hover:bg-black/0 duration-300 rounded-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            </div>

            <Button
                onClick={handleOpenNote}
                className="bg-[#1F2224] text-white-base font-light"
            >
                {button}
            </Button>
        </div>
    );
};

export default ModelsCard;
