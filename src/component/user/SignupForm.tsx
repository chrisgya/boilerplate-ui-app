import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { createUserSchema } from '../../common/validations';
import { Button, Input } from '../../common/formControls';
import FormLayout from '../../common/Layout/FormLayout';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../common/interfaces/IErrorMessage';
import FormTitleAndError from '../../common/Layout/FormTitleAndError';
import { ISignupRequest } from '../../common/interfaces/IUser';

const defaultValues = {
    username: '',
    email: '',
    firstName: '',
    middleName: null,
    lastName: '',
    password: '',
    confirmPassword: '',
    roleIds: null
}
const SignupForm = () => {
    const history = useHistory();

    const methods = useForm<ISignupRequest>({
        mode: "onBlur",
        resolver: yupResolver(createUserSchema),
        defaultValues
    });

    const mutation = useMutation(agent.User.signup, {
        onSuccess: (data) => {
            console.log('created user', data)
            toast.success("Account successfully created. Email sent to registered email address for verification!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: ISignupRequest) => {
        if (!data.middleName) data.middleName = null;
        mutation.mutate(data);
    }
    return (
        <FormLayout>
            <div className="largeInnerFormContainer">

                <FormTitleAndError title="CREATE YOUR ACCOUNT" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="username" type="text" label="Username" disabled={mutation.isLoading} />

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="firstName" type="text" label="First Name" disabled={mutation.isLoading} />
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="lastName" type="text" label="Last Name" disabled={mutation.isLoading} />
                            </div>
                        </div>

                        <Input name="middleName" type="text" label="Middle Name" disabled={mutation.isLoading} />
                        <Input name="email" type="email" label="Email" disabled={mutation.isLoading} />

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="password" type="password" label="Password" disabled={mutation.isLoading} />
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <Input name="confirmPassword" type="password" label="Confirm Password" disabled={mutation.isLoading} />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Account" isBusy={mutation.isLoading} />
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

export default SignupForm;
