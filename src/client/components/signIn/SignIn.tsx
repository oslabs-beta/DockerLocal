import React, { useState } from "react";

import AppInfoModal from "../appInfo/AppInfoModal";

const SignIn: React.FC = () => {
  //initailize showModal to false
  const [showModal, setShowModal] = useState(false);

  //display signIn button and appInfo button
  return (
    <div className="buttons">
      <button
        className="button is-primary"
        onClick={(): void =>
          window.location.replace("http://localhost:3001/auth/github")
        }
      >
        Sign In With Github
      </button>
      <button 
        className="button is-link"
        onClick={(): void => setShowModal(!showModal)}
      >
        More Info About DockerLocal
      </button>
      
      {/* this will render AppInfoModal if showModal evaluates to true */}
      {showModal && <AppInfoModal {...{ showModal, setShowModal }}/>}
    </div>
  );
};

export default SignIn;
