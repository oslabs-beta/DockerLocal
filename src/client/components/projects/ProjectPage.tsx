import React, { useState, useEffect } from 'react';

import AddRepos from '../addRepos/AddRepos';
import {
  Project,
  ProjectPageProps,
  ComposeFile,
  ComposeFileModalProps,
} from '../../../types/types';
import ProjectRepoListItem from './ProjectRepoListItem';
import ComposeFileModal from './ComposeFileModal';
import CloningReposModal from './CloningReposModal';
import { findActiveProject } from '../../helpers/projectHelper';
import { getUsernameAndToken } from '../../helpers/cookieClientHelper';
import { EXPRESS_URL } from '../../helpers/constants';

const ProjectPage: React.FC<ProjectPageProps> = ({
  activeProject,
  userInfo,
  projectList,
  dispatch,
}) => {
  const [showAddRepos, setShowAddRepos] = useState(false);
  const [projectRepoListItems, setprojectRepoListItems] = useState([]);

  const [showCloningReposModal, setShowCloningReposModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeFileData, setComposeFileData] = useState<null | ComposeFile>(
    null
  );

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
            {...{ repo, activeProject, projectList, dispatch }}
          />
        );
      });
      setprojectRepoListItems(newList);
    }
  }, [activeProject, projectList]);

  /**
   * @function onClick button Compose File button
   * @description send 'POST' request
   * send: projectName
   * receive: yml file and pathfile
   */
  const composeFile = (): void => {
    const currentProject: Project = findActiveProject(
      projectList,
      activeProject
    );

    const reposToClone = currentProject.projectRepos.filter(
      ({ isIncluded }) => isIncluded
    );

    const body = {
      projectName: currentProject.projectName,
      repos: reposToClone,
    };

    fetch(`${EXPRESS_URL}/docker`, {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
      method: 'POST',
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        const newYmlData: ComposeFile = {
          text: res.file,
          path: res.path,
        };
        setComposeFileData(newYmlData);
        setShowComposeModal(true);
      })
      .catch((error) => console.log(error));
  };

  const cloneRepos = async (): Promise<void> => {
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
      username,
      accessToken,
      repos: reposToClone,
      projectName: currentProject.projectName,
    });

    fetch(`${EXPRESS_URL}/api/clonerepos`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setShowCloningReposModal(false);
        return res.json();
      })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('fail', err));
  };

  return (
    <div>
      <div>Select your repositories: </div>
      <button
        className='button is-primary'
        onClick={(): void => setShowAddRepos(true)}
        style={{ margin: '10px' }}
      >
        Add Repositories
      </button>
      <button
        className='button is-primary'
        onClick={(): Promise<void> => cloneRepos()}
        style={{ margin: '10px' }}
      >
        Clone Repos
      </button>

      <button
        className='button is-primary'
        onClick={(): void => composeFile()}
        style={{ margin: '10px' }}
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
            dispatch,
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
            composeFileData,
          }}
        />
      )}
    </div>
  );
};

export default ProjectPage;
