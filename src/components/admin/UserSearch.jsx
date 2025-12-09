import React, { useState } from "react";
import FormGroup from "../shared/ui/FormGroup";
import FormButton from "../shared/ui/FormButton";

const UserSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        searchKey: "",
        role: "",
        individualCategory: "",
        isBlocked: "",
        onboardingCompleted: "",
    });

    const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== "" && value !== "all") {
                if (key === "isBlocked" || key === "onboardingCompleted") {
                    acc[key] = value === "true";
                } else {
                    acc[key] = value;
                }
            }
            return acc;
        }, {});
        onSearch(cleanFilters);
    };

    const handleReset = () => {
        setFilters({
            searchKey: "",
            role: "",
            individualCategory: "",
            isBlocked: "",
            onboardingCompleted: "",
        });
        onSearch({});
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#27292C] rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormGroup
                    label="Search"
                    type="text"
                    placeholder="Search by email, name..."
                    value={filters.searchKey}
                    onChange={(e) => handleChange("searchKey", e.target.value)}
                />

                <div>
                    <label className="block text-white/60 text-sm mb-2">Role</label>
                    <select
                        value={filters.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                    >
                        <option value="all">All Roles</option>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="ORGANIZATION">Organization</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-2">
                        Individual Category
                    </label>
                    <select
                        value={filters.individualCategory}
                        onChange={(e) =>
                            handleChange("individualCategory", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                    >
                        <option value="all">All Categories</option>
                        <option value="MODEL">Model</option>
                        <option value="PHOTOGRAPHER">Photographer</option>
                        <option value="VIDEOGRAPHER">Videographer</option>
                        <option value="EDITOR">Editor</option>
                        <option value="BEAUTY">Beauty</option>
                        <option value="TOURISM">Tourism</option>
                        <option value="ATHLETE">Athlete</option>
                        <option value="ARTIST">Artist</option>
                        <option value="FASHION">Fashion</option>
                        <option value="MUSIC_AND_SOUND_ENGINEER">
                            Music & Sound Engineer
                        </option>
                    </select>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-2">
                        Blocked Status
                    </label>
                    <select
                        value={filters.isBlocked}
                        onChange={(e) => handleChange("isBlocked", e.target.value)}
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                    >
                        <option value="all">All</option>
                        <option value="true">Blocked</option>
                        <option value="false">Not Blocked</option>
                    </select>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-2">
                        Onboarding Status
                    </label>
                    <select
                        value={filters.onboardingCompleted}
                        onChange={(e) =>
                            handleChange("onboardingCompleted", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
                    >
                        <option value="all">All</option>
                        <option value="true">Completed</option>
                        <option value="false">Not Completed</option>
                    </select>
                </div>
            </div>

            <div className="flex space-x-4">
                <FormButton type="submit" text="Search" />
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    Reset
                </button>
            </div>
        </form>
    );
};

export default UserSearch;
