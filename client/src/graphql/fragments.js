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