import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useGetNotifications from "../../hooks/notifications/useGetNotifications";
import { useI18n } from "../../hooks/useI18n";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({ isOpen, onClose }) => {
	const { t, isRtl } = useI18n();
	const dropdownRef = useRef(null);
	const { data, isLoading } = useGetNotifications(1, 10);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ y: -10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.3 }}
			ref={dropdownRef}
			className={`absolute bg-slate-700 rounded-md z-[10000] top-[52px] w-[400px] max-h-[500px] overflow-hidden shadow-lg border border-white-base/10 ${isRtl ? "left-0" : "right-0"}`}
		>
			<div className="flex flex-col">
				<div className="px-4 py-3 border-b border-white-base/10">
					<h3 className="text-white-base font-semibold text-base">{t("notifications.notifications")}</h3>
				</div>
				<div className="overflow-y-auto max-h-[450px]">
					{isLoading ? (
						<div className="px-4 py-8 text-center text-white-base/50 text-sm">
							{t("notifications.loadingNotifications")}
						</div>
					) : data?.items?.length > 0 ? (
						data.items.map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))
					) : (
						<div className="px-4 py-8 text-center text-white-base/50 text-sm">
							{t("notifications.noNotificationsYet")}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default NotificationDropdown;
