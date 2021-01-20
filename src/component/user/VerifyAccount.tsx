import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react';
import FormLayout from '../../common/Layout/FormLayout';
import agent from '../../api/agent';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import FormTitleAndError from '../../common/Layout/FormTitleAndError';
import { AxiosResponse } from 'axios';
import { IErrorMessage } from '../../common/interfaces/IErrorMessage';

const VerifyAccount = () => {

    const history = useHistory();
    const match = useRouteMatch<{ token: string }>();

    const mutation = useMutation(agent.User.verifyAccount, {
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

    useEffect(() => {
        if (match.params.token) {
            mutation.mutate(match.params.token);
        }
    }, [match.params.token])

    return (
        <FormLayout>
            <div className="smallInnerFormContainer">

                <FormTitleAndError title="VERIFYING ACCOUNT..." />

                {mutation.isLoading && <div>Show spinner...</div>}

            </div>

            <div className="flex justify-center text-base text-white">
                <div>
                    <p className="block mt-2"><Link to="/login" className="font-bold">Go Back To Login</Link></p>
                </div>
            </div>
        </FormLayout>
    )
}

export default VerifyAccount;
