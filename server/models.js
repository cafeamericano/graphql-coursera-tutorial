const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema(
    {
        id: String,
        companyId: { type: String, ref: 'CompanyModel'},
        title: String,
        description: String
    },
    {
        collection: 'jobs',
        versionKey: false
    }
);

const companySchema = new Schema(
    {
        id: String,
        name: String,
        description: String
    },
    {
        collection: 'companies',
        versionKey: false
    }
);

const JobModel = mongoose.model('job', jobSchema); 
const CompanyModel = mongoose.model('company', companySchema); 

module.exports = {
  JobModel,
  CompanyModel
};