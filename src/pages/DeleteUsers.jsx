import React from "react";
import useDeleteAllUsers from "../hooks/auth/useDeleteAllUsers";

const DeleteUsers = () => {
    const { mutateAsync } = useDeleteAllUsers();

    const handleDelete = async () => {
        try {
            await mutateAsync();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <button
                onClick={handleDelete}
                className="px-8 py-4 rounded-md text-white-base text-lg font-display italic bg-red-600"
            >
                Delete All Users
            </button>
        </div>
    );
};

export default DeleteUsers;
