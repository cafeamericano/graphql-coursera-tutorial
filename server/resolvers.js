const db = require('./db');

const Query = {
    // This should mirror what we have in the 'Query' type inside our schema file
    job: (root, args) => db.jobs.get(args.id), // Where args is params passed in GraphQL query; root is not significant here
    jobs: () => db.jobs.list(), // Read the jobs collection from the fake DB
    company: (root, args) => db.companies.get(args.id)
};

const Mutation = {
    createJob: (root, {input}) => {
        // In our schema, we specified that this mutation should return Job
        const id = db.jobs.create(input);
        return db.jobs.get(id);
    }
}

const Company = {
    // Return the jobs whose companyId is the same as the id for this company
    jobs: (company) => db.jobs.list().filter((job) => job.companyId === company.id)
}

const Job = {
    // Return the company whose ID is the same as the company ID for this job
    company: (job) => db.companies.get(job.companyId)
}

module.exports = { 
    Query,
    Mutation,
    Company,
    Job 
};