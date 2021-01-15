import * as yup from "yup";

import { PasswordValidation, EmailValidation } from "./shared";

export const changePasswordSchema = yup.object().shape({
    email: EmailValidation,
    password: yup.string().required('Current password is required'),
    newPassword: PasswordValidation,
    confirmpassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords are not the same!')
    .required('Password confirmation is required!')
});
