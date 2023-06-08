import React, { useState, useEffect, useCallback } from 'react';
import {Navigate} from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
// import { useNavigate } from 'react-router-dom';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  User_Name: '',
  User_Role: '',
  login: (token, User_Name, User_Role) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = secureLocalStorage.getItem('token');
  const storedUserName = secureLocalStorage.getItem('User_Name');
  const storedUserRole = secureLocalStorage.getItem('User_Role');
  const storedExpirationDate = secureLocalStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('User_Name');
    secureLocalStorage.removeItem('User_Role');
    secureLocalStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    UserName: storedUserName,
    UserRole: storedUserRole,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
//   const history = useNavigate();
  
  let initialToken;
  let initialUser;
  let initialRole;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUser= tokenData.UserName;
    initialRole= tokenData.UserRole;
  }

  const [token, setToken] = useState(initialToken);
  const [usrName, setUsrName] = useState(initialUser);
  const [usrRle, setUsrRle] = useState(initialRole);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    //   alert('10');
    setToken(null);
    setUsrName(null);
    setUsrRle(null);
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('User_Name');
    secureLocalStorage.removeItem('User_Role');
    secureLocalStorage.removeItem('expirationTime');
    <Navigate to='/' />
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // history('/users')
  }, []);

  const loginHandler = (token, user_name, user_role, expirationTime) => {
      // alert(user_name);
    setToken(token);
    setUsrName(user_name);
    setUsrRle(user_role);
    secureLocalStorage.setItem('token', token);
    secureLocalStorage.setItem('User_Name', user_name);
    secureLocalStorage.setItem('User_Role', user_role);
    secureLocalStorage.setItem('expirationTime', expirationTime);
    const user_detailsss={
      token,
      user_name,
      user_role,
      expirationTime
    }
    // console.log(user_detailsss);
    secureLocalStorage.setItem('user_detailsss', user_detailsss);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
    //   console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    User_Name:usrName,
    User_Role:usrRle,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;