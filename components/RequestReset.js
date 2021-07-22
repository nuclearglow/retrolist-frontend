import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../hooks/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

// sign in in with keystone graphql
const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`;

const RequestReset = () => {
    // form change handler for signin
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [requestReset, { data, loading, error }] = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: inputs,
        }
    );

    // submit sign in credentials
    const handleResetRequest = async (e) => {
        e.preventDefault();
        // sign in to backend - handling of errors is done elsewhere, so we can just error it to console
        await requestReset().catch(console.error);
        resetForm();
    };

    return (
        <FormStyles method="POST" onSubmit={handleResetRequest}>
            <legend>Request Password Reset</legend>

            <DisplayError error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
                {data?.sendUserPasswordResetLink === null && (
                    <p>Success! Check your email for a reset link!</p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
            </fieldset>
            <button className="btn btn-primary" type="submit">
                Request Password Reset
            </button>
        </FormStyles>
    );
};

export default RequestReset;
