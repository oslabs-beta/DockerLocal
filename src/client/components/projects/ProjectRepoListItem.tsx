import React, { useEffect, useState } from 'react';

import { ProjectRepoListItemProps, Project, Repo } from '../../../types/types'

const ProjectRepoListItem: React.FC<ProjectRepoListItemProps> = ({ repo, activeProject, projectList, setProjectList }) => {
  const [isChecked, setIsChecked] = useState(repo.isIncluded)

  useEffect(() => {
    console.log('useeffect')
    if (repo.isIncluded && !isChecked) setIsChecked(true)
  }, [isChecked])

  const toggleIsIncluded = (): void => {
    // need to make copy of states to include in new to not mutate state directly
    // make copy of repo with toggled isIncluded value
    const newRepo: Repo = { ...repo, isIncluded: !repo.isIncluded };

    // make copy of active project repo list with new repo included
    const newProjectRepos = activeProject.projectRepos.map((repo) => (
      repo.repoCloneLink === newRepo.repoCloneLink ? newRepo : repo
    ));

    // copy active project
    const newActiveProject: Project = { ...activeProject }
    newActiveProject.projectRepos = newProjectRepos;

    // insert new project into new project list
    const newProjectList: Project[] = projectList.map((project) => (
      project.projectId === newActiveProject.projectId ? newActiveProject : project
    ));

    // set new project list
    setIsChecked(!isChecked)
    setProjectList(newProjectList)

  }

  return (
    <div onClick={toggleIsIncluded}>
      {/* checkbox is readonly because it rerenders on state change */}
      <input type="checkbox" checked={isChecked} readOnly />
      {repo.repoName}
    </div>
  )
}

export default ProjectRepoListItem;