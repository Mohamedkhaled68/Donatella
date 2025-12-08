import React, { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import useGetUnreadCount from "../../hooks/notifications/useGetUnreadCount";
import NotificationDropdown from "./NotificationDropdown";

const NotificationIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: unreadCount = 0 } = useGetUnreadCount();

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div
                onClick={handleClick}
                className="w-[45px] h-[45px] flex justify-center items-center bg-slate-800 rounded-full hover:bg-white-base/20 cursor-pointer duration-300 relative"
            >
                <FaFileInvoice size={20} className="text-white-base" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </div>
            <NotificationDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default NotificationIcon;
