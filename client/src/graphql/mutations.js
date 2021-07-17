import gql from 'graphql-tag';
import { jobDetailFragment } from './fragments';

export const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) { ...JobDetail }
    }
    ${jobDetailFragment}
`;