import * as yup from "yup";

import { EmailValidation, PasswordValidation, NameValidation, OptionalNameValidation } from "./shared";

export const createUserSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Name should be between 3 and 30 characters long")
        .max(30, "Name should be between 3 and 30 characters long")
        .required(),
    email: EmailValidation,
    firstName: NameValidation,
    middleName: OptionalNameValidation,
    lastName: NameValidation,
    // terms: yup.boolean().required('accept terms and conditions'),
    password: PasswordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords are not the same!')
        .required('Password confirmation is required!')
});
