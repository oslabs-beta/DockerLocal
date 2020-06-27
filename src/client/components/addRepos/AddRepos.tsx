import React, { useState, useEffect } from 'react';

import { Repo } from '../../../types/types'

const AddRepos: React.FC = ({showAddRepos, setShowAddRepos, userInfo}) => {
  const [repos, setRepos] = useState<Repo[]>([])
  
  
  // dummy request and response 
  const fetchRepos = (userInfo) => {
    // send request to back end
    // ** send request to **  /api/repos
    const response: Repo[] = [
      {repoName: 'repo1', repoCloneLink: 'link1'},
      {repoName: 'repo2', repoCloneLink: 'link2'},
      {repoName: 'repo3', repoCloneLink: 'link3'},
      {repoName: 'repo4', repoCloneLink: 'link4'},
      {repoName: 'repo5', repoCloneLink: 'link5'},
      {repoName: 'repo6', repoCloneLink: 'link6'},
    ]

    return response;
  }

  const handleSubmit = () => {
    // submit stuff to back end
    // then
    setShowAddRepos(false);

  }

  useEffect(() => {
    // fetchRepos(userInfo)
    // then
    setRepos(fetchRepos(userInfo));
  }, [])

  // {repos.map(repo => <li>{repo.repoName}</li>)}
  // <button onClick={handleSubmit}>Close</button>
  return (

    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <article className="panel is-primary">
              <p className="panel-heading">
                Primary
              </p>
              <p className="panel-tabs">
                <a className="is-active">All</a>
                <a>Filter</a>
                <a>Private</a>
                <a>Sources</a>
                <a>Forks</a>
              </p>
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input className="input is-primary" type="text" placeholder="Search"/>
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
              <a className="panel-block is-active">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                bulma
              </a>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                marksheet
              </a>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                minireset.css
              </a>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                jgthms.github.io
              </a>
            </article>

        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={(): void => handleSubmit()}>Save changes</button>
          <button className="button" onClick={(): void => setShowAddRepos(false)}>Cancel</button>
        </footer>
      </div>
    </div>


    
  )
}

export default AddRepos;