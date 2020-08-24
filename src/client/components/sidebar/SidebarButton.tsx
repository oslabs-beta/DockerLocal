import React, { useState, Dispatch, SetStateAction, useEffect, } from 'react';

import { Project, SidebarButtonProps } from '../../../types/types'


const SidebarButton: React.FC<SidebarButtonProps> = ({ projectName, projectId, projectRepos, activeProject, setActiveProject}) => {
  const [isActive, setIsActive] = useState('');
  
  // listens for change in [activeProject], changes isActive to string to style element
  // come check if we should be listening for [activeProject or more efficient to listen for specific property]
  useEffect(() => {
    if (projectId === activeProject) {
      setIsActive('is-active')
    } else {
      setIsActive('')
    }}, [activeProject])


  return (
    <li>
      <a className={isActive} onClick={(): void => setActiveProject(projectId)}>
        {projectName}
      </a>
    </li>
  )

}

export default SidebarButton;