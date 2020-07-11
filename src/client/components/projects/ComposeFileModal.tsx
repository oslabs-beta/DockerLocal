import React from "react";
import { dialog, shell } from "electron";
import mainWindow from "../../../index";


/**
 * @descriotion ComposeFileModal component
 * @param props drilling from ProjectPage component
 */
const ComposeFileModal: React.FC = ({
  setShowComposeModal,
  activeProject,
  projectList,
  composeFileData
}) => {

  //yml text reponse from onClick Compose File button
  const ymlText = composeFileData.text;
  const ymlFilePath = composeFileData.path;

  //display: project_name.yml
  //display: File created at users/dockerLocal/project_name
  //contains 2 buttons 'open folder' and 'close'
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">docker_compose.yaml</p>
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
          <div className="content" style={{ height: "100px" }}>
            <strong>File Location:</strong> {ymlFilePath}
          </div>
          <div>
            <button className="button is-success" onClick={}>Open Folder</button>
            <button
              className="button"
              onClick={(): void => setShowComposeModal(false)}
            >
              Close
          </button>
          </div>
        </footer>
      </div>
    </div >
  );
};

export default ComposeFileModal;
