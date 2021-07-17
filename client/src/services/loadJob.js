import client from '../graphql/client';
import { jobQuery } from '../graphql/queries';

async function loadJob(id) {
    const {data} = await client.query({query: jobQuery, variables: {id}});
    return data.job;
}

export default loadJob;