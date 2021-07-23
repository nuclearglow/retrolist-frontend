import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../hooks/useForm';
import { CURRENT_USER_QUERY } from '../hooks/useUser';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

// sign in in with keystone graphql
const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            # on success, returns this
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            # on failure, this
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

const Login = () => {
    // form change handler for signin
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const [handleSignIn, { data, loading }] = useMutation(LOGIN_MUTATION, {
        variables: inputs,
        // refetch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        awaitRefetchQueries: true,
    });

    // the query completes successfully, so we need to check for the failure type "UserAuthenticationWithPasswordFailure"
    const error =
        data?.authenticateUserWithPassword?.__typename ===
        'UserAuthenticationWithPasswordFailure'
            ? data?.authenticateUserWithPassword
            : undefined;

    // submit sign in credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        // sign in to backend
        const res = await handleSignIn();

        // on success, redirect to products
        if (
            res.data?.authenticateUserWithPassword?.__typename ===
            'UserAuthenticationWithPasswordSuccess'
        ) {
            Router.push({
                pathname: '/lists',
            });
        } else {
            // on failure, reset the form
            resetForm();
        }
    };

    return (
        <FormStyles method="POST" onSubmit={handleSubmit}>
            <legend>Login</legend>

            <DisplayError error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
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
                <label htmlFor="password">
                    Password
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
            </fieldset>
            <button className="btn btn-primary" type="submit">
                Sign In
            </button>
        </FormStyles>
    );
};

export default Login;
