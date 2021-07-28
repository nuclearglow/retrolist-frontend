import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        authenticatedItem {
            ... on User {
                id
                name
                lists {
                    id
                    title
                    subtitle
                    items {
                        id
                        title
                        quantity
                    }
                }
            }
        }
    }
`;

/**
 * Custom Hook: get the authenticated User and associated data from the backend
 * @returns authenticated user with data or undefined
 */
export const useUser = () => {
    const { data } = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
};
