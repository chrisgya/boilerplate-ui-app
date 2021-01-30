import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import agent from '../../api/agent';
import { Button } from '../../components/formControls';
import { IErrorMessage } from '../../interfaces/IErrorMessage';

type emailType = { email: string }

const RequestConfirmationLink = (prop: emailType) => {

    const [hide, setHide] = useState<boolean>(false);

    const methods = useForm();

    const mutation = useMutation(agent.User.requestConfirmationLink, {
        onSuccess: (_data) => {
            toast.success("Confirmation link sent to registered email address!");
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error)
            toast.error(error?.data?.message);
        },
        onSettled: () => {
            methods.reset();
            setHide(true);
        }
    });

    return (
        hide ? null : <Button type="button" onClick={() => mutation.mutate(prop.email)} name="Request Confirmation Link" isBusy={mutation.isLoading} />

    )
}

export default RequestConfirmationLink;