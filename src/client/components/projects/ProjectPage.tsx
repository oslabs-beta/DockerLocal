import React, { useState, useEffect } from 'react';

import AddRepos from '../addRepos/AddRepos';
import { Project, User, ProjectPageProps } from '../../../types/types'
import ProjectRepoListItem from './ProjectRepoListItem';


const ProjectPage: React.FC<ProjectPageProps> = ({ activeProject, userInfo }) => {
  const [showAddRepos, setShowAddRepos] = useState(false);

  return (
    <div>
      <div>Select your repositories: </div>
      <button className="button is-primary is-large" onClick={(): void => setShowAddRepos(true)}>Add Repositories</button>
      
      {activeProject.projectRepos.map((repo) => {
        return <ProjectRepoListItem {...{activeProject, repo} }/>
      })}
      
      
      {/* shows this element if showAddRepos is true */}
      {showAddRepos && <AddRepos {...{ setShowAddRepos, userInfo }}/>}
    </div>
  )
}

export default ProjectPage;