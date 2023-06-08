// import "./login.scss"
import React ,{ Fragment, useState, useRef, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
// import classes from './login.module.scss';
import logo from '../../assets/logo.png';
import classes from './Register.module.scss';
// import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
// import { HiOutlineMail } from "react-icons/hi";
import axios from 'axios';

const RegiterForm = (props) => {
  const { id } = useParams();
  
  // console.log(id);
  const re_enteredPassword = useRef()
  const history = useNavigate();
  const [errorv, setError] = useState('');
  // const [forgot_pwd, setforgot_pwd] = useState(true);
  // const [Active_btn, setActive_btn] = useState('login');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  // const clickedButtonHandler = (name) => {
  //   setActive_btn(name);
  // };
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
 
  useEffect(() => {
    const data_innfo={
      uniq: id,
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_REGISTER_CHCK,
      headers: { "content-type": "application/json" },
      data: data_innfo
    })
    .then(result => {
        alert(result.data.message);
        // console.log(result.data[0].uniq);
      if(result.data[0].message===''){

        setEnteredEmail(result.data[0].uniq);

      }else{
        setError(result.data[0].message);
      }
    })
  }, [])

  const submitHandler = (event) => {
    // alert(event);
    event.preventDefault();
    const Enter_re_enteredPassword=re_enteredPassword.current.value;
    if(enteredPassword!==Enter_re_enteredPassword){
      setError('Password is not matching');
    }else{
      if(passwordIsValid && formIsValid && Enter_re_enteredPassword){
        const data_innfo={
          email: enteredEmail,
          password: Enter_re_enteredPassword,
        }
        axios({
          method: "post",
          url: process.env.REACT_APP_CHNG_PSWRD_CHCK,
          headers: { "content-type": "application/json" },
          data: data_innfo
        })
        .then(result => {
            // alert(result.data.message);
          if(result.data[0].error==='Success'){
            alert(result.data[0].message);
            // const expirationTime = new Date(
            //   new Date().getTime() + +5000 * 1000
            // );
            // authCtx.login(result.data.idToken, expirationTime.toISOString());
            history('/');
          }else{
            setError(result.data[0].message);
          }
        });
      }
    }
    // props.onLogin(enteredEmail, enteredPassword);
    // const expirationTime = new Date(
    //   new Date().getTime() + 5000 * 1000
    // );
    // authCtx.login('123323', expirationTime.toISOString());
    // history.replace('/');
    
    
  };
  
  return (
    <Fragment>
      <div className={classes.login}>
          <div className={classes.l_form_container}>
            <div className={classes.l_form}>
              <div className={classes.logo_img}>
                <img src={logo} alt=""/>
              </div>
              <div className={classes.l_form_heder_butn}>
                <button className={`${classes.l_form_heder_butn_Actv}`}>Register</button>
              </div>
              <form className={classes.l_form}  onSubmit={submitHandler}>
                <Fragment>
                  <div>
                    <input type="text"  id="email" value={enteredEmail} maxLength='250' onChange={emailChangeHandler} onBlur={validateEmailHandler} className={`${classes.inputText} ${ emailIsValid === false ? classes.invalid : '' }`} required readOnly/>
                    {/* <label className={classes.floating_label}>
                      User ID*
                    </label> */}
                    <span className={classes.inpt_icon}><AiOutlineUser/></span>
                  </div>
                  <div>
                    <input type="password" id="password" minLength='6' maxLength='25' value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} className={`${classes.inputText} ${ passwordIsValid === false ? classes.invalid : '' }`} required/>
                    <label className={classes.floating_label}>
                      Password*
                    </label>
                    <span className={classes.inpt_icon}><IoKeyOutline/></span>
                  </div>
                  <div>
                    <input type="password" id="re_password" minLength='6' maxLength='25' ref={re_enteredPassword} className={`${classes.inputText}`} required/>
                    <label className={classes.floating_label}>
                      Re-Enter Password*
                    </label>
                    <span className={classes.inpt_icon}><IoKeyOutline/></span>
                  </div>
                  {errorv!=='' && <p className={classes.erorror}>{errorv}</p>}
                  <div>
                      <button>Register</button>
                  </div>
                </Fragment>
              </form>
            </div>
          </div>
      </div>
    </Fragment>
  )
}

export default RegiterForm;