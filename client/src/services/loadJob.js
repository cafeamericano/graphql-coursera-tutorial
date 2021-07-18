import client from '../graphql/client';
import { jobQuery } from '../graphql/queries';

const loadJob = async (id) => {
    const {data} = await client.query({query: jobQuery, variables: {id}});
    return data.job;
}

export default loadJob;