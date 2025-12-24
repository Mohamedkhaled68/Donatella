import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Loading } from "../../components";
import {
    useAdminGetCategories,
    useAdminCreateCategory,
    useAdminUpdateCategory,
    useAdminUpdateCategoryStatus,
    useAdminDeleteCategory,
} from "../../hooks/admin/useAdminCategories";
import toast from "react-hot-toast";

const Categories = () => {
    const { data: categories, isLoading } = useAdminGetCategories();
    const createCategoryMutation = useAdminCreateCategory();
    const updateCategoryMutation = useAdminUpdateCategory();
    const updateStatusMutation = useAdminUpdateCategoryStatus();
    const deleteCategoryMutation = useAdminDeleteCategory();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        displayName: "",
        description: "",
        imageUrl: "",
        isEnabled: true,
        order: 0,
    });

    const handleCreateClick = () => {
        setFormData({
            name: "",
            displayName: "",
            description: "",
            imageUrl: "",
            isEnabled: true,
            order: categories?.length || 0,
        });
        setIsCreateModalOpen(true);
    };

    const handleEditClick = (category) => {
        setFormData({
            name: category.name,
            displayName: category.displayName,
            description: category.description || "",
            imageUrl: category.imageUrl || "",
            isEnabled: category.isEnabled,
            order: category.order,
        });
        setEditingCategory(category);
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
        setEditingCategory(null);
        setFormData({
            name: "",
            displayName: "",
            description: "",
            imageUrl: "",
            isEnabled: true,
            order: 0,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategoryMutation.mutateAsync({
                    id: editingCategory.id,
                    data: formData,
                });
                toast.success("Category updated successfully");
            } else {
                await createCategoryMutation.mutateAsync(formData);
                toast.success("Category created successfully");
            }
            handleCancel();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to save category"
            );
        }
    };

    const handleToggle = async (category) => {
        try {
            await updateStatusMutation.mutateAsync({
                name: category.name,
                isEnabled: !category.isEnabled,
            });
            toast.success(
                `${category.displayName} ${!category.isEnabled ? "enabled" : "disabled"} successfully`
            );
        } catch (error) {
            toast.error("Failed to update category status");
        }
    };

    const handleDelete = async (category) => {
        if (!window.confirm(`Are you sure you want to delete "${category.displayName}"?`)) {
            return;
        }

        try {
            await deleteCategoryMutation.mutateAsync(category.id);
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to delete category"
            );
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
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Category Management</h1>
                        <button
                            onClick={handleCreateClick}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Create Category
                        </button>
                    </div>

                    <div className="bg-[#27292C] rounded-lg p-6">
                        <div className="space-y-4">
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-4 bg-[#121417] rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {category.displayName}
                                                </h3>
                                                {category.isPredefined && (
                                                    <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                                                        Predefined
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-white/60 mt-1">
                                                {category.name}
                                            </p>
                                            {category.description && (
                                                <p className="text-sm text-white/40 mt-1">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    category.isEnabled
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {category.isEnabled ? "Enabled" : "Disabled"}
                                            </span>
                                            <button
                                                onClick={() => handleEditClick(category)}
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            {!category.isPredefined && (
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    disabled={deleteCategoryMutation.isPending}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleToggle(category)}
                                                disabled={updateStatusMutation.isPending}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    category.isEnabled
                                                        ? "bg-blue-500"
                                                        : "bg-gray-600"
                                                } ${updateStatusMutation.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        category.isEnabled
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-white/60">
                                    No categories found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {(isCreateModalOpen || editingCategory) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#27292C] rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingCategory ? "Edit Category" : "Create Category"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name (unique identifier)
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    disabled={!!editingCategory}
                                    className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                    placeholder="e.g., CUSTOM_CATEGORY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.displayName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, displayName: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g., Custom Category"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description (optional)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Category description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, imageUrl: e.target.value })
                                    }
                                    className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://example.com/image.png"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) =>
                                        setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                                    }
                                    min="0"
                                    className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isEnabled"
                                    checked={formData.isEnabled}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isEnabled: e.target.checked })
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isEnabled" className="text-sm">
                                    Enabled
                                </label>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={
                                        createCategoryMutation.isPending ||
                                        updateCategoryMutation.isPending
                                    }
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {editingCategory ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
