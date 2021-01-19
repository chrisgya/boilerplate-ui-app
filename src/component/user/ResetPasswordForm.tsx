import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { resetPasswordSchema } from '../../common/validations';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';
import { IResetPasswordRequest } from '../../common/interfaces/IResetPassword';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import FormTitleAndError from '../../common/Layout/FormTitleAndError';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../common/interfaces/IErrorMessage';

const defaultValues = {
    token: '',
    email: '',
    password: ''
}
const ResetPasswordForm = () => {
    const [token, setToken] = useState<string>('');
    const history = useHistory();
    const match = useRouteMatch<{ token: string }>();

    useEffect(() => {
        if (match.params.token) {
            setToken(match.params.token);
        }
    }, [match.params.token])

    const methods = useForm<IResetPasswordRequest>({
        mode: "onChange",
        resolver: yupResolver(resetPasswordSchema),
        defaultValues
    });

    const mutation = useMutation(agent.User.resetPassword, {
        onSuccess: (_data) => {
            toast.success("Password successfully created. You can login now!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IResetPasswordRequest) => {
        data.token = token;
        mutation.mutate(data);
    }

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <FormTitleAndError title="CREATE NEW PASSWORD" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="password" type="password" placeholder="Password" disabled={mutation.isLoading} />
                        <Input name="confirmPassword" type="password" placeholder="Confirm Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Password" isBusy={mutation.isLoading} />
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

export default ResetPasswordForm;