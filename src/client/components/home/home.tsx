/* eslint-disable import/no-unresolved */
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
} from 'react';

import Sidebar from '../sidebar/Sidebar';
import AddRepos from '../addRepos/AddRepos';
import ProjectPage from '../projects/ProjectPage';

import {
  Project,
  Repo,
  User,
  HomeProps,
  projectListActions,
} from '../../../types/types';
import { saveProjectList } from '../../helpers/projectHelper';
import { EXPRESS_URL } from '../../helpers/constants';

const initialProjectList: Project[] = [];

function projectListReducer(state, action: projectListActions) {
  switch (action.type) {
    case 'addProject':
      return action.payload;
    case 'deleteProject':
      return action.payload;
    case 'addRepo':
      return action.payload;
    case 'deleteRepo':
      return action.payload;
    case 'toggleRepo':
      return action.payload;
    default:
      return state;
  }
}

const Home: React.FC<HomeProps> = ({ userInfo, setUserInfo }) => {
  const [projectList, dispatch] = useReducer(
    projectListReducer,
    initialProjectList
  );

  const [activeProject, setActiveProject] = useState('');

  // run once on render
  // reads project list from local file and sets state
  useEffect(() => {
    fetch(`${EXPRESS_URL}/config`)
      .then((res) => res.json())
      .then((res) => {
        if (res.projectList && res.activeProject) {
          dispatch({ type: 'addProject', payload: res.projectList });
          setActiveProject(res.activeProject);
        }
        // else alert(`It looks like you haven't added any projects yet. Click Add Project to get started. `) ** this has bugs on windows
      })
      .catch((err) => console.log('fail', err));
  }, []);

  // saves project list to disk whenever either are modified
  useEffect(() => {
    if (projectList[0]) saveProjectList(projectList, activeProject);
  }, [projectList, activeProject]);

  return (
    <div style={{ marginTop: '15px', marginLeft: '10px' }}>
      {`${userInfo.userName}`}

      <div className='columns' style={{ position: 'relative', top: '10px' }}>
        <div
          className='column is-one-third'
          style={{ height: '100vh', borderTop: 'solid 1px' }}
        >
          <Sidebar
            {...{
              projectList,
              dispatch,
              activeProject,
              setActiveProject,
            }}
          />
        </div>
        <div
          className='column'
          style={{
            height: '100vh',
            backgroundColor: 'white',
            borderLeft: 'solid 1px',
            borderTop: 'solid 1px',
          }}
        >
          <ProjectPage
            {...{
              activeProject,
              userInfo,
              projectList,
              dispatch,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
