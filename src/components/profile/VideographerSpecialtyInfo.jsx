import React from "react";
import { MdOutlineCameraAlt } from "react-icons/md";

const VideographerSpecialtyInfo = ({ info }) => {
    const { camera, lense, lightning, stabilizer } = info;
    return (
        <>
            <div className="w-full grid grid-cols-4 gap-4">
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <MdOutlineCameraAlt
                        className="text-blue-primary absolute left-[26px] top-[50%] translate-y-[-50%]"
                        size={30}
                    />
                    <p className="text-center grow capitalize">{camera}</p>
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
                    <p className="text-center grow capitalize">{camera}</p>
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
                    <p className="text-center grow capitalize">{lightning}</p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
                        <path
                            d="M19.6 0.416L19.472 0.352L19.456 0.384C18.336 0.144 17.184 0 16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 8.4 26.704 2.048 19.6 0.416ZM27.856 11.2H15.072L19.408 3.68C23.248 4.736 26.368 7.552 27.856 11.2ZM17.76 3.328L13.232 11.2L11.392 14.4L7.04 6.88C9.42543 4.52114 12.6452 3.19872 16 3.2C16.592 3.2 17.184 3.248 17.76 3.328ZM5.92 8.144L10.464 16L12.304 19.2H3.616C3.36 18.176 3.2 17.104 3.2 16C3.2 13.04 4.224 10.32 5.92 8.144ZM4.144 20.8H16.912L12.576 28.32C10.6904 27.792 8.95043 26.8399 7.48904 25.5366C6.02764 24.2333 4.8835 22.6131 4.144 20.8ZM14.24 28.656L20.624 17.6L24.976 25.12C22.5827 27.4769 19.359 28.7986 16 28.8C15.392 28.8 14.816 28.736 14.24 28.656ZM26.08 23.856L19.68 12.8H28.368C28.64 13.824 28.8 14.896 28.8 16C28.8 18.96 27.776 21.68 26.08 23.856Z"
                            fill="#0C71D7"
                        />
                    </svg>
                    <p className="text-center grow capitalize">{lense}</p>
                </div>
            </div>
        </>
    );
};

export default VideographerSpecialtyInfo;
