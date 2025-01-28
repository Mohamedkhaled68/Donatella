import React from "react";
import { BackButton } from "../../components";

const Contact = () => {
    return (
        <section className="min-h-screen bg-[#121417] text-white">
            <header className="flex items-center p-4">
                <BackButton />
            </header>
            <div className="container mx-auto flex flex-col items-center justify-center text-center pt-20">
                <h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                    Contact
                </h1>
                <p className="text-xl font-[DMSans] text-white/70 mt-2">
                    Get in touch with us for any inquiries or support.
                </p>
                <div className="mt-12 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl text-left">
                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Phone
                    </h2>
                    <p className="mt-4">+1 (123) 456-7890</p>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Mail
                    </h2>
                    <p className="mt-4">contact@donatella.com</p>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Address
                    </h2>
                    <p className="mt-4">
                        123 Innovation Way, Creativity City, USA
                    </p>

                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                        Legal Info
                    </h2>
                    <p className="mt-4">
                        Company Registration Number: 123456789
                    </p>
                    <p className="mt-2">Tax ID: 98-7654321</p>
                    <p className="mt-2">
                        © {new Date().getFullYear()} Donatella Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
