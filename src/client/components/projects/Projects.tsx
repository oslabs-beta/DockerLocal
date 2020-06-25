import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

import Sidebar from '../sidebar/Sidebar';
import AddRepos from '../addRepos/AddRepos'

type ProjectsProps = {
  userInfo: {username: string; id: string};
  setUserInfo: Dispatch<SetStateAction<{username: string; id: string}>>;
}

// should set type for props
const Projects: React.FC<ProjectsProps> = ({ userInfo, setUserInfo }) => {
  // need to set type for projects/projectlist
  const [projectList, setProjectList] = useState([{projectName: 'DockerLocal(project1)', projectId: 1}, {projectName: 'React Visualizer 74.0(project2)', projectId: 2}]);
  const [activeProject, setActiveProject] = useState({projectName: 'DockerLocal(project1)', projectId: 1});
  const [showAddRepos, setShowAddRepos] = useState(false);


  return (
    <div>
      
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.username}`}
      <Sidebar {...{projectList, activeProject, setActiveProject}} />
    <button onClick={(): void => setShowAddRepos(true)}>Add Repos to {activeProject.projectName}</button>

    {/* shows this element if showAddRepos is true */}
    {showAddRepos && <AddRepos
                        {...{showAddRepos, setShowAddRepos, userInfo}}
                      />}

    </div>
  )
}

export default Projects;