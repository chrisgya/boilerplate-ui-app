import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { emailSchema } from '../../common/validations';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../common/interfaces/IErrorMessage';
import FormTitleAndError from '../../common/Layout/FormTitleAndError';

interface IForgotPassword {
    email: string;
}
const defaultValues = {
    email: ''
}
const ForgetPasswordForm = () => {
    const history = useHistory();
    const methods = useForm<IForgotPassword>({
        mode: "onChange",
        resolver: yupResolver(emailSchema),
        defaultValues
    });

    const mutation = useMutation(agent.User.forgotPassword, {
        onSuccess: (_data) => {
            toast.success("Email sent to registered email address!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IForgotPassword) => mutation.mutate(data.email);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <FormTitleAndError title="REQUEST PASSWORD RESET" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" placeholder="Email" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Request reset" isBusy={mutation.isLoading} />
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

export default ForgetPasswordForm;