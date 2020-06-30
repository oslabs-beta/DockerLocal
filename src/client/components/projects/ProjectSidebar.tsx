import React, { Dispatch, SetStateAction } from "react";

const ProjectSideBar: React.FC<{
  setShowProjectSidebarModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowProjectSidebarModal }) => {
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
          This is the ProjectSideBar Modal
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={(): void => setAddProject(false)}
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
