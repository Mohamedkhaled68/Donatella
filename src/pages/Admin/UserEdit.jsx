import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminGetUser, useAdminUpdateUser } from "../../hooks/admin/useAdminUsers";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Loading, FormButton, FormGroup } from "../../components";
import toast from "react-hot-toast";

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading } = useAdminGetUser(id);
    const updateMutation = useAdminUpdateUser();

    const [formData, setFormData] = useState({
        isBlocked: false,
        verifiedEmail: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                isBlocked: user.isBlocked || false,
                verifiedEmail: user.verifiedEmail || "",
                role: user.role || "",
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMutation.mutateAsync({
                userId: id,
                data: formData,
            });
            toast.success("User updated successfully");
            navigate("/admin/users");
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#121417] text-white">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">Edit User</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormGroup
                        label="Email"
                        type="email"
                        value={formData.verifiedEmail}
                        onChange={(e) =>
                            setFormData({ ...formData, verifiedEmail: e.target.value })
                        }
                    />

                    <div className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            id="isBlocked"
                            checked={formData.isBlocked}
                            onChange={(e) =>
                                setFormData({ ...formData, isBlocked: e.target.checked })
                            }
                            className="w-5 h-5"
                        />
                        <label htmlFor="isBlocked" className="text-white">
                            Blocked
                        </label>
                    </div>

                    <div className="flex space-x-4">
                        <FormButton
                            type="submit"
                            text="Update User"
                            loading={updateMutation.isPending}
                        />
                        <button
                            type="button"
                            onClick={() => navigate("/admin/users")}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
