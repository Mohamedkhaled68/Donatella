import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaBuilding, FaCheckCircle, FaFilter } from "react-icons/fa";
import { useI18n } from "../../hooks/useI18n";

const filterAnimationVariants = {
	open: { height: "auto" },
	closed: { height: 0 },
	up: { rotate: 0 },
	down: { rotate: "180deg" },
};

const JobFilterDropdown = ({ isOpen, onFilterChange, jobs = [] }) => {
	const { t } = useI18n();
	const [organizationId, setOrganizationId] = useState("");
	const [jobName, setJobName] = useState("");
	const [proposalStatus, setProposalStatus] = useState("");
	const [jobStatus, setJobStatus] = useState("");

	const proposalStatusOptions = [
		{ value: "", label: t("explore.filters.proposalStatus") },
		{ value: "PENDING", label: t("explore.filters.pending") },
		{ value: "APPROVED", label: t("explore.filters.approved") },
		{ value: "REJECTED", label: t("explore.filters.rejected") },
		{ value: "FINISHED", label: t("explore.filters.finished") },
	];

	const jobStatusOptions = [
		{ value: "", label: t("explore.filters.jobStatus") },
		{ value: "OPEN", label: t("explore.filters.open") },
		{ value: "CLOSED", label: t("explore.filters.closed") },
		{ value: "ACCEPTED", label: t("explore.filters.accepted") },
		{ value: "FINISHED", label: t("explore.filters.finished") },
	];

	// Extract unique organizations from jobs
	const uniqueOrganizations = React.useMemo(() => {
		const orgsMap = new Map();
		jobs.forEach((job) => {
			if (job.organization?.id && job.organization?.name) {
				if (!orgsMap.has(job.organization.id)) {
					orgsMap.set(job.organization.id, {
						id: job.organization.id,
						name: job.organization.name,
					});
				}
			}
		});
		return Array.from(orgsMap.values());
	}, [jobs]);

	// Notify parent of filter changes - use ref to track previous values
	const prevFiltersRef = React.useRef({});
	useEffect(() => {
		const newFilters = {
			organizationId: organizationId || undefined,
			jobName: jobName || undefined,
			proposalStatus: proposalStatus || undefined,
			jobStatus: jobStatus || undefined,
		};

		// Only call onFilterChange if filters actually changed
		const prevFilters = prevFiltersRef.current;
		if (
			prevFilters.organizationId !== newFilters.organizationId ||
			prevFilters.jobName !== newFilters.jobName ||
			prevFilters.proposalStatus !== newFilters.proposalStatus ||
			prevFilters.jobStatus !== newFilters.jobStatus
		) {
			prevFiltersRef.current = newFilters;
			onFilterChange(newFilters);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId, jobName, proposalStatus, jobStatus, onFilterChange]);

	return (
		<motion.div
			initial="closed"
			animate={isOpen ? "open" : "closed"}
			variants={filterAnimationVariants}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="flex justify-between items-center mb-12 mt-5 overflow-hidden"
		>
			<div className="w-full rounded-3xl bg-[#27292C] flex justify-between items-center gap-[55px] px-[39px] py-2">
				{/* Organization Filter */}
				<div className="flex items-center gap-2">
					<FaBuilding
						color="#197FE5"
						size={20}
					/>
					<select
						className="bg-transparent p-3 outline-none border-none text-white-base min-w-[150px]"
						value={organizationId}
						onChange={(e) => setOrganizationId(e.target.value)}
					>
						<option value="">{t("explore.filters.allOrganizations")}</option>
						{uniqueOrganizations.map((org) => (
							<option
								key={org.id}
								value={org.id}
							>
								{org.name}
							</option>
						))}
					</select>
				</div>

				{/* Job Status Filter */}
				<div className="flex items-center gap-2">
					<FaFilter
						color="#197FE5"
						size={20}
					/>
					<select
						className="bg-transparent p-3 outline-none border-none text-white-base min-w-[150px]"
						value={jobStatus}
						onChange={(e) => setJobStatus(e.target.value)}
					>
						{jobStatusOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
							>
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* Job Name Filter */}
				<div className="flex items-center gap-2">
					<FaBriefcase
						color="#197FE5"
						size={20}
					/>
					<input
						type="text"
						placeholder={t("explore.filters.jobName")}
						className="bg-transparent p-3 outline-none border-none text-white-base placeholder-white-base/50 min-w-[150px]"
						value={jobName}
						onChange={(e) => setJobName(e.target.value)}
					/>
				</div>

				{/* Proposal Status Filter */}
				<div className="flex items-center gap-2">
					<FaCheckCircle
						color="#197FE5"
						size={20}
					/>
					<select
						className="bg-transparent p-3 outline-none border-none text-white-base min-w-[150px]"
						value={proposalStatus}
						onChange={(e) => setProposalStatus(e.target.value)}
					>
						{proposalStatusOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
							>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</motion.div>
	);
};

export default JobFilterDropdown;
