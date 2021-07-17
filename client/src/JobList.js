import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const JobList = ({jobs}) => {

  console.log(jobs);
  
  const renderJob = (job) => {
    const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link to={`/jobs/${job.id}`}>{title}</Link>
        </div>
      </li>
    );
  }

  return (
    <ul className="box">
      {jobs.map(renderJob)}
    </ul>
  );
}

export default JobList;