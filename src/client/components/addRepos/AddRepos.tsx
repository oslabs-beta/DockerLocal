import React, { useState, useEffect, InputHTMLAttributes, MouseEvent, ReactHTMLElement } from 'react';
import RepoSearchListItem from './RepoSearchListItem';

import { Repo, ProjectReposType, AddReposProps } from '../../../types/types';


const AddRepos: React.FC<AddReposProps> = ({ setShowAddRepos, userInfo }) => {
  const [repos, setRepos] = useState<ProjectReposType>({personal: [], organizations: [], collaborations: []})
  const [selectedRepos, setSelectedRepos] = useState<readonly Repo[]>([])
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all')
  
  // dummy request and response 
  const fetchRepos = (userInfo) => {
    // send request to back end
    // ** send request to **  /api/repos
    const response: ProjectReposType = {
      personal: [
      {repoName: 'perrepop1', repoCloneLink: 'personallink1'},
      {repoName: 'abcdefgpersonal2', repoCloneLink: 'personallink2'},
      {repoName: 'abbsddpersonalRepo3', repoCloneLink: 'personallink3'},
      {repoName: 'terrtqwwalRepo4', repoCloneLink: 'personallink4'},
      {repoName: 'abhhsdnalRepo5', repoCloneLink: 'personallink5'},
      {repoName: 'personalRepo6', repoCloneLink: 'personallink6'},
      ],
      organizations: [
      {repoName: 'organization Repo1', repoCloneLink: 'orglink1'},
      {repoName: 'organization Repo2', repoCloneLink: 'orglink2'},
      {repoName: 'organization Repo3', repoCloneLink: 'orglink3'},
      {repoName: 'organization Repo4', repoCloneLink: 'orglink4'},
      {repoName: 'organization Repo5', repoCloneLink: 'orglink5'},
      {repoName: 'organization Repo6', repoCloneLink: 'orglink6'},
      ],
      collaborations: [
      {repoName: 'collab Repo1', repoCloneLink: 'collablink1'},
      {repoName: 'collab Repo2', repoCloneLink: 'collablink2'},
      {repoName: 'collab Repo3', repoCloneLink: 'collablink3'},
      {repoName: 'collab Repo4', repoCloneLink: 'collablink4'},
      {repoName: 'collab Repo5', repoCloneLink: 'collablink5'},
      {repoName: 'collab Repo6', repoCloneLink: 'collablink6'},
      ],
    }

    return response;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  // switches active filter onclick
  const filterClick = (e: React.MouseEvent<HTMLAnchorElement & {id: string}>): void => {
    setActiveFilter(e.currentTarget.id)

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
        <article className="panel is-primary">
          <p className="panel-heading">
            Select Repositories to Add: 
          </p>
          <section style={{padding: 0}} className="modal-card-body">

            {/* filter tabs */}
            <p className="panel-tabs">
              <a className={activeFilter === 'all' ? 'is-active' : ''}
                id="all"
                onClick={(e): void => filterClick(e)}
                >All
              </a>

              {/* hardcoded id, might want to change these to variables */}
              <a className={activeFilter === 'personal' ? 'is-active' : ''}
                id="personal"
                onClick={(e): void => filterClick(e)}
                >Personal</a>
              <a className={activeFilter === 'organizations' ? 'is-active' : ''}
                id="organizations"
                onClick={(e): void => filterClick(e)}
                >Organizations</a>
              <a className={activeFilter === 'collaborations' ? 'is-active' : ''}
                id="collaborations"
                onClick={(e): void => filterClick(e)}
                >Collaborations</a>
            </p>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input 
                  className="input is-large" 
                  type="text" 
                  placeholder="Search" 
                  size={80} 
                  value={searchValue}
                  onChange={handleChange}
                />
              </p>
            </div>
          </section>

          <section style={{height: 300, padding: 0}} className="modal-card-body">
            {/* if activeFilter is all or personal, render personal repos */}
            {/* if something is typed in the search box, only show repos that include the exact string */}
            {/* could change filter to regex at a later date to include a more robust search */}
            {/* map filtered list to render comonent for each item */}
            {(activeFilter === 'all' || activeFilter === 'personal') 
              && repos.personal
                .filter(({ repoName }) => {
                  return searchValue === '' ||  repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoSearchListItem 
                    key={repo.repoName}
                    {...{ 
                      repo,
                      selectedRepos, 
                      setSelectedRepos
                    }}
                  />
                ))}
            {/* same as above for organizations */}
            {(activeFilter === 'all' || activeFilter === 'organizations') 
              && repos.organizations
                .filter(({ repoName }) => {
                  return searchValue === '' ||  repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoSearchListItem 
                    key={repo.repoName}
                    {...{ 
                      repo,
                      selectedRepos, 
                      setSelectedRepos
                    }}
                  />
                ))}
            {/* same as above for collabs */}
            {(activeFilter === 'all' || activeFilter === 'collaborations') 
              && repos.collaborations
                .filter(({ repoName }) => {
                  return searchValue === '' ||  repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoSearchListItem 
                    key={repo.repoName}
                    {...{ 
                      repo,
                      selectedRepos, 
                      setSelectedRepos
                    }}
                  />
                ))}
          </section>
          
          {/* might want to add a style here to keep constant height */}
          {/* could add uncheck functionality to list at bottom, would have to rethink state if so*/}
          <footer className="modal-card-foot">
            <div style={{height: '100px'}} className="content">
              Add the following Repositories to your project:
              <ul>
                {selectedRepos.map(({ repoName }) => <li key={`confirm ${repoName}`}>{repoName}</li> )}
              </ul>
            </div>
            <div>
            <button className="button" onClick={(): void => setShowAddRepos(false)}>Cancel</button>
            <button className="button is-success" onClick={(): void => handleSubmit()}>Add Repos</button>

            </div>
          </footer>
        </article>
      </div>
    </div>


    
  )
}

export default AddRepos;