import React, { useState } from "react";
import FormGroup from "../shared/ui/FormGroup";
import FormButton from "../shared/ui/FormButton";
import { useAdminCreateUser } from "../../hooks/admin/useAdminUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
    const navigate = useNavigate();
    const createUserMutation = useAdminCreateUser();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "INDIVIDUAL",
        firstName: "",
        lastName: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.role) {
            newErrors.role = "Role is required";
        }

        if (formData.role === "INDIVIDUAL") {
            if (!formData.firstName) {
                newErrors.firstName = "First name is required";
            } else if (formData.firstName.length < 2) {
                newErrors.firstName = "First name must be at least 2 characters";
            }
            if (!formData.lastName) {
                newErrors.lastName = "Last name is required";
            } else if (formData.lastName.length < 2) {
                newErrors.lastName = "Last name must be at least 2 characters";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitData = {
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };

        if (formData.role === "INDIVIDUAL") {
            submitData.firstName = formData.firstName;
            submitData.lastName = formData.lastName;
        }

        try {
            await createUserMutation.mutateAsync(submitData);
            toast.success("User created successfully");
            navigate("/admin/users");
        } catch (error) {
            const errorMessage =
                error.response?.data?.data?.message ||
                "Failed to create user";
            
            // Parse backend validation errors and set them in the form
            if (errorMessage.includes("firstName") || errorMessage.includes("lastName")) {
                const backendErrors = {};
                const errorParts = errorMessage.split(",");
                
                errorParts.forEach((part) => {
                    if (part.includes("firstName")) {
                        backendErrors.firstName = "First name must be at least 2 characters";
                    }
                    if (part.includes("lastName")) {
                        backendErrors.lastName = "Last name must be at least 2 characters";
                    }
                });
                
                if (Object.keys(backendErrors).length > 0) {
                    setErrors({ ...errors, ...backendErrors });
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error(errorMessage);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#27292C] rounded-lg p-6 space-y-6">
            <div>
                <label className="block text-white/60 text-sm mb-2">Email *</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="user@example.com"
                    className={`w-full px-4 py-2 bg-[#121417] text-white rounded-lg border ${
                        errors.email ? "border-red-500" : "border-white/10"
                    } focus:outline-none focus:border-blue-primary`}
                />
                {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-white/60 text-sm mb-2">Password *</label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter password (min 8 characters)"
                    className={`w-full px-4 py-2 bg-[#121417] text-white rounded-lg border ${
                        errors.password ? "border-red-500" : "border-white/10"
                    } focus:outline-none focus:border-blue-primary`}
                />
                {errors.password && (
                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
            </div>

            <div>
                <label className="block text-white/60 text-sm mb-2">Role *</label>
                <select
                    value={formData.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className={`w-full px-4 py-2 bg-[#121417] text-white rounded-lg border ${
                        errors.role ? "border-red-500" : "border-white/10"
                    } focus:outline-none focus:border-blue-primary`}
                >
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="ORGANIZATION">Organization</option>
                    <option value="ADMIN">Admin</option>
                </select>
                {errors.role && (
                    <p className="text-red-400 text-xs mt-1">{errors.role}</p>
                )}
            </div>

            {formData.role === "INDIVIDUAL" && (
                <>
                    <div>
                        <label className="block text-white/60 text-sm mb-2">
                            First Name *
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            placeholder="Enter first name"
                            className={`w-full px-4 py-2 bg-[#121417] text-white rounded-lg border ${
                                errors.firstName ? "border-red-500" : "border-white/10"
                            } focus:outline-none focus:border-blue-primary`}
                        />
                        {errors.firstName && (
                            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-white/60 text-sm mb-2">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            placeholder="Enter last name"
                            className={`w-full px-4 py-2 bg-[#121417] text-white rounded-lg border ${
                                errors.lastName ? "border-red-500" : "border-white/10"
                            } focus:outline-none focus:border-blue-primary`}
                        />
                        {errors.lastName && (
                            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                        )}
                    </div>
                </>
            )}

            <div className="flex space-x-4">
                <FormButton
                    type="submit"
                    text="Create User"
                    loading={createUserMutation.isPending}
                    disabled={createUserMutation.isPending}
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
    );
};

export default CreateUserForm;
