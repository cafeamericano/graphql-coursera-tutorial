import gql from 'graphql-tag';
import { 
    jobDetailFragment,
    jobsListFragment,
    companyDetailFragment
} from './fragments';

export const jobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) { 
            ...JobDetail 
        }
    }
    ${jobDetailFragment}
`;

export const jobsQuery = gql`
    query JobsQuery {
        jobs {
            ...JobsList 
        }
    }
    ${jobsListFragment}
`;

export const companyQuery = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) { 
            ...CompanyDetail
        }
    }
    ${companyDetailFragment}
`;