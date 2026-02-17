import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useRegister from "../../../hooks/auth/useRegister";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { getOrganizationRegisterFormGroupData, initialOrganizationRegisterFormValues } from "../../../utils/constants";
import { validateForm } from "../../../utils/validators";
import TermsModal from "../../onBoarding/TermsModal";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";

const OrganizationRegisterForm = ({ role = "Organization", loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialOrganizationRegisterFormValues);
	const [disabled, setDisabled] = useState(true);
	const [errors, setErrors] = useState({});
	const { t } = useI18n();
	const [termsModal, setTermsModal] = useState(false);
	const [check, setCheck] = useState(false);

	const organizationRegisterFormGroupData = getOrganizationRegisterFormGroupData(t);
	const { mutateAsync } = useRegister();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	console.log("OrganizationRegisterForm");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await toast
			.promise(
				mutateAsync({ ...formValues, role: role.toUpperCase() }),
				{
					loading: t("registration.organization.registering"),
					success: t("registration.organization.registeredSuccess"),
					error: (err) => err?.response?.data?.message,
				},
				{
					success: {
						icon: "🚀",
					},
				},
			)
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setFormValues(initialOrganizationRegisterFormValues);
				setLoading(false);
			});
	};

	useEffect(() => {
		const isFilled = Object.values(formValues).every((value) => value !== "");

		const errors = validateForm(formValues, t);
		setErrors(errors);

		setDisabled(!isFilled || Object.keys(errors).length !== 0 || !check);
	}, [formValues, check, t]);

	return (
		<form
			className="w-full h-full flex flex-col gap-4 mt-6"
			onSubmit={handleSubmit}
		>
			{organizationRegisterFormGroupData.map((group, index) => (
				<motion.div
					key={index}
					initial={{
						opacity: 0,
						x: -40,
					}}
					animate={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						duration: 0.5,
						delay: index * 0.2,
					}}
				>
					<FormGroup
						label={group.label}
						type={group.type}
						name={group.name}
						id={group.id}
						placeholder={group.placeholder}
						value={group.value(formValues)}
						onChange={handleInputChange}
						error={group.error(errors)}
						validate={true}
					/>
				</motion.div>
			))}
			<div className="flex flex-col items-start gap-2 mt-6">
				<div className="flex items-center gap-3">
					<div
						onClick={() => setCheck(!check)}
						className={`w-6 h-6 rounded-[5px] ${
							check ? "bg-blue-primary" : "bg-white-base/50"
						} flex justify-center items-center transition-colors cursor-pointer duration-200`}
					>
						<FaCheck className="text-white-base" />
					</div>
					<h1
						onClick={() => setTermsModal(true)}
						className="text-[#64748B] text-base font-medium cursor-pointer hover:text-blue-primary transition-colors"
					>
						{t("termsAndConditions.iAgreeToTerms")}
					</h1>
				</div>
				<FormButton
					loading={loading}
					disabled={disabled}
					text={t("registration.organization.signUp")}
				/>
				<p className="text-medium text-white-base/40">
					{t("registration.organization.alreadyHaveAccount")}{" "}
					<NavLink
						className="text-blue-primary"
						to={getLanguagePath(`/login`)}
					>
						{t("registration.organization.clickHereToLogin")}
					</NavLink>
				</p>
			</div>

			<TermsModal
				isOpen={termsModal}
				onClose={() => setTermsModal(false)}
			/>
		</form>
	);
};

export default OrganizationRegisterForm;
