import React, { useState, Dispatch, SetStateAction, } from 'react';

type SidebarButtonProps = {
  projectName: string;
  projectId: number;
  activeProject: Project;
  setActiveProject: Dispatch<SetStateAction<Project>>;
}

const SidebarButton: React.FC = ({ projectName, projectId }) => {
  const [isActive, setIsActive] = useState(false)
return <div> {projectName}</div>
}

export default SidebarButton;