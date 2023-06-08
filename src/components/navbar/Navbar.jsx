import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsKey } from "react-icons/bs";
import authcontextx from '../../Store/auth-context';
// import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {
  const authCtx = useContext(authcontextx);
  const [showDropDown, setShowDropDown] = useState(false)
  return (
    <Fragment>
    {authCtx.isLoggedIn && 
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <div onClick={() => setShowDropDown(!showDropDown)}>
              <span className="usr_name">{authCtx.User_Name}</span> 
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
            {showDropDown && <div className="drop_down">
              <div class="card position-relative border-0">
                <div class="overflow-auto scrollbar">
                  <ul class="nav d-flex flex-column mb-2 pb-1">
                    {/* <li onClick={() => setShowDropDown(!showDropDown)} class="nav-item"><Link class="nav-link px-3" to='/Profile'> <CgProfile className="icon" style={{color : '#BE5050'}} />Profile</Link></li> */}
                    <li onClick={() => setShowDropDown(!showDropDown)} class="nav-item"><Link class="nav-link px-3" to='/ChangePassword'> <BsKey className="icon" style={{color : '#00bf4c'}} />Change Password</Link></li>
                  </ul>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
        }
    </Fragment>
  );
};

export default Navbar;
