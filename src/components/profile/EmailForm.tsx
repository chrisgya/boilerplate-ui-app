import { useHistory } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { emailSchema } from '../../validations';
import { Button, Input } from '../formControls';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import FormTitleAndError from '../Layout/FormTitleAndError';
import { IEmailRequest } from '../../interfaces/IUser';
import { useEffect } from 'react';
import useMe from '../hooks/useMe';


const EmailForm = () => {
    const history = useHistory();
    const { data } = useMe();

    const methods = useForm<IEmailRequest>({ mode: "onChange", resolver: yupResolver(emailSchema) });

    const mutation = useMutation(agent.User.changeEmail, {
        onSuccess: (data) => {
            toast.success("Email successfully changed. Please check your mail box to verify your new email!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const reset = methods.reset;
    useEffect(() => { reset({ email: data?.email }); }, [data?.email, reset])

    const onSubmit = (value: IEmailRequest) => mutation.mutate(value)

    return (
        <div className="p-4 mt-4 border-2 rounded-lg shadow-lg">
            <FormTitleAndError title="" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>

                    <div className="flex flex-wrap">
                        <div className="w-3/4 pr-2">
                            <Input name="email" type="email" ref={methods.register} label="Email" disabled={mutation.isLoading} />
                        </div>

                        <div className="w-1/4 pl-2 mr-auto mt-7">
                            <Button type="submit" name="Change Email" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default EmailForm;
