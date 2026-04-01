export const validateForm = (formValues, t) => {
	const errors = {};

	for (const field in formValues) {
		if (Object.hasOwn(formValues, field)) {
			const value = formValues[field].trim();

			switch (field) {
				case "firstName":
				case "lastName":
					if (!value) {
						errors[field] = t("validators.fieldRequired", {
							field: field.replace(/([A-Z])/g, " $1"),
						});
					} else if (value.length < 3) {
						errors[field] = t("validators.mustBeAtLeast3Characters");
					}
					break;

				case "email":
					if (!value) {
						errors.email = t("validators.emailRequired");
					} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						errors.email = t("validators.invalidEmailFormat");
					}
					break;

				case "password":
					if (!value) {
						errors.password = t("validators.passwordRequired");
					} else if (!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value)) {
						errors.password = t("validators.passwordRequirements");
					}
					break;

				default:
					// Add additional field validation rules here if necessary
					if (!value) {
						errors[field] = t("validators.fieldRequired", {
							field: field.replace(/([A-Z])/g, " $1"),
						});
					}
					break;
			}
		}
	}

	return errors;
};
