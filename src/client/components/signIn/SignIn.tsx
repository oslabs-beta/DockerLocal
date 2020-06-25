import React, { useState } from "react";

import AppInfo from "../appInfo/AppInfoModal";

const SignIn: React.FC = () => {
  const [] = 

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
      <button>More Info About DockerLocal</button>
    </div>
  );
};

export default SignIn;
