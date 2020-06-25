import React, { useState } from "react";

import AppInfoModal from "../appInfo/AppInfoModal";

const SignIn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="imgWrap">
        <img
          src="https://www.freeiconspng.com/uploads/github-logo-icon-24.png"
          alt="Png Vector Github Logo"
          onClick={() =>
            window.location.replace("http://localhost:3001/auth/github")
          }
          className="githublogo"
          width="100"
        />
      </div>
      <button onClick={() => setShowModal(!showModal)}>
        More Info About DockerLocal
      </button>
      {showModal ? <AppInfoModal /> : null}
    </div>
  );
};

export default SignIn;
