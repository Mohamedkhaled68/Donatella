import React, { useEffect, useState } from "react";
import Footer from "../../components/landing/Footer";
import { FiEdit } from "react-icons/fi";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useUserStore } from "../../store/userStore";
import { Experience, Loading, Portfolio, Reviews } from "../../components";
import { splitText } from "../../utils/helpers";
import Border from "../../components/profile/Border";
import useUpdateMe from "../../hooks/user/useUpdateMe";

const Profile = () => {
    const [bio, setBio] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // State to toggle form visibility
    const [editedBio, setEditedBio] = useState(""); // State to handle input value
    const { userStatus, setUserStatus } = useUserStore((state) => state);

    const { mutateAsync: updateMe } = useUpdateMe();

    useEffect(() => {
        if (userStatus?.organization) {
            const splitedBio = splitText(userStatus.organization.bio, 80);
            setBio(splitedBio);
            setEditedBio(userStatus.organization.bio);
        } else if (userStatus?.individual) {
            const splitedBio = splitText(userStatus.individual.bio, 80);
            setBio(splitedBio);
            setEditedBio(userStatus.individual.bio);
        }
    }, [userStatus]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setEditedBio(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { firstName, lastName, fullName, ...rest } =
                userStatus.individual;

            console.log(editedBio);

            await updateMe({ ...rest, bio: editedBio });

            setUserStatus({
                ...userStatus,
                individual: {
                    ...userStatus.individual,
                    bio: editedBio,
                },
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsEditing(false);
        }
        // Optionally, update the bio in the backend or state
        console.log("Updated Bio:", editedBio);
    };

    if (userStatus === null) return null;

    return (
        <>
            {!userStatus ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <section className="min-h-screen">
                    <div className="container mx-auto flex flex-col text-white-base pb-8">
                        <ProfileHeader data={userStatus} />
                        <Border />
                        <div className="py-5 flex flex-col gap-6 my-8">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-[38px] font-bold font-display">
                                    About
                                </h1>
                                <FiEdit
                                    size={20}
                                    onClick={handleEditClick}
                                    className="cursor-pointer"
                                />
                            </div>
                            {!isEditing ? (
                                <div className="font-body flex flex-col gap-3 text-md font-light text-white-base">
                                    {bio?.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <label
                                        htmlFor="editBio"
                                        className="text-lg font-medium"
                                    >
                                        Edit About
                                    </label>
                                    <textarea
                                        id="editBio"
                                        className="p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editedBio}
                                        onChange={handleInputChange}
                                        rows={4}
                                    />
                                    <div className="flex items-center gap-2">

                                    <div
                                    onClick={() => setIsEditing(false)}
                                        className="grow cursor-pointer text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Cancel
                                    </div>
                                    <button
                                        type="submit"
                                        className="grow px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                    </div>
                                </form>
                            )}
                        </div>
                        <Border />
                        {userStatus.individual && <Portfolio />}
                        <Border />
                        {userStatus.individual && (
                            <Experience userStatus={userStatus} />
                        )}
                        <Border />
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
            )}
        </>
    );
};

export default Profile;
