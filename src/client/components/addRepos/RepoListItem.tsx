import React, { useState, useEffect, Dispatch } from 'react';
import { RepoListItemProps } from '../../../types/types';


const RepoListItem: React.FC<RepoListItemProps> = ({ repo, selectedRepos, setSelectedRepos }) => {
  const [isChecked, setIsChecked] = useState(false)

  // needed to account for switching back and forth between filters/tabs
  useEffect(() => {
    console.log('using effect')
    if (selectedRepos.includes(repo) && !isChecked) setIsChecked(true);
  }, [isChecked])

  const toggleSelect = (): void => {
    if (!isChecked) setSelectedRepos([...selectedRepos, repo]);
    else setSelectedRepos(selectedRepos.filter(({ repoCloneLink }) => repoCloneLink !== repo.repoCloneLink ))
    setIsChecked(!isChecked)
    }

  return (
    <a className="panel-block" onClick={toggleSelect}>
        {/* checkbox is readonly because it rerenders on state change */}
        <input type="checkbox" checked={isChecked} readOnly/>
      {repo.repoName}
    </a>
  )
}

export default RepoListItem;