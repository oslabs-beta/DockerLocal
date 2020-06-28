import React from "react";

const ComposeFileModal: React.FC = ({ setShowComposeModal }) => {
  //yml data form Docker compose file
  //parse yml to javascript object
  // const ymlText = yaml.dump(ymlObject)
  const ymlText = "This is a yml file";

  //display: project_name.yml
  //display: File created at users/dockerLocal/project_name
  //display: button 'open folder' and 'close'
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
