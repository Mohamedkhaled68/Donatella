import React from "react";
import Button from "./Button";

const ModelsCard = ({ title, description, image, button }) => {
    return (
        <>
            <div className="bg-white col-span-1 py-4 px-10 h-full rounded-br-4 flex flex-col items-center justify-center gap-5">
                <h1 className="text-6xl font-display text-center">{title}</h1>
                <p className="text-center text-lg font-extralight">
                    {description}
                </p>

                {/* Adjusted Image Container */}
                <div className="relative rounded-3xl overflow-hidden group w-full h-full">
                    <img
                        className="w-full h-full object-cover filter grayscale group-hover:scale-110 duration-500 group-hover:grayscale-0"
                        src={image}
                        alt="guy"
                    />
                    <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] bg-black/45 group-hover:bg-black/0 duration-300 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>

                <Button className={"bg-[#1F2224] text-white-base font-light"}>
                    {button}
                </Button>
            </div>
        </>
    );
};

export default ModelsCard;
