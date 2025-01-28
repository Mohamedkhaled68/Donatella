import React from "react";
import { BackButton } from "../../components";

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-[#121417] text-white pb-10">
            <header className="flex items-center p-4">
                <BackButton />
            </header>
            <div className="container  mx-auto px-[1.2rem] flex flex-col items-center justify-center text-center pt-20">
                <h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                    About Us
                </h1>
                <p className="text-xl font-[DMSans] text-white/70 mt-2">
                    Learn more about our journey, values, and commitment.
                </p>
                <div className="mt-12 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl text-left">
                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Vision
                    </h2>
                    <p className="mt-4">
                        To create a world where innovation and creativity drive
                        progress, enriching lives and inspiring communities.
                    </p>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Mission
                    </h2>
                    <p className="mt-4">
                        To empower individuals and organizations by providing
                        exceptional tools and services that unlock potential and
                        foster growth.
                    </p>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Values
                    </h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Integrity in every action</li>
                        <li>Commitment to excellence</li>
                        <li>Fostering inclusivity and diversity</li>
                        <li>Encouraging creativity and innovation</li>
                        <li>Delivering value to our stakeholders</li>
                    </ul>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        A Promise
                    </h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>To prioritize user satisfaction</li>
                        <li>To maintain transparency and trust</li>
                        <li>To adapt and innovate continuously</li>
                        <li>To ensure data privacy and security</li>
                        <li>To contribute positively to society</li>
                    </ul>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Why Us?
                    </h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Proven track record of success</li>
                        <li>Customer-centric approach</li>
                        <li>Cutting-edge technology</li>
                        <li>Expertise across industries</li>
                        <li>Dedicated support team</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
