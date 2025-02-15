export const validateForm = (formValues) => {
    const errors = {};

    for (const field in formValues) {
        if (formValues.hasOwnProperty(field)) {
            const value = formValues[field].trim();

            switch (field) {
                case "firstName":
                case "lastName":
                    if (!value) {
                        errors[field] = `${field.replace(
                            /([A-Z])/g,
                            " $1"
                        )} is required.`;
                    } else if (value.length < 3) {
                        errors[field] = `must be at least 3 characters.`;
                    }
                    break;

                case "email":
                    if (!value) {
                        errors.email = "Email is required.";
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        errors.email = "Invalid email format.";
                    }
                    break;

                case "password":
                    if (!value) {
                        errors.password = "Password is required.";
                    } else if (!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value)) {
                        errors.password =
                            "Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special character.";
                    }
                    break;

                default:
                    // Add additional field validation rules here if necessary
                    if (!value) {
                        errors[field] = `${field.replace(
                            /([A-Z])/g,
                            " $1"
                        )} is required.`;
                    }
                    break;
            }
        }
    }

    return errors;
};
