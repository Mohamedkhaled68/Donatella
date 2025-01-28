import React from "react";
import { BackButton } from "../../components";

const Privacy = () => {
    return (
        <section className="min-h-screen bg-[#121417] text-white pb-10">
            <header className="flex items-center p-4">
                <BackButton />
            </header>
            <div className="container mx-auto px-[1.2rem] flex flex-col items-center justify-center text-center pt-20">
                <h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                    Privacy
                </h1>
                <p className="text-xl font-[DMSans] text-white/70 mt-2">
                    Your trust is our priority.
                </p>
                <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-left w-full max-w-3xl">
                    Policy
                </h2>
                <div className="mt-4 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl text-left">
                    <p>
                        At Donatella, we value your privacy and are committed to
                        protecting your personal information.
                    </p>
                    <p className="mt-4">
                        This Privacy Policy outlines how we collect, use, share,
                        and safeguard your information when you use our
                        platform. By accessing or using our services, you agree
                        to the practices described in this policy.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
