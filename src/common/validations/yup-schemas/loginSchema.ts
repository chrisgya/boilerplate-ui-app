import * as yup from "yup";

const msg = 'Login failed. Invalid email/password';
export const loginSchema = yup.object().shape({
    email:  yup
    .string()
    .email(msg)
    .min(3, msg)
    .max(500, msg)
    .required(msg),
    password: yup
    .string()
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{4,35}$/, msg)
    .min(5, msg)
    .max(1000, msg)
    .required(msg)
});
