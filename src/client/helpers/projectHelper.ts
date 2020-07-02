import { Project } from "../../types/types";

export const findActiveProject = (
  projectList: readonly Project[],
  activeProject: string
): Project => {
  return {
    ...projectList.find((project) => project.projectId === activeProject),
  };
};
