import React, { Component, useState } from 'react';
import { loadJob, createJob } from './requests';

const JobForm = ({history}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    createJob({title, description}).then((job) => history.push(`/jobs/${job.id}`));
  }

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" value={title} onInput={e => setTitle(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="input" style={{height: '10em'}}
                name="description" value={description} onInput={e => setDescription(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={submitForm}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default JobForm;