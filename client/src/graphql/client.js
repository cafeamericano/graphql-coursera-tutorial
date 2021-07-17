import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache
} from '@apollo/client';
import { getAccessToken } from "../utils/auth";

const httpUrl = 'http://localhost:9000/graphql'

const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
        const token = getAccessToken();
        if (token) {
            operation.setContext({headers: {'authorization': `Bearer ${token}`}});
        }
        return forward(operation);
    }),
    new HttpLink({uri: httpUrl})
]);

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {query: {fetchPolicy: 'no-cache'}}
});

export default client;