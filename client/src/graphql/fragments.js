import gql from 'graphql-tag';

export const jobDetailFragment = gql`
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

export const jobsListFragment = gql`
    fragment JobsList on Job {
        id
        title
        company {
            id
            name
        }
    }
`;

export const companyDetailFragment = gql`
    fragment CompanyDetail on Company {
        id
        name
        description
        jobs {
            id
            title
        }
    }
`;