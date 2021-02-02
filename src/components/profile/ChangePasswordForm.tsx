import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { IChangePasswordRequest } from '../../interfaces/IUser';
import { changePasswordSchema } from '../../validations';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { logout } from '../../utils/helper';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import FormLayout from '../Layout/FormLayout';
import FormTitleAndError from '../Layout/FormTitleAndError';
import { Button, Input } from '../formControls';

const defaultValues = {
    password: '',
    newPassword: '',
    confirmPassword: ''
}
const ChangePasswordForm = () => {

    const methods = useForm<IChangePasswordRequest>({
        mode: "onChange",
        resolver: yupResolver(changePasswordSchema),
        defaultValues
    });

    const mutation = useMutation(agent.User.changePassword, {
        onSuccess: () => {
            toast.success("Password successfully Changed. Please login now!");
            logout();
        },
        onError: (error: AxiosResponse<IErrorMessage>) => console.log('chrisgya error: ', error)
    });

    const onSubmit = (data: IChangePasswordRequest) => {
        mutation.mutate(data);
    }

    return (<FormLayout hideLogo={true}>
        <div className="mx-auto shadow-2xl md:w-2/4">

            <FormTitleAndError title="CHANGE PASSWORD" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Input name="password" type="password" ref={methods.register} placeholder="Password" disabled={mutation.isLoading} />
                    <Input name="newPassword" type="password" ref={methods.register} placeholder="New Password" disabled={mutation.isLoading} />
                    <Input name="confirmPassword" type="password" ref={methods.register} placeholder="Confirm New Password" disabled={mutation.isLoading} />

                    <div className="flex justify-center">
                        <Button type="submit" name="Change Password" isBusy={mutation.isLoading} />
                    </div>
                </form>
            </FormProvider>
        </div>
    </FormLayout>
    )
}

export default ChangePasswordForm;
