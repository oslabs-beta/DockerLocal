import React, { Dispatch, SetStateAction} from "react";


// const modalAppInfo = document.getElementById("modal-appInfo");

const AppInfoModal: React.FC<{setShowModal: Dispatch<SetStateAction<boolean>> }> = ({ setShowModal }) => {
  // return ReactDom.createPortal(<div>This is appInfo modal</div>, modalAppInfo);

  //WIP- make it a UI modal
  //keep it as a div for now
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          This is the appInfo Modal
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button" onClick={(): void => setShowModal(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export default AppInfoModal;
