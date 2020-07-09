import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

import Sidebar from "../sidebar/Sidebar";
import AddRepos from "../addRepos/AddRepos";
import ProjectPage from "../projects/ProjectPage";

import { Project, Repo, User } from "../../../types/types";
import { saveProjectList } from "../../helpers/projectHelper";

type HomeProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

// should set type for props
const Home: React.FC<HomeProps> = ({ userInfo, setUserInfo }) => {
  // need to set type for projects/projectlist
  const [projectList, setProjectList] = useState<readonly Project[]>([]);

  const [activeProject, setActiveProject] = useState('');


  // placeholder requests for testing
  const Request1 = (): void => saveProjectList(projectList, activeProject)

  // save project list to disk **** -- need to extract to helper function and find places to use it
  const Request2 = (): void => {
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
      // .then((res) => res.json())
      .then((res) => console.log("success", res))
      .catch((err) => console.log("fail", err));
  };
  const Request3 = (): void => {
    fetch("http://localhost:3001/config", {
      method: "GET",
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log("success", res))
      .catch((err) => console.log("fail", err));
  };

  // populate list of projects, happens on render
  useEffect(() => {

    // route reads project list from local file
    // sets state for the project list
    fetch("http://localhost:3001/config")
      .then((res) => res.json())
      .then((res) => {
        if (res.projectList && res.activeProject){
          setProjectList(res.projectList)
          setActiveProject(res.activeProject)
        }
      })
      .catch((err) => console.log("fail", err));
  }, []);


  // saves project list to disk whenever either are modified
  useEffect(() => {
    saveProjectList(projectList, activeProject)
  }, [projectList, activeProject])

  return (
    <div style={{marginTop:"15px", marginLeft:"10px"}}>
      {/* <LoggedIn/> << logged in component at top with logout button and username*/}
      {`${userInfo.userName}`}
      {<button onClick={(): void => Request1()}>DEMO Request1</button>}
      {<button onClick={(): void => Request2()}>Save Project List to Disk</button>}
      {<button onClick={(): void => Request3()}>DEMO Request3</button> } 

      <div className="columns" style={{position:"relative", top:"10px"}}>
        <div className="column is-one-third"  style={{height:'100vh', borderTop:"solid 1px"}}>
          <Sidebar
            {...{
              projectList,
              setProjectList,
              activeProject,
              setActiveProject,
            }}
          />
        </div>
        <div className="column" style={{height:'100vh', backgroundColor:"white", borderLeft:"solid 1px", borderTop:"solid 1px"}}>
          <ProjectPage
            {...{ activeProject, userInfo, projectList, setProjectList }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
