import React, { useState, useEffect, Dispatch } from 'react';
import { RepoSearchListItemProps, Project } from '../../../types/types';

import { findActiveProject } from '../../helpers/projectHelper'


const RepoSearchListItem: React.FC<RepoSearchListItemProps> = ({ repo, selectedRepos, setSelectedRepos, projectList, activeProject }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  // needed to account for switching back and forth between filters/tabs
  useEffect(() => {
    if (selectedRepos.includes(repo) && !isChecked) setIsChecked(true);
    const currentProject: Project = findActiveProject(projectList, activeProject);

    if (currentProject.projectRepos.some(({ repoId }) => repoId === repo.repoId)) setIsDisabled(true);
  }, [isChecked])

  // adds/removes from selected repos list and toggles checkbox
  const toggleSelect = (): void => {
    if (isDisabled) return;
    if (!isChecked) setSelectedRepos([...selectedRepos, repo]);
    else setSelectedRepos(selectedRepos.filter(({ repoId }) => repoId !== repo.repoId ))
    setIsChecked(!isChecked)
    }

  return (
    <a className="panel-block" onClick={toggleSelect}>
        {/* checkbox is readonly because it rerenders on state change */}
        <input type="checkbox" checked={isChecked || isDisabled} disabled={isDisabled} readOnly/>
      {`${repo.repoName} - ${repo.repoOwner}`}
    </a>
  )
}

export default RepoSearchListItem;