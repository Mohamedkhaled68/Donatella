import React from "react";
import {
    instructionImg1,
    instructionImg2,
    instructionImg3,
} from "../../assets";
import Button from "../shared/ui/Button";
import { Link } from "react-router-dom";
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
                <h1 className="text-center text-5xl lg:text-6xl font-display font-normal text-white-base mb-12">
                    How It Works:
                </h1>
                <div className="flex flex-col gap-12 w-[85%] mx-auto ">
                    {InstructionsData.map(
                        ({ title, description, btn, image }, index) => (
                            <div
                                key={index}
                                className="w-full bg-[#1F2224] border-[3px] border-[#f1f1f133] p-[30px] lg:p-[75px] rounded-br-3 text-white-base font-body flex flex-col lg:flex-row lg:[&:nth-child(2)]:flex-row-reverse items-center justify-center gap-[20px] lg:gap-[88px]"
                            >
                                <div
                                    className={`w-full lg:w-[80%] ${
                                        index == 1 && "flex justify-end"
                                    } h-full overflow-hidden rounded-br-3 border-[3px] border-black/20`}
                                >
                                    <img
                                        className="filter grayscale w-full object-cover h-full"
                                        src={image}
                                        alt={title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[42px] font-body font-black">
                                        #{index + 1}
                                    </span>
                                    <h1 className="text-xl lg:text-3xl font-body font-bold mb-3">
                                        {title}
                                    </h1>
                                    <p className="text-sm font-body text-white-base/60 font-normal">
                                        {description}
                                    </p>
                                    <Link
                                        to={"/signup"}
                                        className="flex items-center gap-5 mt-8"
                                    >
                                        <Button
                                            className={
                                                "bg-white-base text-[#1F2224] font-light"
                                            }
                                        >
                                            {btn}
                                        </Button>
                                    </Link>
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
