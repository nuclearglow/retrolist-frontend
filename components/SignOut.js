import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../hooks/useUser';

// sign in in with keystone graphql
const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        endSession
    }
`;

const SignOut = () => {
    const [signOut] = useMutation(SIGNOUT_MUTATION, {
        // refetch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return (
        <button
            type="button"
            className="btn btn-primary btn-ghost"
            onClick={signOut}
        >
            Sign Out
        </button>
    );
};

export default SignOut;
