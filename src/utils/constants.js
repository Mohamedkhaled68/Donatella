export const initialIndividualRegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};
export const initialOrganizationRegisterFormValues = {
    email: "",
    password: "",
};

export const individualRegisterFormGroupData = [
    {
        label: "First Name",
        type: "text",
        name: "firstName",
        id: "firstName",
        placeholder: "i.e. Davon",
        value: (formValues) => formValues.firstName,
        error: (errors) => errors.firstName,
    },
    {
        label: "Last Name",
        type: "text",
        name: "lastName",
        id: "lastName",
        placeholder: "i.e. Lean",
        value: (formValues) => formValues.lastName,
        error: (errors) => errors.lastName,
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        id: "email",
        placeholder: "i.e. davon@mail.com",
        value: (formValues) => formValues.email,
        error: (errors) => errors.email,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        id: "password",
        placeholder: "********",
        value: (formValues) => formValues.password,
        error: (errors) => errors.password,
    },
];

export const organizationRegisterFormGroupData = [
    {
        label: "Email",
        type: "email",
        name: "email",
        id: "email",
        placeholder: "i.e. davon@mail.com",
        value: (formValues) => formValues.email,
        error: (errors) => errors.email,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        id: "password",
        placeholder: "********",
        value: (formValues) => formValues.password,
        error: (errors) => errors.password,
    },
];
