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
  if (isActive) console.log('active button: ', projectName)
  
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