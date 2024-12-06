import React, { useEffect, useState } from "react";
import Footer from "../../components/landing/Footer";
import { FiEdit } from "react-icons/fi";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useUserStore } from "../../store/userStore";
import { Experience, Loading, Portfolio, Reviews } from "../../components";
import { splitText } from "../../utils/helpers";
import Border from "../../components/profile/Border";

const Profile = () => {
    const [bio, setBio] = useState([]);
    const { userStatus } = useUserStore((state) => state);
    useEffect(() => {
        if (userStatus.organization) {
            const splitedBio = splitText(userStatus.organization.bio, 40);
            setBio(splitedBio);
        } else {
            const splitedBio = splitText(userStatus.individual.bio, 40);
            setBio(splitedBio);
        }
    }, [userStatus]);
    if (userStatus === null) return null;
    return (
        <>
            {!userStatus ? (
                <>
                    <div className="w-full h-screen flex justify-center items-center">
                        <Loading />
                    </div>
                </>
            ) : (
                <>
                    <section className="min-h-screen">
                        <div className="container mx-auto flex flex-col text-white-base pb-8">
                            <ProfileHeader data={userStatus} />
                            <Border />
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        About
                                    </h1>
                                    <FiEdit size={20} />
                                </div>
                                <div className="font-body flex flex-col gap-3 text-md font-light text-white-base">
                                    {bio?.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <Border />
                            {userStatus.individual && <Portfolio />}
                            <Border />
                            <Experience userStatus={userStatus} />
                            <Border />

                            {/* {Reviews} */}
                            <div className="py-5 flex flex-col gap-6 my-8">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-[38px] font-bold font-display">
                                        Reviews
                                    </h1>
                                </div>
                                <Reviews />
                            </div>
                        </div>
                        <Footer />
                    </section>
                </>
            )}
        </>
    );
};

export default Profile;
