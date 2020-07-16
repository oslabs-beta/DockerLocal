import React from "react";
import { CloningReposModalProps } from "../../../types/types";

const CloningReposModal: React.FC<CloningReposModalProps>  = ({ showCloningReposModal, setShowCloningReposModal }) => {


  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Cloning Repos</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          Cloning your selected repos. This may take a while. This modal will close when finished. Please be patient.
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-danger"
            onClick={(): void => setShowCloningReposModal(false)}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CloningReposModal;
