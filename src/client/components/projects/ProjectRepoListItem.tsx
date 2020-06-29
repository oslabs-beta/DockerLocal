import React from 'react';

import { ProjectRepoListItemProps } from '../../../types/types'

const ProjectRepoListItem: React.FC<ProjectRepoListItemProps> = ({ activeProject, repo }) => {
  return (
    <div>
      {repo.repoName}
    </div>
  )
}

export default ProjectRepoListItem;