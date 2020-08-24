import React, { Dispatch, SetStateAction } from "react";

import AppInfoList from "./AppInfoList";

// display AppInfoList component
// constains 2 buttons listen to onClick to close modal
const AppInfoModal: React.FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">About DockerLocal</p>
          <button
            aria-label="close"
            className="button"
            onClick={(): void => setShowModal(false)}
          >
            x
          </button>
        </header>
        <section className="modal-card-body">{AppInfoList}</section>
        <section className="modal-card-body">
          To get started, please create a personal access token from on your github account. Instructions are on our github readme.
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={(): void => setShowModal(false)}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AppInfoModal;
