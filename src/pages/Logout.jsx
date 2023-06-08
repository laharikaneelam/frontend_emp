import authcontextx from '../Store/auth-context';
import {useContext,  useEffect} from "react";
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const history = useNavigate();
    const authCtx = useContext(authcontextx);
    // useEffect(() => {
    //     alert('1');
    history('/');
        authCtx.logout();
        
        // const authCtx = useContext(AuthContext);
    // }, [])
    // const logoutHandler = () => {
      
    //   // optional: redirect the user
    // };
//   return (
    
//   );
};

export default Logout;