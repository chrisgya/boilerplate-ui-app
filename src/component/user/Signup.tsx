import { Link } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { createUserSchema } from '../../common/validations';
import { ILoginRequest } from '../../common/interfaces/ILogin';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';

const defaultValues = {
    email: '',
    password: ''
}
export default () => {
    const methods = useForm<ILoginRequest>({
        mode: "onChange",
        resolver: yupResolver(createUserSchema),
        defaultValues
    });

    const onSubmit = (data: ILoginRequest) => console.log(data);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm md:w-1/2 md:ml-auto md:mt-0">

                <p className="mx-auto my-2 text-sm">Create your account</p>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <div className="md:flex md:flex-wrap md:-m-2">

                            <div className="md:w-1/2">
                                <Input name="firstName" type="text" label="First Name" />
                            </div>


                            <div className="md:w-1/2" >
                                <Input name="middleName" type="text" label="Middle Name" />
                            </div>

                        </div>

                        <div className="md:flex md:flex-wrap md:-m-2">
                            <div className="md:w-1/2">
                                <Input name="lastName" type="text" label="Last Name" />
                            </div>
                            <div className="md:w-1/2">
                                <Input name="username" type="text" label="Username" />
                            </div>
                        </div>

                        <Input name="email" type="email" label="Email" />

                        <div className="md:flex md:flex-wrap md:-m-2">
                            <div className="md:w-1/2">
                                <Input name="password" type="password" label="Password" />
                            </div>
                            <div className="md:w-1/2">
                                <Input name="confirmPassword" type="password" label="Confirm Password" />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Account" />
                        </div>
                        <p className="block mt-4 text-xs">By clicking the <i className="font-bold">"Create Account"</i> button, you agree to Chrisgya’s <Link to="/login" className="font-bold text-blue-500">terms of acceptable use</Link></p>

                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base text-white">
                <div>
                    <p className="block mt-2">Already have an account? <Link to="/login" className="font-bold">Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

