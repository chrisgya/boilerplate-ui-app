import { Link } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { resetPasswordSchema } from '../../common/validations';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';
import { IResetPasswordRequest } from '../../common/interfaces/IResetPassword';

const defaultValues = {
    email: '',
    password: ''
}
export default () => {
    const methods = useForm<IResetPasswordRequest>({
        mode: "onChange",
        resolver: yupResolver(resetPasswordSchema),
        defaultValues
    });

    const onSubmit = (data: IResetPasswordRequest) => console.log(data);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <p className="mx-auto my-2 text-sm">CREATE NEW PASSWORD</p>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="password" type="password" placeholder="Password" />
                        <Input name="confirmPassword" type="password" placeholder="Confirm Password" />

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Password" />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base text-white">
                <div>
                    <p className="block mt-2">You remember your password and want to login instead? <Link to="/login" className="font-bold">Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

