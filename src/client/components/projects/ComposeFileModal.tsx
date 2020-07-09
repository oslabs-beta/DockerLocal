import React from "react";
import { dialog, shell } from "electron";
import mainWindow from "../../../index";


/**
 * @ 
 * @
 */
const ComposeFileModal: React.FC = ({
  setShowComposeModal,
  activeProject,
  projectList,
  composeFileData
}) => {

  //yml data form Docker compose file
  const ymlText = composeFileData.text;

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
        <section className="modal-card-body">
          <pre>
            <code>
              {ymlText}
            </code>
          </pre>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={(): void => dialog.showOpenDialog(mainWindow)}>Open Folder</button>
          <button
            className="button"
            onClick={(): void => setShowComposeModal(false)}
          >
            Close
          </button>
        </footer>
      </div>
    </div >
  );
};

export default ComposeFileModal;
