import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../hooks/useForm';
import ErrorMessage from './ErrorMessage';
import FormStyles from './styles/FormStyles';

// sign in in with keystone graphql
const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
    ) {
        createUser(data: { email: $email, name: $name, password: $password }) {
            id
            email
            name
        }
    }
`;

const Register = () => {
    // form change handler for signin
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    });

    const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    });

    // submit sign in credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        // sign in to backend - handling of errors is done elsewhere, so we can just error it to console
        const res = await signUp().catch(console.error);
        if (res?.data?.createUser) {
            // on success: reset form
            resetForm();
        }
    };

    return (
        <FormStyles method="POST" onSubmit={handleSubmit}>
            <legend>Register</legend>

            <ErrorMessage error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
                {data?.createUser && (
                    <p>
                        Signed up with {data.createUser.email} - Please Sign In
                        now!
                    </p>
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
                <label htmlFor="name">
                    Name
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                        value={inputs.name}
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
                Register
            </button>
        </FormStyles>
    );
};

export default Register;
