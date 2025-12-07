import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBriefcase, FaCheckCircle, FaSearch } from "react-icons/fa";

const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
};

const proposalStatusOptions = [
    { value: "", label: "Proposal Status" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "FINISHED", label: "Finished" },
];

const MessageFilterDropdown = ({ isOpen, onFilterChange, chats = [] }) => {
    const [organizationId, setOrganizationId] = useState("");
    const [jobName, setJobName] = useState("");
    const [proposalStatus, setProposalStatus] = useState("");
    const [searchKey, setSearchKey] = useState("");

    // Extract unique organizations from chats
    const uniqueOrganizations = React.useMemo(() => {
        const orgsMap = new Map();
        chats.forEach((chat) => {
            if (chat.friend?.organization?.id && chat.friend?.organization?.name) {
                if (!orgsMap.has(chat.friend.organization.id)) {
                    orgsMap.set(chat.friend.organization.id, {
                        id: chat.friend.organization.id,
                        name: chat.friend.organization.name,
                    });
                }
            }
        });
        return Array.from(orgsMap.values());
    }, [chats]);

    // Notify parent of filter changes
    useEffect(() => {
        onFilterChange({
            organizationId: organizationId || undefined,
            jobName: jobName || undefined,
            proposalStatus: proposalStatus || undefined,
            searchKey: searchKey || undefined,
        });
    }, [organizationId, jobName, proposalStatus, searchKey, onFilterChange]);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={filterAnimationVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mb-4"
        >
            <div className="w-full rounded-lg bg-[#27292C] flex flex-wrap justify-between items-center gap-4 px-4 py-3">
                {/* Search Key Filter */}
                <div className="flex items-center gap-2">
                    <FaSearch color="#197FE5" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent p-2 outline-none border-none text-white-base placeholder-white-base/50 min-w-[150px] text-sm"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                </div>

                {/* Organization Filter */}
                {uniqueOrganizations.length > 0 && (
                    <div className="flex items-center gap-2">
                        <FaBuilding color="#197FE5" size={16} />
                        <select
                            className="bg-transparent p-2 outline-none border-none text-white-base min-w-[150px] text-sm"
                            value={organizationId}
                            onChange={(e) => setOrganizationId(e.target.value)}
                        >
                            <option value="">All Organizations</option>
                            {uniqueOrganizations.map((org) => (
                                <option key={org.id} value={org.id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Job Name Filter */}
                <div className="flex items-center gap-2">
                    <FaBriefcase color="#197FE5" size={16} />
                    <input
                        type="text"
                        placeholder="Job Name"
                        className="bg-transparent p-2 outline-none border-none text-white-base placeholder-white-base/50 min-w-[150px] text-sm"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                    />
                </div>

                {/* Proposal Status Filter */}
                <div className="flex items-center gap-2">
                    <FaCheckCircle color="#197FE5" size={16} />
                    <select
                        className="bg-transparent p-2 outline-none border-none text-white-base min-w-[150px] text-sm"
                        value={proposalStatus}
                        onChange={(e) => setProposalStatus(e.target.value)}
                    >
                        {proposalStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageFilterDropdown;
