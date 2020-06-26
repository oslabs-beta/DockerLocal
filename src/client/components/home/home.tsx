import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

import Sidebar from '../sidebar/Sidebar';
import AddRepos from '../addRepos/AddRepos';


type HomeProps = {
  userInfo: {username: string; id: string};
  setUserInfo: Dispatch<SetStateAction<{username: string; id: string}>>;
}

// should set type for props
const Home: React.FC<HomeProps> = ({ userInfo, setUserInfo }) => {
  // need to set type for projects/projectlist
  const [projectList, setProjectList] = useState([{projectName: 'DockerLocal(project1)', projectId: 1}, {projectName: 'React Visualizer 74.0(project2)', projectId: 2}]);
  const [activeProject, setActiveProject] = useState({projectName: 'DockerLocal(project1)', projectId: 1});
  const [showAddRepos, setShowAddRepos] = useState(false);


  return (
    <div>
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.username}`}

      <div className="columns"> 
        <div className="column is-one-third">
          <Sidebar {...{projectList, activeProject, setActiveProject}} />
        </div>
          <button onClick={():void => setShowAddRepos(true)}>Add Reopos!</button>
          {showAddRepos && <AddRepos
                              {...{showAddRepos, setShowAddRepos, userInfo}}
                              />}
        <div className="column">
          {/* shows this element if showAddRepos is true */}
        </div>

      </div>
    </div>
  )
}

export default Home;