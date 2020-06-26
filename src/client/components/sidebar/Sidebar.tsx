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
    <aside className="menu">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Customers</a></li>
      </ul>
      <p className="menu-label">
        Administration
      </p>
      <ul className="menu-list">
        <li><a>Team Settings</a></li>
        <li>
          <a className="is-active">Manage Your Team</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
      <p className="menu-label">
        Transactions
      </p>
      <ul className="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul>
    </aside>

    <button>Add Project</button>
  </div>
  )
}

export default Sidebar;