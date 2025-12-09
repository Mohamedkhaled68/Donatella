import React from "react";
import useMarkNotificationAsRead from "../../hooks/notifications/useMarkNotificationAsRead";

const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
};

const NotificationItem = ({ notification }) => {
    const { mutateAsync: markAsRead } = useMarkNotificationAsRead();
    const isRead = notification.NotificationStatus?.seenAt;

    const handleClick = async () => {
        if (!isRead) {
            await markAsRead(notification.id);
        }
    };

    const timeAgo = formatTimeAgo(notification.createdAt);

    return (
        <div
            onClick={handleClick}
            className={`px-4 py-3 border-b border-white-base/10 cursor-pointer hover:bg-white-base/5 transition-colors ${
                !isRead ? "bg-blue-primary/10" : ""
            }`}
        >
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <h4 className="text-white-base font-semibold text-sm mb-1">
                        {notification.title}
                    </h4>
                    <p className="text-white-base/70 text-xs mb-2">
                        {notification.body}
                    </p>
                    <span className="text-white-base/50 text-xs">
                        {timeAgo}
                    </span>
                </div>
                {!isRead && (
                    <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0" />
                )}
            </div>
        </div>
    );
};

export default NotificationItem;
