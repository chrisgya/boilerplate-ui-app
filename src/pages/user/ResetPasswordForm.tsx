import { Link, useHistory, useParams } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../../validations';
import { Button, Input } from '../../components/formControls';
import FormLayout from '../../components/Layout/FormLayout';
import { useMutation } from 'react-query';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import FormTitleAndError from '../../components/Layout/FormTitleAndError';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import { IResetPasswordRequest } from '../../interfaces/IUser';

const defaultValues = {
    token: '',
    confirmPassword: '',
    password: ''
}
const ResetPasswordForm = () => {

    const history = useHistory();
    const { token } = useParams<{ token: string }>();

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
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="CREATE NEW PASSWORD" mutation={mutation} />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Input name="password" type="password" ref={methods.register} placeholder="Password" disabled={mutation.isLoading} />
                        <Input name="confirmPassword" type="password" ref={methods.register} placeholder="Confirm Password" disabled={mutation.isLoading} />

                        <div className="flex justify-center">
                            <Button type="submit" name="Create Password" isBusy={mutation.isLoading} />
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2">You remember your password and want to login instead? <Link to="/login" className="font-bold text-blue-500">Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default ResetPasswordForm;