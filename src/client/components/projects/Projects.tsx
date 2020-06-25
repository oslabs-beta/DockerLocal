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
  const [activeProject, setActiveProject] = useState({});


  return (
    <div>
      {/* <LoggedIn/> */}
      <Sidebar {...{projectList, activeProject, setActiveProject}} />
      {`Projects ${userInfo.username}`}
    </div>
  )
}

export default Projects;