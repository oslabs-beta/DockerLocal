import React, { useState, useEffect } from 'react';
import RepoSearchListItem from './RepoSearchListItem';

import { findActiveProject } from '../../helpers/projectHelper';
import { fetchRepos } from '../../helpers/fetchRepoHelper';
import {
  Repo,
  RepoResponseType,
  AddReposProps,
  Project,
} from '../../../types/types';

/**
 * @function  Add array of repositories to repos array in state
 * @desc    Sends fetch requests to Github API to populate repository info for authenticated user
 */
const AddRepos: React.FC<AddReposProps> = ({
  showAddRepos,
  setShowAddRepos,
  activeProject,
  projectList,
  dispatch,
}) => {
  const [repos, setRepos] = useState<RepoResponseType>({
    personal: [],
    organizations: [],
    collaborations: [],
  });
  const [selectedRepos, setSelectedRepos] = useState<readonly Repo[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // switches active filter onclick
  const filterClick = (
    e: React.MouseEvent<HTMLAnchorElement & { id: string }>
  ): void => {
    setActiveFilter(e.currentTarget.id);
  };

  const handleSubmit = () => {
    // make copy of current project
    const currentProject: Project = findActiveProject(
      projectList,
      activeProject
    );

    // remove any repos that are already included in the project so user will not have duplicate repos
    const reposToAdd = selectedRepos.filter(
      (newRepo) =>
        !currentProject.projectRepos.some(
          (existingRepo) => newRepo.repoId === existingRepo.repoId
        )
    );

    // add selected repos to current project
    currentProject.projectRepos = [
      ...currentProject.projectRepos,
      ...reposToAdd,
    ];

    // insert new project into new project list
    const newProjectList: Project[] = projectList.map((project) =>
      project.projectId === currentProject.projectId ? currentProject : project
    );

    // update state
    dispatch({ type: 'addRepo', payload: newProjectList });
    setShowAddRepos(false);
  };

  useEffect(() => {
    // fetch repos on load, will not setRepos if modal is already closed when the fetch request returns
    fetchRepos().then((res) => showAddRepos && setRepos(res));
  }, []);

  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <article className='panel is-primary'>
          <p className='panel-heading'>Select Repositories to Add:</p>
          <section style={{ padding: 0 }} className='modal-card-body'>
            {/* filter tabs */}
            <p className='panel-tabs'>
              <a
                className={activeFilter === 'all' ? 'is-active' : ''}
                id='all'
                onClick={(e): void => filterClick(e)}
              >
                All
              </a>

              {/* hardcoded id, might want to change these to variables */}
              <a
                className={activeFilter === 'personal' ? 'is-active' : ''}
                id='personal'
                onClick={(e): void => filterClick(e)}
              >
                Personal
              </a>
              <a
                className={activeFilter === 'organizations' ? 'is-active' : ''}
                id='organizations'
                onClick={(e): void => filterClick(e)}
              >
                Organizations
              </a>
              <a
                className={activeFilter === 'collaborations' ? 'is-active' : ''}
                id='collaborations'
                onClick={(e): void => filterClick(e)}
              >
                Collaborations
              </a>
            </p>
            <div className='panel-block'>
              <p className='control has-icons-left'>
                <input
                  autoFocus
                  className='input is-large'
                  type='text'
                  placeholder='Search'
                  size={80}
                  value={searchValue}
                  onChange={handleChange}
                />
              </p>
            </div>
          </section>

          <section
            style={{ height: 300, padding: 0 }}
            className='modal-card-body'
          >
            {/* if activeFilter is all or personal, render personal repos */}
            {/* if something is typed in the search box, only show repos that include the exact string */}
            {/* could change filter to regex at a later date to include a more robust search */}
            {/* map filtered list to render comonent for each item */}
            {(activeFilter === 'all' || activeFilter === 'personal') &&
              repos.personal
                .filter(({ repoName, repoOwner }) => {
                  return (
                    searchValue === '' ||
                    repoName.includes(searchValue) ||
                    repoOwner.includes(searchValue)
                  );
                })
                .map((repo) => (
                  <RepoSearchListItem
                    key={repo.repoId}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos,
                      projectList,
                      activeProject,
                    }}
                  />
                ))}
            {/* same as above for organizations */}
            {(activeFilter === 'all' || activeFilter === 'organizations') &&
              repos.organizations
                .filter(({ repoName, repoOwner }) => {
                  return (
                    searchValue === '' ||
                    repoName.includes(searchValue) ||
                    repoOwner.includes(searchValue)
                  );
                })
                .map((repo) => (
                  <RepoSearchListItem
                    key={repo.repoId}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos,
                      projectList,
                      activeProject,
                    }}
                  />
                ))}
            {/* same as above for collabs */}
            {(activeFilter === 'all' || activeFilter === 'collaborations') &&
              repos.collaborations
                .filter(({ repoName, repoOwner }) => {
                  return (
                    searchValue === '' ||
                    repoName.includes(searchValue) ||
                    repoOwner.includes(searchValue)
                  );
                })
                .map((repo) => (
                  <RepoSearchListItem
                    key={repo.repoId}
                    {...{
                      repo,
                      selectedRepos,
                      setSelectedRepos,
                      projectList,
                      activeProject,
                    }}
                  />
                ))}
          </section>

          {/* might want to add a style here to keep constant height */}
          {/* could add uncheck functionality to list at bottom, would have to rethink state if so*/}
          <footer className='modal-card-foot'>
            <div style={{ height: '100px' }} className='content'>
              Add the following Repositories to your project:
              <ul>
                {selectedRepos.map(({ repoName, repoId }) => (
                  <li key={`confirm ${repoId}`}>{repoName}</li>
                ))}
              </ul>
            </div>
            <div>
              <button
                className='button'
                onClick={(): void => setShowAddRepos(false)}
              >
                Cancel
              </button>
              <button
                className='button is-success'
                onClick={(): void => handleSubmit()}
              >
                Add Repos
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default AddRepos;
