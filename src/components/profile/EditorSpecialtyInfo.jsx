import React from "react";
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
                    <p className="text-center grow capitalize">
                        {editingSoftware}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <p className="text-center grow capitalize">
                        {colorGrading
                            ? "Has Color Grading"
                            : "Has No Color Grading"}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <p className="text-center grow capitalize">
                        {motionGraphics
                            ? "Has Motion Graphics"
                            : "Has No Motion Graphics"}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <p className="text-center grow capitalize">
                        {soundEditing
                            ? "Has Sound Editing"
                            : "Has No Sound Editing"}
                    </p>
                </div>
                <div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
                    <p className="text-center grow capitalize">
                        {visualEffects
                            ? "Has Visual Effects"
                            : "Has No Visual Effects"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default EditorSpecialtyInfo;
