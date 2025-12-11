import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useGetNotifications from "../../hooks/notifications/useGetNotifications";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({ isOpen, onClose }) => {
    const dropdownRef = useRef(null);
    const { data, isLoading } = useGetNotifications(1, 10);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            ref={dropdownRef}
            className="absolute bg-slate-700 rounded-md right-0 z-[10000] top-[52px] w-[400px] max-h-[500px] overflow-hidden shadow-lg border border-white-base/10"
        >
            <div className="flex flex-col">
                <div className="px-4 py-3 border-b border-white-base/10">
                    <h3 className="text-white-base font-semibold text-base">
                        Notifications
                    </h3>
                </div>
                <div className="overflow-y-auto max-h-[450px]">
                    {isLoading ? (
                        <div className="px-4 py-8 text-center text-white-base/50 text-sm">
                            Loading notifications...
                        </div>
                    ) : data?.items?.length > 0 ? (
                        data.items.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-white-base/50 text-sm">
                            No notifications yet
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default NotificationDropdown;

