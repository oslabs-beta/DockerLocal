import React, { useState } from "react";

import AppInfoModal from "../appInfo/AppInfoModal";
import { EXPRESS_URL } from "../../helpers/constants";

const SignIn: React.FC = () => {
  //initailize showModal to false
  const [showModal, setShowModal] = useState(false);

  //display signIn button and appInfo button
  return (
    <div className="buttons is-centered" style={{height:"70vh"}}>
      <button
        className="button is-primary"
        onClick={(): void =>
          window.location.replace(`${EXPRESS_URL}/auth/github`)
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
      {showModal && <AppInfoModal {...{ showModal, setShowModal }} />}
    </div>
  );
};

export default SignIn;
