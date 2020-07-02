import React, { useState, useEffect } from "react";

import AddRepos from "../addRepos/AddRepos";
import { Project, User, ProjectPageProps, Repo } from "../../../types/types";
import ProjectRepoListItem from "./ProjectRepoListItem";
import ComposeFileModal from "./ComposeFileModal";
import CloningReposModal from "./CloningReposModal";
import { findActiveProject } from "../../helpers/projectHelper";
import { getUsernameAndToken } from "../../helpers/cookieClientHelper";
import { findActiveProject } from "../../helpers/projectHelper";

const ProjectPage: React.FC<ProjectPageProps> = ({
  activeProject,
  userInfo,
  projectList,
  setProjectList,
}) => {
  const [showAddRepos, setShowAddRepos] = useState(false);
  const [projectRepoListItems, setprojectRepoListItems] = useState([]);

  const [showCloningReposModal, setShowCloningReposModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);

  // populate repo list items when active project changes and when request from home.tsx comes back to update project list
  useEffect(() => {
    const currentProject: Project = findActiveProject(
      projectList,
      activeProject
    );

    if (currentProject && currentProject.projectRepos) {
      const newList = currentProject.projectRepos.map((repo) => {
        return (
          <ProjectRepoListItem
            key={`ProjectRepoListItem ${repo.repoId}`}
            {...{ repo, activeProject, projectList, setProjectList }}
          />
        );
      });
      setprojectRepoListItems(newList);
    }
  }, [activeProject, projectList]);

  const composeFile = () => {

    const Url = "http://localhost:3001/docker/";


    const body = {
      projectName: `${activeProject}`,
    };
    //optional parameters
    const otheParam = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
      method: "POST",
    };
    fetch(Url, otheParam)
      .then((data) => {
        setShowComposeModal(true)
        return data.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };


  const cloneRepos = async () => {
    setShowCloningReposModal(true);

    const currentProject: Project = findActiveProject(
      projectList,
      activeProject
    );

    // get selected repos that are checked to clone
    const reposToClone = currentProject.projectRepos.filter(
      ({ isIncluded }) => isIncluded
    );

    // get username and token
    const { username, accessToken } = await getUsernameAndToken();

    const body = JSON.stringify({
      username: username,
      accessToken: accessToken,
      repos: reposToClone,
      projectName: currentProject.projectName,
    });

    console.log(username, " decrypte", accessToken);
    fetch("http://localhost:3001/api/clonerepos", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setShowCloningReposModal(false);
        return res.json();
      })
      .then((res) => console.log("success", res))
      .catch((err) => console.log("fail", err));
  };

  return (
    <div>
      <div>Select your repositories: </div>
      <button
        className="button is-primary is-large"
        onClick={(): void => setShowAddRepos(true)}
      >
        Add Repositories
      </button>
      <button
        className="button is-link"
        onClick={(): Promise<void> => cloneRepos()}
      >
        Clone Repos
      </button>

      <button
        className="button is-link"
        onClick={(): void => composeFile()}
      >
        Compose File
      </button>

      {projectRepoListItems}

      {/* shows this element if showAddRepos is true */}
      {showAddRepos && (
        <AddRepos
          {...{
            showAddRepos,
            setShowAddRepos,
            activeProject,
            projectList,
            setProjectList,
          }}
        />
      )}
      {showCloningReposModal && (
        <CloningReposModal
          {...{ showCloningReposModal, setShowCloningReposModal }}
        />
      )}

      {showComposeModal && (
        <ComposeFileModal
          {...{
            showComposeModal,
            setShowComposeModal,
            activeProject,
            projectList,
          }}
        />
      )}
    </div>
  );
};

export default ProjectPage;
