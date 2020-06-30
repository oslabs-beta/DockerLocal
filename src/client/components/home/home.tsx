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
  const [projectList, setProjectList] = useState<readonly Project[]>([]);

  const [activeProject, setActiveProject] = useState<Project>({
    projectName: "No Projects Found",
    projectId: 1,
    projectRepos: [{ repoName: "repo 1", repoCloneLink: "http/..github/.." }],
  });

  const testRequest = () => {
    fetch("/api/repos", {
      //******** '/http:3000/api/repos' */
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log("success", res))
      .catch((err) => console.log("fail", err));
  };

  // populate list of projects, happens on render
  useEffect(() => {
    // fetch projects from local file, prob fs.readfile
    // .then set state for project list

    // dummy response
    const fetched = [
      {
        projectName: "DockerLocal(project1)",
        projectId: 1,
        projectRepos: [
          {
            repoName: "perrepop1",
            repoCloneLink: "personallink1",
            isIncluded: false,
          },
          {
            repoName: "abcdefgpersonal2",
            repoCloneLink: "personallink2",
            isIncluded: false,
          },
          {
            repoName: "abbsddpersonalRepo3",
            repoCloneLink: "personallink3",
            isIncluded: false,
          },
          {
            repoName: "collab Repo4",
            repoCloneLink: "collablink4",
            isIncluded: false,
          },
          {
            repoName: "collab Repo5",
            repoCloneLink: "collablink5",
            isIncluded: false,
          },
          {
            repoName: "collab Repo6",
            repoCloneLink: "collablink6",
            isIncluded: false,
          },
        ],
      },
      {
        projectName: "React Visualizer 2.5(project2)",
        projectId: 2,
        projectRepos: [
          {
            repoName: "collab Repo4",
            repoCloneLink: "collablink4",
            isIncluded: false,
          },
          {
            repoName: "collab Repo5",
            repoCloneLink: "collablink5",
            isIncluded: false,
          },
          {
            repoName: "collab Repo6",
            repoCloneLink: "collablink6",
            isIncluded: false,
          },
        ],
      },
      {
        projectName: "React Visualizer 8.5(project3)",
        projectId: 3,
        projectRepos: [
          {
            repoName: "organization Repo5",
            repoCloneLink: "orglink5",
            isIncluded: false,
          },
          {
            repoName: "organization Repo6",
            repoCloneLink: "orglink6",
            isIncluded: false,
          },
          {
            repoName: "collab Repo1",
            repoCloneLink: "collablink1",
            isIncluded: false,
          },
          {
            repoName: "collab Repo2",
            repoCloneLink: "collablink2",
            isIncluded: false,
          },
        ],
      },
      {
        projectName: "React Visualizer 77.0(project4)",
        projectId: 4,
        projectRepos: [
          {
            repoName: "organization Repo5",
            repoCloneLink: "orglink5",
            isIncluded: false,
          },
          {
            repoName: "organization Repo6",
            repoCloneLink: "orglink6",
            isIncluded: false,
          },
          {
            repoName: "collab Repo1",
            repoCloneLink: "collablink1",
            isIncluded: false,
          },
          {
            repoName: "collab Repo2",
            repoCloneLink: "collablink2",
            isIncluded: false,
          },
        ],
      },
      {
        projectName: "React Visualizer 85.0(project5)",
        projectId: 5,
        projectRepos: [
          {
            repoName: "organization Repo4",
            repoCloneLink: "orglink4",
            isIncluded: false,
          },
          {
            repoName: "collab Repo3",
            repoCloneLink: "collablink3",
            isIncluded: false,
          },
        ],
      },
    ];
    setProjectList(fetched);
  }, []);

  return (
    <div>
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.userName}`}
      <button onClick={(): void => testRequest()}>DEMO Request</button>

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
