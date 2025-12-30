import React, { useState } from "react";
import FormGroup from "../shared/ui/FormGroup";
import FormButton from "../shared/ui/FormButton";
import { useAdminGetCategories } from "../../hooks/admin/useAdminCategories";

const NotificationForm = ({ onSubmit }) => {
    const { data: categories } = useAdminGetCategories();
    const [formData, setFormData] = useState({
        target: "SPECIFIC_USER",
        email: "",
        userRole: "",
        individualCategory: "",
        title: "",
        body: "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            target: formData.target,
            title: formData.title,
            body: formData.body,
        };

        if (formData.target === "SPECIFIC_USER") {
            data.email = formData.email;
        } else if (formData.target === "BY_USER_ROLE") {
            data.userRole = formData.userRole;
        } else if (formData.target === "BY_INDIVIDUAL_CATEGORY") {
            data.individualCategory = formData.individualCategory;
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#27292C] rounded-lg p-6 space-y-6">
            <div>
                <label className="block text-white/60 text-sm mb-2">
                    Target Audience
                </label>
                <select
                    value={formData.target}
                    onChange={(e) => handleChange("target", e.target.value)}
                    className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                >
                    <option value="SPECIFIC_USER">Specific User</option>
                    <option value="ALL_USERS">All Users</option>
                    <option value="BY_USER_ROLE">By User Role</option>
                    <option value="BY_INDIVIDUAL_CATEGORY">
                        By Individual Category
                    </option>
                </select>
            </div>

            {formData.target === "SPECIFIC_USER" && (
                <FormGroup
                    label="Email"
                    type="email"
                    placeholder="Enter user email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />
            )}

            {formData.target === "BY_USER_ROLE" && (
                <div>
                    <label className="block text-white/60 text-sm mb-2">
                        User Role
                    </label>
                    <select
                        value={formData.userRole}
                        onChange={(e) => handleChange("userRole", e.target.value)}
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="ORGANIZATION">Organization</option>
                    </select>
                </div>
            )}

            {formData.target === "BY_INDIVIDUAL_CATEGORY" && (
                <div>
                    <label className="block text-white/60 text-sm mb-2">
                        Individual Category
                    </label>
                    <select
                        value={formData.individualCategory}
                        onChange={(e) =>
                            handleChange("individualCategory", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.displayName}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <FormGroup
                label="Title *"
                type="text"
                placeholder="Enter notification title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
            />

            <div>
                <label className="block text-white/60 text-sm mb-2">
                    Body *
                </label>
                <textarea
                    value={formData.body}
                    onChange={(e) => handleChange("body", e.target.value)}
                    placeholder="Enter notification body"
                    className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary min-h-[100px]"
                    required
                />
            </div>

            <FormButton type="submit" text="Send Notification" />
        </form>
    );
};

export default NotificationForm;
