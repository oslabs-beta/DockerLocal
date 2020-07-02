import React, { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Project } from "../../../types/types";

const ProjectSideBar: React.FC<{
  setShowProjectSidebarModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowProjectSidebarModal, projectList, setProjectList }) => {
  const [projectNameValue, setProjectNameValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProjectNameValue(e.target.value);
  };

  // ============= TODO: ==================
  // 1. improve logic to handle project name input edge cases
  //     1.1 handle empty string
  //     1.2 handle max lenght
  // 2. on setProjectLise, add logic to write to file
  // 3. add more comments
  // ========================================
  const handleSubmit = () => {
    //create an object
    const newProject: Project = {
      projectId: uuidv4(),
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
