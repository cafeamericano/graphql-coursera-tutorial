import client from '../graphql/client';
import { companyQuery } from '../graphql/queries';

async function loadCompany(id) {
    const {data} = await client.query({query: companyQuery, variables: {id}});
    return data.company;
}

export default loadCompany;