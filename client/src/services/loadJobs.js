import client from '../graphql/client';
import { jobsQuery } from '../graphql/queries';

const loadJobs = async () => {
    const {data} = await client.query({query: jobsQuery, fetchPolicy: 'no-cache'});
    /* 
        Cache options
            -- cache-first; if not in cache, make call; default
            -- no-cache; always fetch data from server
    */
    return data.jobs;
}

export default loadJobs;