import { Link } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { emailSchema } from '../../common/validations';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';

const defaultValues = {
    email: ''
}
export default () => {
    const methods = useForm<String>({
        mode: "onChange",
        resolver: yupResolver(emailSchema),
        defaultValues
    });

    const onSubmit = (data: String) => console.log(data);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <p className="mx-auto my-2 text-sm">REQUEST PASSWORD RESET</p>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" placeholder="Email" />

                        <div className="flex justify-center">
                            <Button type="submit" name="Request reset" />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base text-white">
                <div>
                    <p className="block mt-2">Remember your password? <Link to="/login" className="font-bold">Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

