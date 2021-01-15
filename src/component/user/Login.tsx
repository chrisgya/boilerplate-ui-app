import { Link } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { loginSchema } from '../../common/validations';
import { ILoginRequest } from '../../common/interfaces/ILogin';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';

const defaultValues = {
    email: '',
    password: ''
}
export default () => {
    const methods = useForm<ILoginRequest>({
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
        defaultValues
    });

    const onSubmit = (data: ILoginRequest) => console.log(data);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <p className="mx-auto my-2 text-sm">LOGIN</p>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" placeholder="Email" dontShowError />
                        <Input name="password" type="password" placeholder="Password" dontShowError />

                        <div className="flex justify-center">
                            <Button type="submit" name="Sign In" />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base text-white">
                <div>
                    <p className="block mt-2">New to Chrisgya? <Link to="/signup" className="font-bold">Sign up</Link></p>
                    <Link to="/forgot-password" className="block font-bold">Forgot your password?</Link>
                </div>
            </div>
        </FormLayout>
    )
}

