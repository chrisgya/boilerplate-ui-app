import * as yup from "yup";

import { NameValidation, OptionalNameValidation } from "./shared";

export const updateUserSchema = yup.object().shape({
    firstname: NameValidation,
    middlename: OptionalNameValidation,
    lastname: NameValidation
});



