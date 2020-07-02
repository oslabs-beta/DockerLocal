import React, { useState, Dispatch, SetStateAction } from "react";

import SidebarButton from "./SidebarButton";
import ProjectSideBar from "../projects/ProjectSidebar";
import { Project } from "../../../types/types";

type SidebarProps = {
  projectList: readonly Project[];
  setProjectList: Dispatch<SetStateAction<Project[]>>;
  activeProject: number;
  setActiveProject: Dispatch<SetStateAction<number>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  projectList,
  setProjectList,
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
      <aside className="menu">
        <p className="menu-label">Projects</p>
        <ul className="menu-list">{sidebarButtons}</ul>
      </aside>

      <button
        className="button is-primary"
        onClick={(): void =>
          setShowProjectSidebarModal(!showProjectSideBarModal)
        }
        style={{marginTop:"10%", marginLeft:"26%"}}
      >
        Add Project
      </button>
      {showProjectSideBarModal && (
        <ProjectSideBar
          {...{
            showProjectSideBarModal,
            setShowProjectSidebarModal,
            projectList,
            setProjectList,
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
