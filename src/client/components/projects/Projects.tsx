import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

import Sidebar from '../sidebar/Sidebar'

type ProjectsProps = {
  userInfo: {username: string; id: string};
  // need to do more research on Dispatch, SetStateAction and ts: https://stackoverflow.com/questions/56028635/passing-usestate-as-props-in-typescript
  setUserInfo: Dispatch<SetStateAction<{username: string; id: string}>>;
}

// should set type for props
const Projects: React.FC<ProjectsProps> = ({ userInfo, setUserInfo }) => {
  // need to set type for projects/projectlist
  const [projectList, setProjectList] = useState([{projectName: 'DockerLocal(project1)', projectId: 1}, {projectName: 'React Visualizer 74.0(project2)', projectId: 2}]);
  const [activeProject, setActiveProject] = useState({projectName: 'DockerLocal(project1)', projectId: 1});
  const [toggleAddRepos, setToggleAddReops] = useState(false);


  return (
    <div>
      
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.username}`}
      <Sidebar {...{projectList, activeProject, setActiveProject}} />
    <button onClick={(): void => setToggleAddReops(true)}>Add Reops to {activeProject.projectName}</button>
    
    </div>
  )
}

export default Projects;