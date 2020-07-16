import React, { useState } from "react";

import AppInfoModal from "../appInfo/AppInfoModal";
import { EXPRESS_URL } from "../../helpers/constants";
import { getUsernameAndToken } from "../../helpers/cookieClientHelper";
import { SignInProps } from "../../../types/types"

const SignIn: React.FC<SignInProps> = ({ isLoggedIn, setIsLoggedIn, setUserInfo }) => {
  //initailize showModal to false
  const [showModal, setShowModal] = useState(false);

  //display signIn button and appInfo button
  return (
    <div className="buttons is-centered" style={{height:"70vh"}}>
      <button
        className="button is-primary"
        // onClick={(): void =>
        //   window.location.replace(`${EXPRESS_URL}/auth/github`)
        // }
        onClick={(): void=> {
          const checkIfLoggedIn = async (): Promise<void> => {
            const { username , accessToken } = await getUsernameAndToken();
            if (username && accessToken){
              setUserInfo({userName: username, userId: 'abc'})
              setIsLoggedIn(true);
            } else {
              setShowModal(true)
            }
          }
          checkIfLoggedIn();
        }}
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
