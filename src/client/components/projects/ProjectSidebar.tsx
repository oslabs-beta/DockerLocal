import React, { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Project, ProjectSideBarProps } from '../../../types/types';

import { checkValidName } from '../../helpers/projectHelper';

const ProjectSideBar: React.FC<ProjectSideBarProps> = ({
  setShowProjectSidebarModal,
  projectList,
  setActiveProject,
  dispatch,
}) => {
  // State hook for new project name and boolean whether the name is valid
  const [newProject, setNewProject] = useState({
    name: '',
    isValid: false,
  });

  // State hook for message body and style
  const validBody =
    'Project names can contain alphanumeric characters, hypens, or underscores. Project names must be unique, contain less than 26 characters, and cannot be blank.';
  const invalidBody = `You have entered an invalid project name. ${validBody}`;
  const [newProjectStyle, setNewProjectStyle] = useState({
    messageBody: validBody,
    messageStyle: 'is-info',
  });

  /**
   * @function handleChange
   * @description updates newProject.name, newProject.isValid, newProjectStyle.messageBody, newProjectStyle.messageStyle
   * @param e each update to new project name field
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isValid = checkValidName(e.target.value, projectList);
    setNewProject({
      name: e.target.value,
      isValid: isValid,
    });
    setNewProjectStyle({
      messageBody: isValid ? validBody : invalidBody,
      messageStyle: isValid ? 'is-info' : 'is-danger',
    });
  };

  const handleSubmit = (): void => {
    //create a new project object
    if (checkValidName(newProject.name, projectList)) {
      const newProjectId: string = uuidv4();

      const newProjectObject: Project = {
        projectId: newProjectId,
        projectName: newProject.name,
        projectRepos: [],
      };

      // set copy of a new project
      dispatch({
        type: 'addProject',
        payload: [...projectList, newProjectObject],
      });
      setActiveProject(newProjectId);
      //then close the modal
      setShowProjectSidebarModal(false);
    }
  };

  const errorIcon = (
    <span className='icon has-text-danger is-right'>
      <i className='fas fa-exclamation'></i>
    </span>
  );

  // input for projectname
  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Create A New Project</p>
          <button className='delete' aria-label='close'></button>
        </header>
        <section className='modal-card-body'>
          <form onSubmit={handleSubmit}>
            <label>
              <div className={'message ' + newProjectStyle.messageStyle}>
                <div className='message-header'>
                  <p>Please choose a name for your project.</p>
                </div>
                {/* Display helper text for project name restrictions*/}
                <div className='message-body'>
                  {newProjectStyle.messageBody}
                </div>
              </div>
              {/* Input field for new project name. Change border color based on whether name is valid */}
              <span className='control has-icons-right'>
                <input
                  autoFocus
                  type='text'
                  className={'input ' + newProjectStyle.messageStyle}
                  placeholder='Project Name'
                  value={newProject.name}
                  size={70}
                  onChange={handleChange}
                />
                {/* If the project name is not valid, display the error icon in field and error message */}
                {!newProject.isValid && newProject.name !== '' && errorIcon}
                {!newProject.isValid && newProject.name !== '' && (
                  <p className='has-text-danger has-text-weight-bold'>
                    Invalid project name
                  </p>
                )}
              </span>
            </label>
          </form>
        </section>
        <footer className='modal-card-foot'>
          <button
            className='button is-success'
            onClick={(): void => handleSubmit()}
            disabled={!newProject.isValid}
          >
            Create Project
          </button>
          <button
            className='button'
            onClick={(): void => setShowProjectSidebarModal(false)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProjectSideBar;
