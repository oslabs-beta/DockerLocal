import React from "react";

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

  const ymlText = composeFileData.text;
  const ymlFilePath = composeFileData.path;

  /**
   * RENDER:  1. ymlText or error messgae
   *          2. file path or error message
   * CONTAINS: 2 buttons 'open folder' and 'close' buttons
   */
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">docker-compose.yml</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {/* Display ymlText or error message */}
          {!ymlText && (
            <p className='has-text-danger has-text-weight-bold'>
              ERROR: cannot compose file
            </p>
          )}
          {ymlText && (
            <pre>
              <code>
                {ymlText}
              </code>
            </pre>
          )}
        </section>
        <footer className="modal-card-foot">
          <div className="content" style={{ height: "100px" }}>
            <strong>File Location:</strong>
            {/* Display file path or error message */}
            {!ymlFilePath && (
              <p className='has-text-danger has-text-weight-bold'>
                ERROR: file path not found
              </p>
            )}
            {ymlFilePath && (
              <p>
                {ymlFilePath}
              </p>
            )}
          </div>
          <div>
            {/* ============== TODO ================== */}
            {/* TODO: Open File or File Folder onClick */}
            {/* ====================================== */}
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
