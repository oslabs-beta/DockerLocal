import React, { useState, useEffect, Dispatch } from 'react';
import { RepoSearchListItemProps } from '../../../types/types';


const RepoSearchListItem: React.FC<RepoSearchListItemProps> = ({ repo, selectedRepos, setSelectedRepos }) => {
  const [isChecked, setIsChecked] = useState(false)

  // needed to account for switching back and forth between filters/tabs
  useEffect(() => {
    if (selectedRepos.includes(repo) && !isChecked) setIsChecked(true);
  }, [isChecked])

  // adds/removes from selected repos list and toggles checkbox
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

export default RepoSearchListItem;