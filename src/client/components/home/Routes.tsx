/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import Home from './home';
import SignIn from '../signIn/SignIn';
import { User } from '../../../types/types';
import { getUsernameAndToken } from "../../helpers/cookieClientHelper";
import { GITHUB_USERID } from "../../../../env"

const Routes: React.FC = (props) => {
  // hooks to define state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rendered, setRendered] = useState(<SignIn />);


  // need to add type for userInfo if not null
  // const [userInfo, setUserInfo] = useState<user[] | null>(null);
  const [userInfo, setUserInfo] = useState<User>({userName: GITHUB_USERID, userId: 'abc'});

  // runs on render and checks 'isloggedin' display correct page depending on whether user is logged in
  // could add logic for 'hasprojects'
  // need to make prettier
  useEffect(()=> {
    // const checkIfLoggedIn = async (): Promise<void> => {
    //   const { username , accessToken } = await getUsernameAndToken();
    //   if (accessToken){
    //     setUserInfo({userName: username, userId: 'abc'})
    //     setIsLoggedIn(true);
    //   }
    // }
    // checkIfLoggedIn();
    if (isLoggedIn) {
      setRendered(
                    <Home
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                    />
                    )
    } else setRendered(<SignIn { ...{isLoggedIn, setIsLoggedIn }} />)
  }, [isLoggedIn])
  return (
    <div>
      {/* <button onClick={(): void=> setIsLoggedIn(!isLoggedIn)} >isLoggedIn</button>*/}
      {rendered}
    </div>
  );
};

export default Routes;
