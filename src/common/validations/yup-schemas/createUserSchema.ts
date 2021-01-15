import * as yup from "yup";

import { EmailValidation, PasswordValidation, NameValidation, OptionalNameValidation } from "./shared";

export const createUserSchema = yup.object().shape({
    email: EmailValidation,
    firstname: NameValidation,
    middlename: OptionalNameValidation,
    lastname: NameValidation,
    // terms: yup.boolean().required('accept terms and conditions'),
    password: PasswordValidation,
    confirmpassword: yup
                    .string()
                    .oneOf([yup.ref('password')], 'Passwords are not the same!')
                    .required('Password confirmation is required!')
});
