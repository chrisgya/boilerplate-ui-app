import { Link, useLocation } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { loginSchema } from '../../validations';
import { Button, Input } from '../../components/formControls';
import FormLayout from '../../components/Layout/FormLayout';
import agent from '../../api/agent';
import { useMutation } from 'react-query';
import { useAtom } from 'jotai';
import { isLoginAtom } from '../../stores/userAtom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import FormTitleAndError from '../../components/Layout/FormTitleAndError';
import { ILoginRequest } from '../../interfaces/IUser';
import { RedirectTo } from '../../components/routes/RedirectTo';
const defaultValues = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const passwordRef = useRef<HTMLInputElement>();
    const location = useLocation();
    const [, setIsLoggedIn] = useAtom(isLoginAtom);

    const methods = useForm<ILoginRequest>({
        mode: "onChange",
        resolver: yupResolver(loginSchema),
        defaultValues
    });

    const mutation = useMutation(agent.Account.login, {
        onSuccess: (data) => {
            window.sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
            window.sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken);
            setIsLoggedIn(true);
            RedirectTo(location);
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            methods.setValue('password', '');
            passwordRef.current?.focus();
            console.log('chrisgya error: ', error);
        }
    });

    const onSubmit = (data: ILoginRequest) => mutation.mutate(data);

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="LOGIN" mutation={mutation} email={methods.getValues('email')} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="email" type="email" ref={methods.register} placeholder="Email" disabled={mutation.isLoading} />
                        <Input name="password" type="password" ref={(e: HTMLInputElement) => {
                            methods.register(e)
                            passwordRef.current = e
                        }} placeholder="Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Sign In" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                    </form>
                </FormProvider>

            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">New to Chrisgya? <Link to="/signup" className="font-bold text-blue-500">Sign up</Link></p>
                    <Link to="/forgot-password" className="block font-bold text-blue-500">Forgot your password?</Link>
                </div>
            </div>
        </FormLayout>
    )
}

export default LoginForm;