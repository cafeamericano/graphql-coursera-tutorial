import gql from 'graphql-tag';
import { jobDetailFragment } from './fragments';

export const jobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) { ...JobDetail }
    }
    ${jobDetailFragment}
`;

export const jobsQuery = gql`
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

export const companyQuery = gql`
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