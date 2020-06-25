import React, { useState } from "react";

import AppInfoModal from "../appInfo/AppInfoModal";

const SignIn: React.FC = () => {
  //initailize showModal to false
  const [showModal, setShowModal] = useState(false);

  //display signIn button and appInfo button
  return (
    <div>
      <button
        onClick={() =>
          window.location.replace("http://localhost:3001/auth/github")
        }
      >
        Sign In With Github
      </button>
      <button onClick={() => setShowModal(!showModal)}>
        More Info About DockerLocal
      </button>
      {showModal ? <AppInfoModal /> : null}
    </div>
  );
};

export default SignIn;
