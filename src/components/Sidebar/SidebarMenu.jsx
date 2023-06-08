import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import authcontextx from '../../Store/auth-context';

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen, txtColor, bgColor, isActive, setisActiveandler }) => {
  const authCtx = useContext(authcontextx);
  let Role_v=authCtx.User_Role;
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // const [isRActive, setisRActive] = useState('');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // setIsOpen(true);
  };
const setisRActive =(e) =>{
  // console.log(e);
  setisActiveandler(e);
}
  // useEffect(() => {
  //   if (!isOpen) {
  //     setIsMenuOpen(false);
  //   }
  // }, [isOpen]);
  return (
    <>
      <div className="menu" key={route.name} id={route.name} onClick={toggleMenu} style={{justifyContent: (isOpen ===true ? 'space-between' : 'center')}}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text link_text_n"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* {isOpen && ( */}
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -180,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        {/* )} */}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i)  => (
              ((subRoute.Role==='' || (subRoute.Role===Role_v || Role_v==='SuperAdmin')) &&
              <motion.div variants={menuItemAnimation} key={route.name+'_'+i} id={route.name+'_'+i} custom={i}>
                <NavLink title={subRoute.name} onClick={()=>setisRActive(subRoute.path)} to={subRoute.path} className="link" style={{backgroundColor: (isActive ===subRoute.path ? subRoute.bgColor : ''), color: (isActive ===subRoute.path ? subRoute.txtColor : '#836f6f'), boxShadow: `0px 0px 3px ${(isActive ===subRoute.path ? subRoute.txtColor : '#fff')}`}}>
                  <div className="icon" style={{color: subRoute.txtColor}}>{subRoute.icon}</div>
                  {isOpen && (
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                  )}
                </NavLink>
              </motion.div>)
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
