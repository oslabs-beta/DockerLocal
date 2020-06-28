import React, { useState, useEffect, Dispatch } from 'react';
import { RepoListItemProps } from '../../../types/types';


const RepoListItem: React.FC<RepoListItemProps> = ({ repo, selectedRepos, setSelectedRepos }) => {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    // runs on render and whenver isChecked is changed
    // need first conditional to account for switching back and forth between filters/tabs
    if (selectedRepos.includes(repo)) setIsChecked(true);

    // add or remove from selectedRepos list on click
    else if (isChecked) setSelectedRepos([...selectedRepos, repo]);
    else setSelectedRepos(selectedRepos.filter(({ repoCloneLink }) => repoCloneLink !== repo.repoCloneLink ))
  }, [isChecked])

  return (
    <a className="panel-block" onClick={(): void => setIsChecked(!isChecked)}>
        {/* checkbox is readonly because it rerenders on state change */}
        <input type="checkbox" checked={isChecked} readOnly/>
      {repo.repoName}
    </a>
  )
}

export default RepoListItem;