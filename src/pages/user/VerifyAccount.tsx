import { Link, useHistory, useParams } from 'react-router-dom'
import React, { useCallback, useEffect } from 'react';
import FormLayout from '../../components/Layout/FormLayout';
import agent from '../../api/agent';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import FormTitleAndError from '../../components/Layout/FormTitleAndError';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../interfaces/IErrorMessage';
import Spin from '../../components/shared/svg/Spin';

const VerifyAccount = () => {

    const history = useHistory();
    const { token } = useParams<{ token: string }>();

    const { mutate, isLoading } = useMutation(agent.User.verifyAccount, {
        onSuccess: (_data) => {
            toast.success("Account successfully verified!");
            history.push('/login');
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error)
            toast.error(error?.data?.message);
            history.push('/login');
        }
    });

    const onSubmit = useCallback(() => { mutate(token) }, [mutate, token]);
    useEffect(() => { onSubmit(); }, [onSubmit])

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="VERIFYING ACCOUNT..." />

                {isLoading && <div className="flex justify-center">
                    <div className="w-12 h-12 text-blue-700"><Spin /></div>
                </div>}

            </div>

            <div className="flex justify-center text-base">
                <div>
                    <p className="block mt-2"><Link to="/login" className="font-bold text-blue-500">Go Back To Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default VerifyAccount;
