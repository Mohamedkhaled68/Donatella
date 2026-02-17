import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import useRegister from "../../../hooks/auth/useRegister";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { getIndividualRegisterFormGroupData, initialIndividualRegisterFormValues } from "../../../utils/constants";
import { validateForm } from "../../../utils/validators";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";

const IndividualRegisterForm = ({ role = "Individual", loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialIndividualRegisterFormValues);
	const [disabled, setDisabled] = useState(true);
	const [errors, setErrors] = useState({});
	const { t } = useI18n();

	const individualRegisterFormGroupData = getIndividualRegisterFormGroupData(t);
	console.log(individualRegisterFormGroupData);

	const { mutateAsync } = useRegister();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await toast
			.promise(
				mutateAsync({ ...formValues, role: role.toUpperCase() }),
				{
					loading: t("registration.individual.registering"),
					success: () => {
						setFormValues(initialIndividualRegisterFormValues);
						return t("registration.individual.registeredSuccess");
					},
					error: (err) => err?.response?.data?.message,
				},
				{
					success: {
						icon: "🚀",
					},
				},
			)
			.catch((err) => {
				toast.error(err?.response?.data?.message || t("registration.individual.failedToRegister"));
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		const isFilled = Object.values(formValues).every((value) => value !== "");

		const errors = validateForm(formValues, t);
		setErrors(errors);

		setDisabled(!isFilled || Object.keys(errors).length !== 0);
	}, [formValues, t]);
	return (
		<form
			className="w-[100%] flex flex-col gap-4 mt-6"
			onSubmit={handleSubmit}
		>
			<div className="grid grid-cols-1 gap-4">
				{individualRegisterFormGroupData.map((group, index) => (
					<motion.div
						key={index}
						initial={{
							opacity: 0,
							y: 40,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
							delay: index * 0.2,
						}}
						className="col-span-1"
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
			</div>
			<div className="flex flex-col items-start gap-2 mt-6">
				<FormButton
					loading={loading}
					disabled={disabled}
					text={t("registration.individual.signUp")}
				/>
				<p className="text-medium text-white-base/40">
					{t("registration.individual.alreadyHaveAccount")}{" "}
					<NavLink
						className="text-blue-primary"
						to={getLanguagePath(`/login`)}
					>
						{t("registration.individual.clickHereToLogin")}
					</NavLink>
				</p>
			</div>
		</form>
	);
};

export default IndividualRegisterForm;
