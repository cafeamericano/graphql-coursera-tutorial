import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import services from '../services';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    services.loadJobs().then((jobs) => setJobs(jobs));
  }, []);
  
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );

}

export default JobBoard;