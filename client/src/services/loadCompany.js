import client from '../graphql/client';
import { companyQuery } from '../graphql/queries';

const loadCompany = async (id) => {
    const {data} = await client.query({query: companyQuery, variables: {id}});
    return data.company;
}

export default loadCompany;