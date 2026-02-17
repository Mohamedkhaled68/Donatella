import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useI18n } from "../../hooks/useI18n";

const TermsModal = ({ isOpen, onClose }) => {
	const { t, isRtl } = useI18n();

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 bg-black/70 z-[10000] flex justify-center items-center p-4"
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					onClick={(e) => e.stopPropagation()}
					className={`bg-[#27292C] rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isRtl ? "text-right" : "text-left"}`}
					dir={isRtl ? "rtl" : "ltr"}
				>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold text-white-base">{t("termsAndConditions.title")}</h2>
							<p className="text-white-base/70 text-sm mt-1">{t("termsAndConditions.companyName")}</p>
							<p className="text-white-base/50 text-xs mt-1">{t("termsAndConditions.lastUpdated")}</p>
						</div>
						<button
							onClick={onClose}
							className="text-white-base hover:bg-white-base/20 rounded-full p-2 transition-colors"
							aria-label={t("termsAndConditions.close")}
						>
							<IoClose size={24} />
						</button>
					</div>

					<div className="space-y-6 text-white-base/90">
						{/* Separator */}
						<div className="border-t border-white-base/20"></div>

						{/* Introduction */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.introduction.title")}</h3>
							<p className="text-white-base/80 leading-relaxed">
								{t("termsAndConditions.sections.introduction.content")}
							</p>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Eligibility */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.eligibility.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.eligibility.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* International Use */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.internationalUse.title")}</h3>
							<p className="text-white-base/80 leading-relaxed whitespace-pre-line">
								{t("termsAndConditions.sections.internationalUse.content")}
							</p>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Accounts */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.accounts.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.accounts.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Services */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.services.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.services.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Payments */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.payments.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.payments.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Cancellations & Refunds */}
						<div>
							<h3 className="text-xl font-semibold mb-3">
								{t("termsAndConditions.sections.cancellationsRefunds.title")}
							</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.cancellationsRefunds.points", { returnObjects: true }).map(
									(point, index) => (
										<li key={index}>{point}</li>
									),
								)}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Communications */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.communications.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.communications.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Intellectual Property */}
						<div>
							<h3 className="text-xl font-semibold mb-3">
								{t("termsAndConditions.sections.intellectualProperty.title")}
							</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.intellectualProperty.points", { returnObjects: true }).map(
									(point, index) => (
										<li key={index}>{point}</li>
									),
								)}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Data & Privacy */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.dataPrivacy.title")}</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.dataPrivacy.points", { returnObjects: true }).map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Limitation of Liability */}
						<div>
							<h3 className="text-xl font-semibold mb-3">
								{t("termsAndConditions.sections.limitationOfLiability.title")}
							</h3>
							<ul className="list-disc list-inside space-y-2 text-white-base/80 ml-4">
								{t("termsAndConditions.sections.limitationOfLiability.points", { returnObjects: true }).map(
									(point, index) => (
										<li key={index}>{point}</li>
									),
								)}
							</ul>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Termination */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.termination.title")}</h3>
							<p className="text-white-base/80 leading-relaxed">
								{t("termsAndConditions.sections.termination.content")}
							</p>
						</div>

						<div className="border-t border-white-base/20"></div>

						{/* Governing Law & Jurisdiction */}
						<div>
							<h3 className="text-xl font-semibold mb-3">{t("termsAndConditions.sections.governingLaw.title")}</h3>
							<p className="text-white-base/80 leading-relaxed whitespace-pre-line">
								{t("termsAndConditions.sections.governingLaw.content")}
							</p>
						</div>
					</div>

					<div className="mt-6 pt-6 border-t border-white-base/20">
						<button
							onClick={onClose}
							className="w-full px-6 py-3 bg-blue-primary hover:bg-blue-primary/90 text-white-base rounded-lg font-medium transition-colors"
						>
							{t("termsAndConditions.close")}
						</button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default TermsModal;
