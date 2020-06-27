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

  return (
    <div>
      adding repos
      <ul>
        {/* change this to component with checkmark etc, look for search box style */}
        {repos.map(repo => <li>{repo.repoName}</li>)}
      </ul>
      <button onClick={handleSubmit}>Close</button>
    </div>
  )
}

export default AddRepos;