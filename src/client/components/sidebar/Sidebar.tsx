import React, { useState, Dispatch, SetStateAction } from 'react';

import SidebarButton from './SidebarButton';
import ProjectSideBar from '../projects/ProjectSidebar';
import { Project, SidebarProps } from '../../../types/types';

const Sidebar: React.FC<SidebarProps> = ({
  projectList,
  dispatch,
  activeProject,
  setActiveProject,
}) => {
  const sidebarButtons = projectList.map((project) => (
    <SidebarButton
      key={`project ${project.projectId}`}
      projectName={project.projectName}
      projectId={project.projectId}
      projectRepos={project.projectRepos}
      {...{ activeProject, setActiveProject }}
    />
  ));

  const [showProjectSideBarModal, setShowProjectSidebarModal] = useState(false);
  // render a sidebar button for every project in list
  return (
    <div>
      <aside className='menu'>
        <p className='menu-label'>Projects</p>
        <ul className='menu-list'>{sidebarButtons}</ul>
      </aside>

      <button
        className='button is-primary'
        onClick={(): void =>
          setShowProjectSidebarModal(!showProjectSideBarModal)
        }
        style={{ marginTop: '10%', marginLeft: '35%' }}
      >
        Add Project
      </button>
      {showProjectSideBarModal && (
        <ProjectSideBar
          {...{
            showProjectSideBarModal,
            setShowProjectSidebarModal,
            projectList,
            dispatch,
            setActiveProject,
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
