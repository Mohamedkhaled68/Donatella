import React from "react";
import useLogout from "../hooks/auth/useLogout";

const Logout = () => {
    const { mutateAsync } = useLogout();

    const handleLogout = async () => {
        try {
            await mutateAsync();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <button
                onClick={handleLogout}
                className="px-8 py-4 rounded-md text-white-base text-lg font-display italic bg-green-600"
            >
                Log out
            </button>
        </div>
    );
};

export default Logout;
