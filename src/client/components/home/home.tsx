import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

import Sidebar from "../sidebar/Sidebar";
import AddRepos from "../addRepos/AddRepos";
import ProjectPage from "../projects/ProjectPage";

import { Project, Repo, User } from "../../../types/types";

type HomeProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

// should set type for props
const Home: React.FC<HomeProps> = ({ userInfo, setUserInfo }) => {
  // need to set type for projects/projectlist
  const [projectList, setProjectList] = useState<Project[]>([
    { projectName: "DockerLocal(project1)", projectId: 1, projectRepos: [] },
    {
      projectName: "React Visualizer 74.0(project2)",
      projectId: 2,
      projectRepos: [],
    },
  ]);

  const [activeProject, setActiveProject] = useState<Project>({
    projectName: "DockerLocal(project1)",
    projectId: 1,
    projectRepos: [{ repoName: "repo 1", repoCloneLink: "http/..github/.." }],
  });

  return (
    <div>
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.userName}`}

      <div className="columns">
        <div className="column is-one-third">
          <Sidebar {...{ projectList, activeProject, setActiveProject }} />
        </div>
        <div className="column">
          <ProjectPage {...{ activeProject, userInfo }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
