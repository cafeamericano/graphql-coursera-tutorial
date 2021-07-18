import client from '../graphql/client';
import { createJobMutation } from '../graphql/mutations';
import { jobQuery } from '../graphql/queries';

const createJob = async (input) => {
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

export default createJob;