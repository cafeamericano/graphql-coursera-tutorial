import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import gql from 'graphql-tag';
import { getAccessToken, isLoggedIn } from "./auth";

const httpUrl = 'http://localhost:9000/graphql'
const wsUrl = 'ws://localhost:9000/graphql';

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

const wsLink = new WebSocketLink({uri: wsUrl, options: {
    lazy: true,
    reconnect: true
}});
  
function isSubscription(operation) {
const definition = getMainDefinition(operation.query);
return definition.kind === 'OperationDefinition'
    && definition.operation === 'subscription';
}

const client = new ApolloClient({
    link: split(isSubscription, wsLink, httpLink),
    cache: new InMemoryCache()
});

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        description
        company {
            id
            name
        }
    }
`;

const jobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) { ...JobDetail }
    }
    ${jobDetailFragment}
`;

const jobsQuery = gql`
    query JobsQuery {
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }
`;

const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) { ...JobDetail }
    }
    ${jobDetailFragment}
`;

const companyQuery = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }
`;

const jobAddedSubscription = gql`
  subscription {
    jobAdded {
        id
        title
        company {
            id
            name
        }
    }
  }
`;

export async function loadJob(id) {
    const {data} = await client.query({query: jobQuery, variables: {id}});
    return data.job;
}

export async function loadJobs() {
    const {data} = await client.query({query: jobsQuery, fetchPolicy: 'no-cache'});
    /* 
        Cache options
            -- cache-first; if not in cache, make call; default
            -- no-cache; always fetch data from server
    */
    return data.jobs;
}

export async function loadCompany(id) {
    const {data} = await client.query({query: companyQuery, variables: {id}});
    return data.company;
}

export async function createJob(input) {
    const {data: {job}} = await client.mutate({
        mutation: createJobMutation, 
        variables: {input},
        update: (cache, {data}) => { // Called after the mutation to directly add item into the cache
            cache.writeQuery({
                query: jobQuery, // The query we're trying to update our cache for
                variables: {id: data.job.id}, // Where id is the id of the job to be cached
                data: data // Where data is the data that was returned upon insertion
            });
        }
    });
    return job;
}

export function onJobAdded(handleJob) {
    const observable = client.subscribe({query: jobAddedSubscription});
    return observable.subscribe(({data}) => handleJob(data.jobAdded));
  }