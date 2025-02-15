import React from "react";
import { BackButton, Footer } from "../../components";
import { contactImage } from "../../assets";

const Contact = () => {
    return (
        <>
            <section className=" bg-[#121417] text-white">
                <header className="flex items-center p-4">
                    <BackButton />
                </header>
                <div className="container mx-auto flex flex-col items-center justify-center text-center pt-10">
                    <h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                        Contact
                    </h1>
                    <p className="text-xl font-[DMSans] text-white/70 mt-2">
                        Reach out to us.
                    </p>
                    <div className="w-full my-5 h-[80vh]">
                        <div className="relative w-[80%]  max-h-[600px] lg:w-[30%] h-full overflow-hidden flex justify-center items-center mx-auto rounded-lg border-[3px] border-[#ffffff5d]">
                            <div className="z-10 w-[70%] mx-auto text-lg leading-relaxed font-body text-white/65 italic font-thin text-left">
                                <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white-base">
                                    Phone:
                                </h2>
                                <p className="mt-4"> +966 54 365 7085</p>

                                <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white-base">
                                    Email:
                                </h2>
                                <p className="mt-4">Team@donatella-sa.com</p>

                                <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white-base">
                                    Headquarters:
                                </h2>
                                <p className="mt-4">
                                    4828, Mohammed Tahrir Al Kardi, Az Zomorod,
                                    23822, Jeddah, Kingdom Of Saudi Arabia
                                </p>
                            </div>
                            <img
                                className="w-full z-0 h-full object-cover absolute top-0 left-0 grayscale"
                                src={contactImage}
                                alt="contact"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
