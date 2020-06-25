import React, { useState, Dispatch, SetStateAction, useEffect, } from 'react';

type Project = {
  projectName: string;
  projectId: number;
}

type SidebarButtonProps =  Project & {
  activeProject: Project;
  setActiveProject: Dispatch<SetStateAction<Project>>;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ projectName, projectId, activeProject, setActiveProject}) => {
  const [isActive, setIsActive] = useState(false);
  
  // listens for change in [activeProject], toggles button on this component
  // come check if we should be listening for [activeProject or more efficient to listen for specific property]
  useEffect(() => {
    if (projectName === activeProject.projectName) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }}, [activeProject])


  return (
    <div onClick={(): void => setActiveProject({...{projectName, projectId}}) }> 
      {projectName}
    </div>
  )

}

export default SidebarButton;