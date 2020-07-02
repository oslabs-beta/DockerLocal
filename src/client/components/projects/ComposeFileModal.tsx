import React from "react";

const ComposeFileModal: React.FC = ({
  setShowComposeModal,
  activeProject,
  projectList,
}) => {

  //yml data form Docker compose file
  let ymlText = "This is a yml file";
  //expected data in yml
  const generateYmal = () => {
    fetch(Url)
      .then((data) => {
        ymlText = `${data}`;
      })
      .catch((error) => console.log(error));
  };

  // make a post request to send ProjectName

  //display: project_name.yml
  //display: File created at users/dockerLocal/project_name
  //caontains 2 buttons 'open folder' and 'close'
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Project_name.yml</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">{ymlText}</section>
        <footer className="modal-card-foot">
          <button className="button is-success">Open Folder</button>
          <button
            className="button"
            onClick={(): void => setShowComposeModal(false)}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ComposeFileModal;
