import React, { useState, useEffect } from 'react';

type Repo = {
  name: string;
  link: string;
}

const AddRepos: React.FC = ({showAddRepos, setShowAddRepos, userInfo}) => {
  const [repos, setRepos] = useState<Repo[]>([])
  
  
  // dummy request and response 
  const fetchRepos = (userInfo) => {
    // send request to back end
    // ** send request to **  /api/repos
    const response: [] = [
      {name: 'repo1', link: 'link1'},
      {name: 'repo2', link: 'link2'},
      {name: 'repo3', link: 'link3'},
      {name: 'repo4', link: 'link4'},
      {name: 'repo5', link: 'link5'},
      {name: 'repo6', link: 'link6'},
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
        {repos.map(repo => <li>{repo.name}</li>)}
      </ul>
      <button onClick={handleSubmit}>Close</button>
    </div>
  )
}

export default AddRepos;