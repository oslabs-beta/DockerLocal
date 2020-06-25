import React, { useState, Dispatch, SetStateAction, } from 'react';

import SidebarButton from './SidebarButton'

type SidebarProps = {
  projectList: Project[];
  activeProject: Project;
  setActiveProject: Dispatch<SetStateAction<Project>>;
}

type Project = {
  projectName: string;
  projectId: number;
}


const Sidebar: React.FC<SidebarProps> = ({ projectList, activeProject, setActiveProject }) => {
  const sidebarButtons = projectList.map(project => (
    <SidebarButton
      key={`project ${project.projectId}`}
      projectName={project.projectName}
      projectId={project.projectId}
      {...{activeProject, setActiveProject}}
    />
  ))

  // render a sidebar button for every project in list
  return (
  <div>
    {sidebarButtons}
    <button>Add Project</button>
  </div>
  )
}

export default Sidebar;