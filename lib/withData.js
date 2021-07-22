import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

const createClient = ({ headers, initialState }) =>
    new ApolloClient({
        // combine a few ApolloLinks into one additive composition
        // --> Error handler (graphql and network errors)
        // https://www.apollographql.com/docs/react/api/link/introduction/#additive-composition
        link: ApolloLink.from([
            // https://www.npmjs.com/package/apollo-link-error
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                if (networkError)
                    console.log(
                        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
                    );
            }),
            new HttpLink({ uri: endpoint }),
        ]),
        // Apollo Caching: https://www.apollographql.com/docs/react/caching/advanced-topics/#gatsby-focus-wrapper
        // cache in the browser
        cache: new InMemoryCache({
            // Cache config: https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields
            typePolicies: {
                Query: {
                    // cached fields config
                    // https://www.apollographql.com/docs/react/caching/cache-field-behavior/
                    fields: {
                        // TODO: We will add this together!
                        // allProducts: paginationField(),
                    },
                },
            },
        }).restore(initialState || {}),
    });

// SSR: getDataFromTree
export default withApollo(createClient, { getDataFromTree });