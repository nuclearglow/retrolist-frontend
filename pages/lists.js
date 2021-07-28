import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Trash2 } from 'react-feather';
import { CURRENT_USER_QUERY, useUser } from '../hooks/useUser';
import getItemsFromList from '../lib/getItemsFromList';

const DELETE_LIST_MUTATION = gql`
    mutation DELETE_LIST_MUTATION($id: ID!) {
        deleteList(id: $id) {
            id
        }
    }
`;

const Lists = () => {
    const user = useUser();
    const [deleteList, { loading, error, data }] = useMutation(
        DELETE_LIST_MUTATION,
        {
            // optional: queries that will be re-fetched after the mutation
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );

    const handleDelete = async (id) => {
        if (id) {
            const res = await deleteList({
                variables: {
                    id,
                },
            });
        }
    };

    if (!user) {
        return (
            <p>
                <Link href="/signin">Login</Link> to access your lists.
            </p>
        );
    }
    return (
        <>
            <ul>
                {user.lists?.map((list) => (
                    <li key={list.id}>
                        <Link href={`/list/${list.id}`}>
                            <a>
                                {list.title} ({getItemsFromList(list)} items)
                            </a>
                        </Link>
                        <button
                            type="button"
                            className="button"
                            onClick={() => handleDelete(list.id)}
                        >
                            <Trash2 />
                        </button>
                    </li>
                ))}
            </ul>
            <Link href="/list/new">
                <p className="terminal-prompt">
                    <a className="no-style">Create new RetroList...</a>
                </p>
            </Link>
        </>
    );
};

export default Lists;
