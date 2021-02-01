import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { emailSchema } from '../../validations';
import { Button, Input } from '../../components/formControls';
import FormLayout from '../../components/Layout/FormLayout';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import FormTitleAndError from '../../components/Layout/FormTitleAndError';

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

    const mutation = useMutation(agent.Account.forgotPassword, {
        onSuccess: (_data) => {
            toast.success("Email sent to registered email address!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IForgotPassword) => mutation.mutate(data.email);

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="REQUEST PASSWORD RESET" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" ref={methods.register} placeholder="Email" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Request reset" isBusy={mutation.isLoading} />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">Remember your password? <Link to="/login" className="font-bold text-blue-500">Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default ForgetPasswordForm;