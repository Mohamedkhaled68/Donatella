import React, { useState } from "react";
import NotificationForm from "../../components/admin/NotificationForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useSendNotification from "../../hooks/admin/useSendNotification";
import toast from "react-hot-toast";

const Notifications = () => {
    const sendNotification = useSendNotification();

    const handleSubmit = async (data) => {
        try {
            await sendNotification.mutateAsync(data);
        } catch (error) {
            // Error handling is done in the hook
        }
    };

    return (
        <div className="flex min-h-screen bg-[#121417] text-white">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <div className="container mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Send Notification</h1>
                <NotificationForm onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Notifications;



