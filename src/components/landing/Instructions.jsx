import React from "react";
import {
    instructionImg1,
    instructionImg2,
    instructionImg3,
    searchTalentImage,
} from "../../assets";
import Button from "../shared/ui/Button";
const InstructionsData = [
    {
        btn: "Create Account",
        image: instructionImg1,
        title: "Create Your Account",
        description:
            "Sign up easily by providing your information and setting up a profile that showcases your skills and portfolio.",
    },
    {
        btn: "Apply For Jobs",
        image: instructionImg2,
        title: "Apply For Jobs",
        description:
            "Browse available projects, submit applications for opportunities that match your talents, highlight your vqualifications.",
    },
    {
        btn: "Get Started",
        image: instructionImg3,
        title: "Get Paid Through Us",
        description:
            "After completing a project, receive secure payment through our platform, enjoying the flexibility of working on your terms.",
    },
];

const Instructions = () => {
    return (
        <>
            <section className="py-12 container mx-auto mb-10">
                <h1 className="text-center text-6xl font-display font-normal text-white-base mb-12">
                    How It Works:
                </h1>
                <div className="flex flex-col gap-12 w-full">
                    {InstructionsData.map(
                        ({ title, description, btn, image }, index) => (
                            <div
                                key={index}
                                className="w-full bg-[#1F2224] border-[3px] border-[#f1f1f133] p-[75px] rounded-br-3 text-white-base font-body flex [&:nth-child(2)]:flex-row-reverse items-center justify-center gap-[88px]"
                            >
                                <div
                                    className={`w-[80%] ${
                                        index == 1 && "flex justify-end"
                                    } h-full`}
                                >
                                    <img
                                        className="filter grayscale w-full object-cover"
                                        src={image}
                                        alt={title}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[42px] font-body font-black">
                                        #{index + 1}
                                    </span>
                                    <h1 className="text-3xl font-body font-bold mb-3">
                                        {title}
                                    </h1>
                                    <p className="text-sm font-body text-white-base/60 font-normal">
                                        {description}
                                    </p>
                                    <div className="flex items-center gap-5 mt-8">
                                        <Button
                                            className={
                                                "bg-white-base text-[#1F2224] font-light"
                                            }
                                        >
                                            {btn}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>
            
        </>
    );
};

export default Instructions;
