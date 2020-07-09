import { Project } from "../../types/types";

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