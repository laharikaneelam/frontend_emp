import { NavLink } from "react-router-dom";
// import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
// import { FaBars} from "react-icons/fa";
import { BiChevronLeft} from "react-icons/bi";
import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { MdLogout} from "react-icons/md";
// import { MdLogout, MdOutlineDashboardCustomize } from "react-icons/md";
// import { AiFillHeart, AiTwotoneFileExclamation, AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";

import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import logo from '../../assets/logo.png';
// import classes from "*.module.css";
import Navbar from '../navbar/Navbar';
import classes_2 from './sideBar.module.scss';
import authcontextx from '../../Store/auth-context';


const SideBar = ({ children }) => {
  const authCtx = useContext(authcontextx);
  let Role_v=authCtx.User_Role;
  const routes = [
    // {
    //   path: "/",
    //   name: "Dashboard",
    //   icon: <FaHome />,
    // },
    // {
    //   path: "/users",
    //   name: "Users",
    //   icon: <FaUser />,
    // },
    // {
    //   path: "/messages",
    //   name: "Messages",
    //   icon: <MdMessage />,
    // },
    // {
    //   path: "/analytics",
    //   name: "Analytics",
    //   icon: <BiAnalyse />,
    // },
    // {
    //   path: "/Central Cockpit",
    //   name: "Central Cockpit",
    //   icon: '',
    //   exact: true,
    //   subRoutes: [
    //     {
    //       path: "/Dashboard",
    //       name: "Dashboard",
    //       icon: <MdOutlineDashboardCustomize />,
    //       bgColor: "#c2e9f9",
    //       txtColor: "#00b8ff",
    //     },
    //     {
    //       path: "/Employee",
    //       name: "Employee",
    //       icon: <MdOutlineDashboardCustomize />,
    //       bgColor: "#c2e9f9",
    //       txtColor: "#00b8ff",
    //     },
    //   ],
    // },
    {
      path: "/Central Cockpit",
      name: "Central Cockpit",
      icon: '',
      exact: true,
      Role: '',
      subRoutes: [
        {
          path: "/",
          name: "Dashboard ",
          icon: <RiDashboardLine />,
          bgColor: "rgb(159 25 25 / 20%)",
          txtColor: "#9f1919",
          Role: '',
        },
        {
          path: "/UserProfile", 
          name: "UserProfile ",
          icon: <ImProfile />,
          bgColor: "rgb(79 207 26 / 20%)",
          txtColor: "rgb(79 207 26)",
          Role: '',
        },
        {
          path: "/Directory",
          name: "Directory ",
          icon: <CgUserList />,
          bgColor: "rgb(3 18 197 / 20%)",
          txtColor: "rgb(3 18 197)",
          Role: '',
        },
        // {
        //   path: "/Projects",
        //   name: "Projects ",
        //   icon: <FaUser />,
        //   bgColor: "#c2e9f9",
        //   txtColor: "#00b8ff",
        // },
      ],
    },
    {
      path: "/Administration",
      name: "Administration",
      icon: '',
      exact: true,
      Role: 'Admin',
      subRoutes: [
        {
          path: "/Users",
          name: "Employee Management ",
          icon: <AiOutlineUsergroupAdd />,
          bgColor: "rgb(135 151 4 / 20%)",
          txtColor: "#879704",
          Role: 'Admin',
        },
        // {
        //   path: "/EmployeeList",
        //   name: "Employee",
        //   icon: <BiUserPin />,
        //   bgColor: "rgb(18 115 155 / 20%)",
        //   txtColor: "#12739b",
        //   Role: 'Admin',
        // },
        // {
        //   path: "/Users",
        //   name: "Users ",
        //   icon: <AiOutlineUsergroupAdd />,
        //   bgColor: "rgb(135 151 4 / 20%)",
        //   txtColor: "#879704",
        //   Role: 'SuperAdmin',
        // },
        {
          path: "/Organisation",
          name: "Organisation ",
          icon: <RiOrganizationChart />,
          bgColor: "rgb(132 10 225 / 20%)",
          txtColor: "#840ae1",
          Role: 'Admin',
        },
        // {
        //   path: "/Projects",
        //   name: "Projects ",
        //   icon: <FaUser />,
        //   bgColor: "#c2e9f9",
        //   txtColor: "#00b8ff",
        // },
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setisActive] = useState('/');
  const setisActiveandler =(e) =>{
    setisActive(e)
  }
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };
  return (
      <div className={classes_2.main_container}>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={classes_2.sidebar}
        >
          <div className="top_section">
            <AnimatePresence>
              {/* {isOpen && ( */}
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <img src={logo} style={ {width :`${(isOpen) ? '50%' : '100%'}`} } alt=""/>
                </motion.h1>
              {/* )} */}
            </AnimatePresence>
            <div className="bars">
              <span>
                <BiChevronLeft  className={`${!isOpen && "rotate-180"}`}  onClick={toggle} />
              </span>
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if(route.Role ==='' || (route.Role ===Role_v || Role_v==='SuperAdmin')){
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    id={index}
                    isActive={isActive}
                    setisActiveandler={setisActiveandler}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  id={index}
                  className="link as"
                  title={route.name}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text link_text_m"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            }
            })}
            <button className={classes_2.logout_button} onClick={logoutHandler}> <MdLogout /> {isOpen && 'Logout'}</button>
          </section>
        </motion.div>
        <main>
          <div className={classes_2.main_content} style={{marginLeft: isOpen ? "200px" : "60px", width: isOpen ? ((window.innerWidth-240)+"px") : ((window.innerWidth-100)+"px")}}>
            <Navbar />
            {children}
          </div>
        </main>
      </div>
  );
};

export default SideBar;
