import React, { Component } from 'react';
import { JobList } from './JobList';
import { loadJobs, onJobAdded } from './requests';

export class JobBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {jobs: []};
  }

  componentDidMount() {
    this.getJobs();
    this.subscription = onJobAdded((job) => {
      this.setState({jobs: this.state.jobs.concat(job)});
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getJobs = async () => {
    const jobs = await loadJobs();
    this.setState({jobs});
  }
  
  render() {
    const {jobs} = this.state;
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
