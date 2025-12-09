import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminUsers, {
    useAdminDeleteUser,
} from "../../hooks/admin/useAdminUsers";
import UsersTable from "../../components/admin/UsersTable";
import UserSearch from "../../components/admin/UserSearch";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DeleteUserModal from "../../components/admin/DeleteUserModal";
import { Loading } from "../../components";
import toast from "react-hot-toast";

const Users = () => {
    const navigate = useNavigate();
    const [paginate, setPaginate] = useState({ page: 1, limit: 20 });
    const [filters, setFilters] = useState({});
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });
    const { data, isLoading } = useAdminUsers(paginate, filters);
    const deleteUserMutation = useAdminDeleteUser();

    const handleSearch = (searchFilters) => {
        setFilters(searchFilters);
        setPaginate({ ...paginate, page: 1 });
    };

    const handleDeleteClick = (userId) => {
        setDeleteModal({ isOpen: true, userId });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.userId) return;

        try {
            await deleteUserMutation.mutateAsync(deleteModal.userId);
            toast.success("User deleted successfully");
            setDeleteModal({ isOpen: false, userId: null });
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, userId: null });
    };

    const handleEdit = (userId) => {
        navigate(`/admin/users/${userId}/edit`);
    };

    useEffect(() => {
        if (deleteModal.isOpen) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }
        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [deleteModal.isOpen]);

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
                <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <button
                        onClick={() => navigate("/admin/users/create")}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Add User
                    </button>
                </div>

                <UserSearch onSearch={handleSearch} />

                <UsersTable
                    users={data?.items || []}
                    total={data?.total || 0}
                    page={paginate.page}
                    limit={paginate.limit}
                    onPageChange={(page) => setPaginate({ ...paginate, page })}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
                </div>
            </div>

            <DeleteUserModal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteUserMutation.isPending}
            />
        </div>
    );
};

export default Users;
