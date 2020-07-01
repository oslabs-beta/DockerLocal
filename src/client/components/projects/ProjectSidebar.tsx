import React, { Dispatch, SetStateAction, useState } from "react";
import { Project } from "../../../types/types";

const ProjectSideBar: React.FC<{
  setShowProjectSidebarModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowProjectSidebarModal, projectList, setProjectList }) => {
  const [projectNameValue, setProjectNameValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProjectNameValue(e.target.value);
  };

  // use uuid to generate projectId?????*********
  const handleSubmit = () => {
    //create an object
    const newProject: Project = {
      projectId: 6,
      projectName: projectNameValue,
      projectRepos: [],
    };

    // set copy of a new project
    setProjectList([...projectList, newProject]);
    //TODO:  write to the file ******
    //then close the modal
    setShowProjectSidebarModal(false);
  };

  // input for projectname
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create A New Project</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <label>
              Project Name:
              <input
                type="text"
                placeholder="Project Name"
                value={projectNameValue}
                size={70}
                onChange={handleChange}
              />
            </label>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={(): void => handleSubmit()}
          >
            Create Project
          </button>
          <button
            className="button"
            onClick={(): void => setShowProjectSidebarModal(false)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProjectSideBar;
