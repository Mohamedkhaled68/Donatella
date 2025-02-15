import React from "react";
import { BackButton, Footer } from "../../components";
import { privacyImage } from "../../assets";

const policies = [
    {
        head: "1. Information We collect ",
        des: "We collect the following types of information to provide and improve our services:",
        points: [
            "Personal Information: Name, email address, phone number, and physical address. Payment and billing information (e.g., bank details or credit card information).",
            "Profile Information: Photos, portfolio details, skillsets, and experience you choose to share on your profile. Preferences related to talent services or projects.",
            "Usage Data: Log data such as IP address, browser type, operating system, and access times. Actions taken on the platform, like searches, messages, and project interactions.",
            "Communications: Messages, inquiries, and support requests sent through the platform.",
        ],
    },
    {
        head: "2. How We Use Your Information",
        des: "We use the information we collect for the following purposes:",
        points: [
            "To Provide Services: Match talents with clients and facilitate project collaboration.",
            "To Enhance User Experience: Improve the functionality and usability of our platform.",
            "To Communicate with You: Send updates, respond to inquiries, and share promotional materials.",
            "To Ensure Security: Detect and prevent fraudulent or unauthorized activities.",
            "To Comply with Legal Obligations: Meet legal and regulatory requirements.",
        ],
    },
    {
        head: "3. Sharing Your Information",
        des: "We share your information only when necessary and as described below:",
        points: [
            "With Clients or Talents: To facilitate projects, profiles may be visible to clients or talents depending on platform settings.",
            "Service Providers: With trusted third-party providers who help us operate our platform (e.g., payment processors, hosting services).",
            "Legal Requirements: When required to comply with laws, regulations, or legal processes.",
            "Business Transfers: In the event of a merger, acquisition, or sale of company assets.",
        ],
    },
    {
        head: "4.Your Choices and Rights",
        des: "You have the following rights regarding your personal information:",
        points: [
            "Access and Update: Review and update your profile information through your account.",
            "Delete Your Account: Request account deletion by contacting us at [Insert Contact Email].",
            "Opt-Out: Unsubscribe from promotional communications at any time.",
            "Restrict Data Use: Limit how we process your information under certain circumstances.",
        ],
    },
    {
        head: "5. Data Security",
        points: [
            "We implement industry-standard security measures to protect your data. However, no system is completely secure. Please notify us immediately if you suspect unauthorized access to your account.",
        ],
    },
    {
        head: "6. Cookies and Tracking Technologies",
        points: [
            "We use cookies and similar technologies to enhance your browsing experience, analyze platform performance, and deliver tailored content.",
            "You can manage your cookie preferences through your browser settings.",
        ],
    },
    {
        head: "7. Third-Party Links",
        points: [
            "Our platform may contain links to third-party websites.",
            "We are not responsible for the privacy practices or content of these external sites.",
        ],
    },
    {
        head: "8. Children's Privacy",
        points: [
            "Our platform is not intended for individuals under the age of 18.",
            "We do not knowingly collect personal information from minors.",
        ],
    },
    {
        head: "9. Changes to This Privacy Policy",
        points: [
            "We may update this policy from time to time.",
            "Significant changes will be communicated via email or a notice on our platform.",
        ],
    },
];

const Privacy = () => {
    return (
        <>
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
                    <div className="w-full my-5">
                        <div className="w-[50%] h-[300px] mx-auto rounded-lg border-[3px] border-[#ffffff5d]">
                            <img
                                className="w-full h-full object-cover"
                                src={privacyImage}
                                alt="privacy"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-left w-full max-w-3xl">
                        Policy
                    </h2>
                    <div className="mt-4 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl text-left">
                        <p>
                            At Donatella, we value your privacy and are
                            committed to protecting your personal information.
                        </p>
                        <p className="mt-4">
                            This Privacy Policy outlines how we collect, use,
                            share, and safeguard your information when you use
                            our platform. By accessing or using our services,
                            you agree to the practices described in this policy.
                        </p>
                        {policies.map((policy, index) => (
                            <div key={index}>
                                <h3 className="text-2xl font-[PlayfairDisplay] mt-6 text-white">
                                    {policy.head}
                                </h3>
                                {policy.des && (
                                    <p className="my-2 pl-3 text-lg text-white-base">
                                        {policy.des}
                                    </p>
                                )}
                                <ul className="list-disc pl-6">
                                    {policy.points.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Privacy;
