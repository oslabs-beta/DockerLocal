import { Project } from '../../types/types';

/**
 * @function findActiveProject
 * @description finds the active project
 * @param projectList
 * @param activeProject
 */
export const findActiveProject = (
  projectList: readonly Project[],
  activeProject: string
): Project => {
  return {
    ...projectList.find((project) => project.projectId === activeProject),
  };
};
/**
 * @function checkValidName
 * @description function that updates boolean in state that indicates whether project name entered is valid
 * @param projectNameValue
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
  const nameArray = projectList.map((project) => project.projectName);
  const isUnique = !nameArray.includes(projectNameValue);

  return isValid && isUnique;
};
