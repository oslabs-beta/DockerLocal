import { Project } from '../../types/types';

/**
 * @function findActiveProject
 * @description finds the active project from the list of user's projects
 * @param projectList contains all info about projects
 * @param activeProject current active project name
 * @returns project object whose ID matches the current active project's ID
 */
export const findActiveProject = (
  projectList: readonly Project[],
  activeProject: string
): Project => {
  return {
    ...projectList.find((project) => project.projectId === activeProject),
  };
};

export const saveProjectList = (projectList: readonly Project[], activeProject: string): void => {
  fetch("http://localhost:3001/config", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },    
    body: JSON.stringify({
      projectList: [...projectList],
      activeProject
    }),
  })
    .catch((err) => console.log("fail", err));
};
/**
 * @function checkValidName
 * @description function that updates boolean in state that indicates whether project name entered is valid
 * @param projectNameValue string which will be checked for valid format
 * @returns boolean. True if no invalid characters
 */
export const checkValidName = (
  projectNameValue: string,
  projectList: readonly Project[]
): boolean => {
  // RegExp to test if project name will be valid project/folder name.
  // Can have letters, numbers, hyphens, underscores only. Limited to 1 to 25 characters
  const regex = /^[\w-]{1,25}$/;
  const isValid: boolean = regex.test(projectNameValue);
  // Check to make sure we don't have duplicate project names.
  const nameArray = projectList.map((project) =>
    project.projectName.toLowerCase()
  );
  const isUnique = !nameArray.includes(projectNameValue.toLowerCase());

  return isValid && isUnique;
};
