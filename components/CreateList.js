import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../hooks/useForm';
import { CURRENT_USER_QUERY, useUser } from '../hooks/useUser';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

// sign in in with keystone graphql
const CREATE_LIST_MUTATION = gql`
    mutation CREATE_LIST_MUTATION(
        $title: String!
        $subtitle: String!
        $user: UserRelateToOneInput!
    ) {
        createList(data: { title: $title, subtitle: $subtitle, user: $user }) {
            id
        }
    }
`;

const CreateList = () => {
    const user = useUser();

    // form change handler for signin
    const { inputs, handleChange, resetForm } = useForm({
        title: '',
        subtitle: '',
    });

    const [handleCreateList, { data, loading, error }] = useMutation(
        CREATE_LIST_MUTATION,
        {
            variables: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                ...inputs,
            },
            // refetch the currently logged in user
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
            awaitRefetchQueries: true,
        }
    );

    // submit sign in credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        // sign in to backend
        const res = await handleCreateList();
        // on success, redirect to products
        if (res?.data?.createList?.id) {
            Router.replace({
                pathname: '/lists',
            });
        }
    };

    return (
        <FormStyles method="POST" onSubmit={handleSubmit}>
            <legend>Login</legend>

            <DisplayError error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                    Title
                    <input
                        required
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        autoComplete="title"
                        value={inputs.title}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="subtitle">
                    Subtitle
                    <input
                        required
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        placeholder="Subtitle"
                        value={inputs.subtitle}
                        onChange={handleChange}
                    />
                </label>
            </fieldset>
            <button className="btn btn-primary" type="submit">
                Create List
            </button>
        </FormStyles>
    );
};

export default CreateList;
