import React, { useState, useEffect } from 'react';

import AddRepos from '../addRepos/AddRepos';
import { Project, User } from '../../../types/types'

type ProjectPageProps = {
  activeProject: Project;
  userInfo: User;
}

const ProjectPage: React.FC = ({ activeProject, userInfo }) => {
  const [showAddRepos, setShowAddRepos] = useState(false);

  return (
    <div>
      <div>Select your repositories: </div>
      <button className="button is-primary is-large" onClick={(): void => setShowAddRepos(true)}>Add Repositories</button>
      
      {/* {activeProject .map(() => {

      })} */}
      
      
      {/* shows this element if showAddRepos is true */}
      {showAddRepos && <AddRepos {...{showAddRepos, setShowAddRepos, userInfo}}/>}
    </div>
  )
}

export default ProjectPage;