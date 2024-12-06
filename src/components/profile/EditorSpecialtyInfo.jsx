import React from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
const EditorSpecialtyInfo = ({ info }) => {
    const {
        colorGrading,
        editingSoftware,
        motionGraphics,
        soundEditing,
        visualEffects,
    } = info;
    return (
        <>
            <div className="w-full grid grid-cols-4 gap-4">
                <div className="col-span-4 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <MdOutlineCameraAlt
                        className="text-blue-primary absolute left-[26px] top-[50%] translate-y-[-50%]"
                        size={30}
                    />
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                    >
                        <path
                            d="M21.6 8.48047C15.2 8.48047 15.2 31.5205 21.6 31.5205C28 31.5205 36 27.2005 36 20.0005C36 12.8005 28 8.48047 21.6 8.48047ZM21.76 28.3205C21.12 27.6805 20 24.8005 20 20.0005C20 15.2005 21.12 12.3205 21.76 11.6805C26.4 11.8405 32.8 14.7205 32.8 20.0005C32.8 25.2805 26.4 28.1605 21.76 28.3205ZM4 8.80047H16C15.68 9.44047 15.2 10.0805 15.04 11.0405C14.88 11.3605 14.88 11.6805 14.72 12.0005H4V8.80047ZM13.6 18.4005H4V15.2005H13.92C13.76 16.1605 13.76 17.2805 13.6 18.4005ZM14.72 28.0005C15.04 29.2805 15.52 30.2405 16.16 31.2005H4.16V28.0005H14.72ZM13.92 24.8005H4V21.6005H13.6C13.76 22.7205 13.76 23.8405 13.92 24.8005Z"
                            fill="#0C71D7"
                        />
                    </svg>
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                    >
                        <path
                            d="M4 32.8012V7.20117H36V32.8012H4ZM27.96 29.6012L31.64 15.7612L12.12 10.4012L8.44 24.2412L27.96 29.6012Z"
                            fill="#0C71D7"
                        />
                    </svg>
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                    >
                        <path
                            d="M21.6 8.48047C15.2 8.48047 15.2 31.5205 21.6 31.5205C28 31.5205 36 27.2005 36 20.0005C36 12.8005 28 8.48047 21.6 8.48047ZM21.76 28.3205C21.12 27.6805 20 24.8005 20 20.0005C20 15.2005 21.12 12.3205 21.76 11.6805C26.4 11.8405 32.8 14.7205 32.8 20.0005C32.8 25.2805 26.4 28.1605 21.76 28.3205ZM4 8.80047H16C15.68 9.44047 15.2 10.0805 15.04 11.0405C14.88 11.3605 14.88 11.6805 14.72 12.0005H4V8.80047ZM13.6 18.4005H4V15.2005H13.92C13.76 16.1605 13.76 17.2805 13.6 18.4005ZM14.72 28.0005C15.04 29.2805 15.52 30.2405 16.16 31.2005H4.16V28.0005H14.72ZM13.92 24.8005H4V21.6005H13.6C13.76 22.7205 13.76 23.8405 13.92 24.8005Z"
                            fill="#0C71D7"
                        />
                    </svg>
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                    >
                        <path
                            d="M4 32.8012V7.20117H36V32.8012H4ZM27.96 29.6012L31.64 15.7612L12.12 10.4012L8.44 24.2412L27.96 29.6012Z"
                            fill="#0C71D7"
                        />
                    </svg>
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
            </div>
        </>
    );
};

export default EditorSpecialtyInfo;
