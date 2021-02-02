import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { updateUserSchema } from '../../validations';
import { Button, Input } from '../formControls';
import { useMutation, useQueryClient } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import FormTitleAndError from '../Layout/FormTitleAndError';
import { IUpdateUserRequest } from '../../interfaces/IUser';
import useMe from "../hooks/useMe";
import { useEffect } from "react";
import { ME } from "../../utils/constants";

const DetailsForm = () => {
    const { data } = useMe();
    const queryClient = useQueryClient();

    const methods = useForm<IUpdateUserRequest>({ mode: "onChange", resolver: yupResolver(updateUserSchema) });

    const mutation = useMutation(agent.User.updateUser, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(ME);
            toast.success("User details successfully updated!");

        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const reset = methods.reset;
    useEffect(() => { reset(data as IUpdateUserRequest); }, [data, reset])

    const onSubmit = (data: IUpdateUserRequest) => {
        if (!data.middleName) data.middleName = null;
        mutation.mutate(data);
    }



    return (
        <div className="p-4 mt-4 border-2 rounded-lg shadow-lg">
            <FormTitleAndError title="" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3 md:w-1/2">
                            <Input name="firstName" type="text" ref={methods.register} label="First Name" disabled={mutation.isLoading} />
                        </div>
                        <div className="w-full px-3 md:w-1/2">
                            <Input name="lastName" type="text" ref={methods.register} label="Last Name" disabled={mutation.isLoading} />
                        </div>
                    </div>

                    <Input name="middleName" type="text" ref={methods.register} label="Middle Name" disabled={mutation.isLoading} />


                    <div className="flex justify-center">
                        <Button type="submit" name="Update Details" isBusy={mutation.isLoading} disabled={mutation.isLoading || Object.keys(methods.formState.dirtyFields).length < 1} />
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}

export default DetailsForm;
