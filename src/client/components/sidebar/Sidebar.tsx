import React, { useState, Dispatch, SetStateAction, } from 'react';

import SidebarButton from './SidebarButton';
import { Project } from '../../../types/types'

type SidebarProps = {
  projectList: Project[];
  activeProject: Project;
  setActiveProject: Dispatch<SetStateAction<Project>>;
}



const Sidebar: React.FC<SidebarProps> = ({ projectList, activeProject, setActiveProject }) => {
  const sidebarButtons = projectList.map(project => (
    <SidebarButton
      key={`project ${project.projectId}`}
      projectName={project.projectName}
      projectId={project.projectId}
      projectRepos={project.projectRepos}
      {...{activeProject, setActiveProject}}
      />
  ))

  // render a sidebar button for every project in list
  return (
  <div>
    <aside className="menu">
      <p className="menu-label">
        Projects
      </p>
      <ul className="menu-list">
        {sidebarButtons}
      </ul>
    </aside>

    <button className="button is-primary">Add Project</button>
  </div>
  )
}

export default Sidebar;