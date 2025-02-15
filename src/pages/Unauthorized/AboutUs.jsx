import React from "react";
import { BackButton, Footer } from "../../components";

const AboutUs = () => {
    return (
        <>
            <section className="min-h-screen bg-[#121417] text-white pb-10">
                <header className="flex items-center p-4">
                    <BackButton />
                </header>
                <div className="container  mx-auto px-[1.2rem] flex flex-col items-center justify-center text-center pt-20">
                    <h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                        About Us
                    </h1>
                    <p className="text-xl font-[DMSans] text-white/70 mt-2">
                        Learn more about our journey.
                    </p>
                    <div className="mt-12 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl text-left">
                        <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                            Vision
                        </h2>
                        <p className="mt-4">
                            Redefining Saudi Arabia's creative landscape by
                            empowering talents and inspiring artistic
                            excellence.
                        </p>

                        <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                            Mission
                        </h2>
                        <p className="mt-4">
                            Connecting talent seekers with top professionals in
                            a secure platform for seamless collaboration,
                            elevating media production and talent casting
                            standards globally.
                        </p>

                        <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                            Values
                        </h2>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>
                                Artistic Excellence: Fostering creativity and
                                innovation.
                            </li>
                            <li>
                                Luxury Leadership: Delivering bespoke, premium
                                talent services.
                            </li>
                            <li>
                                Transformative Impact: Empowering talents for
                                global recognition.
                            </li>
                            <li>
                                Cultural Innovation: Bridging heritage with
                                modernity for authentic narratives.
                            </li>
                        </ul>

                        <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                            A Promise
                        </h2>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>
                                To Talents: "We nurture your potential, offering
                                tools, mentorship, and opportunities to
                                transform you into a symbol of excellence."
                            </li>
                            <li>
                                To Clients: "We align creativity with strategy,
                                delivering premium talent and bespoke solutions
                                for unmatched quality."
                            </li>
                        </ul>

                        <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">
                            Why Us?
                        </h2>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li> Secure platform with top-tier talent.</li>
                            <li>Creative freedom and seamless processes.</li>
                            <li>Trusted by talents and organizations alike.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AboutUs;
