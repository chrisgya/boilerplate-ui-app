import { Link, useLocation } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { loginSchema } from '../../common/validations';
import { ILoginRequest } from '../../common/interfaces/ILogin';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';
import agent from '../../api/agent';
import { useMutation } from 'react-query';
import { RedirectTo } from '../shared';
import { useAtom } from 'jotai';
import { isLoginAtom } from '../../store/userAtom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../common/utils/constants';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../common/interfaces/IErrorMessage';
import FormTitleAndError from '../../common/Layout/FormTitleAndError';
const defaultValues = {
    email: '',
    password: ''
}

const LoginForm = () => {

    const location = useLocation();
    const [, setIsLoggedIn] = useAtom(isLoginAtom);

    const methods = useForm<ILoginRequest>({
        mode: "onChange",
        resolver: yupResolver(loginSchema),
        defaultValues
    });

    const mutation = useMutation(agent.User.login, {
        onSuccess: (data) => {
            window.sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
            window.sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken);
            setIsLoggedIn(true);
            RedirectTo(location);
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            methods.setValue('password', '');
            console.log('chrisgya error: ', error);
        }
    });

    const onSubmit = (data: ILoginRequest) => mutation.mutate(data);

    return (
        <FormLayout>
            <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-sm lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">

                <FormTitleAndError title="LOGIN" mutation={mutation} email={methods.getValues('email')} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" placeholder="Email" disabled={mutation.isLoading} />
                        <Input name="password" type="password" placeholder="Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Sign In" isBusy={mutation.isLoading} />
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

export default LoginForm;