import React, { Dispatch, SetStateAction } from "react";

import AppInfoList from "./AppInfoList";

// const modalAppInfo = document.getElementById("modal-appInfo");

const AppInfoModal: React.FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  // return ReactDom.createPortal(<div>This is appInfo modal</div>, modalAppInfo);

  //WIP- make it a UI modal
  //keep it as a div for now
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
        <section className="modal-card-body">{AppInfoList} </section>
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
