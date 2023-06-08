import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from './components/Login/Login';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DirectoryPage from "./pages/DirectoryPage";
import Projects from "./pages/Projects";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import EmployeePage from "./pages/EmployeePage";
import AddEmployeePage from "./pages/AddEmployeePage";
import OrganizationPage from './pages/OrganizationPage';
import UserFormPage from './pages/UserFormPage';
import AddOrganisationPage from './pages/AddOrganisationPage';
import ChangesPswrd from './pages/ChangesPswrd';
import UserDirectoryPage from './pages/UserDirectoryPage';
import UserProfilePage from './pages/UserProfilePage';
//import MyComponent from './components/MyComponent';

import {useState, useContext, Fragment } from 'react';
import AuthContext from './Store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const storedPermission=localStorage.getItem('IsLoggedIn');
  // if(storedPermission==='1'){
  //   setIsLoggedIn(true);
  // }
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // localStorage.setItem('IsLoggedIn', '1');
    setIsLoggedIn(true);
  };

  // const logoutHandler = () => {
  //   localStorage.removeItem('IsLoggedIn');
  //   setIsLoggedIn(false);
  // };
  // console.log(authCtx.isLoggedIn);
  return (
  //  <div><MyComponent /></div>

    <Router>

        {!authCtx.isLoggedIn && (
          <Routes>
            <Route  path="/" element={<Login onLogin={loginHandler} />} />
            <Route  path="/Register/:id" element={<Register />} />
            <Route  path="*" element={<Navigate to='/' />} />
          </Routes>
        )}
        {authCtx.isLoggedIn && (
          <SideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Directory" element={<DirectoryPage />} />
            <Route path="/UserProfile" element={<UserProfilePage />} />

            {(authCtx.User_Role==='Admin' || authCtx.User_Role==='SuperAdmin') && (
              <Fragment>
                <Route path="/users" element={<Users />} />
                <Route path="/Organisation" element={<OrganizationPage />} />
                <Route path="/Organisation/AddOrganisation/:id" element={<AddOrganisationPage />} />
                <Route path="/Organisation/AddOrganisation" element={<AddOrganisationPage />} />
                <Route path="/EmployeeList" element={<EmployeePage />} />
                <Route path="/Employee/EmployeeInfo/:id" element={<AddEmployeePage />} />
                <Route path="/UserDirectory/:id" element={<UserDirectoryPage />} />
                <Route path="/UserForm/AddEmployee2" element={<UserFormPage />} />
              </Fragment>
            )}
            {/* {(authCtx.User_Role==='Super_Admin') && (
              <Fragment>
                <Route path="/users" element={<Users />} />
                <Route path="/Organisation" element={<OrganizationPage />} />
                <Route path="/Organisation/AddOrganisation/:id" element={<AddOrganisationPage />} />
                <Route path="/Organisation/AddOrganisation" element={<AddOrganisationPage />} />
                <Route path="/EmployeeList" element={<EmployeePage />} />
                <Route path="/Employee/AddEmployee" element={<AddEmployeePage />} />
              </Fragment>
            )} */}
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Profile" element={<UserPage />} />

            <Route path="/ChangePassword" element={<ChangesPswrd />} />
            <Route path="/Logout" element={<Logout />} />
            <Route  path="*" element={<Navigate to='/' />} />
          </Routes>
          </SideBar>
        )}


    </Router>
  );
}
export default App;
