import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJob, createJob } from './requests';

const JobDetail = ({match}) => {
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    loadJob(match.params.jobId).then((job) => setJobDetails(job));
  }, []);

  if (!jobDetails) { return null; }
  return (
    <div>
      <h1 className="title">{jobDetails.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${jobDetails.company.id}`}>{jobDetails.company.name}</Link>
      </h2>
      <div className="box">{jobDetails.description}</div>
    </div>
  );

}

export default JobDetail;
