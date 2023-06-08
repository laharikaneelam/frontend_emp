// import "./login.scss"
import React ,{ Fragment, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import classes from './login.module.scss';
import logo from '../../assets/logo.png';
import classes from './Login.module.scss';
// import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import AuthContext from '../../Store/auth-context';
import axios from 'axios';

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useNavigate();
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryEmailOtp, setRecoveryEmailOtp] = useState('');
  // const recoveryEmailOtp = useRef('');
  const [errorv, setError] = useState('');
  const [forgot_pwd, setforgot_pwd] = useState(true);
  const [Active_btn, setActive_btn] = useState('login');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [recoverySucess, setRecoverySucess] = useState(false);
  const [recoveryEmailForOtp, setRecoveryEmailForOtp] = useState('');
  const [otpVerify, setOtpVerify] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const clickedButtonHandler = (name) => {
    setActive_btn(name);
  };
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

  const recoveryEmailChangeHandler = (event) => {
    setRecoveryEmail(event.target.value);
  };

  const recoveryEmailOtpChangeHandler = (event) => {
    setRecoveryEmailOtp(event.target.value);
  };

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    // alert(enteredEmail);
    event.preventDefault();
    // setEmailIsValid(enteredEmail.includes('@'));
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    
    // const EnterRecoveryEmail=recoveryEmail.current.value;
    // const EnterRecoveryEmailOtp=recoveryEmailOtp.current.value;
    if(enteredEmail.includes('@') && (enteredPassword.trim().length > 6) && formIsValid){
    // if(emailIsValid && passwordIsValid && formIsValid){
      const data_innfo={
        email: enteredEmail,
        password: enteredPassword,
      }
      axios({
          method: "post",
          url: process.env.REACT_APP_LOGIN_KEY,
          headers: { "content-type": "application/json" },
          data: data_innfo
      })
      .then(result => {
          // alert(result.data);
        if(result.data.message===''){
          const expirationTime = new Date(
            new Date().getTime() + +5000 * 1000
          );
          authCtx.login(result.data.idToken, result.data.userName, result.data.userType, expirationTime.toISOString());
          // history('/users');
          history('/');
          setError('');
        }else{
          setError(result.data.message);
        }

      })
    }
  }
  const ResetHandler = (event) => {
    // alert(recoveryEmail);
    event.preventDefault();
    if(recoveryEmail){
      if(!recoveryEmail.includes('@')){
        alert("Enter valid email Address");
      }else{
        const data_innfo_V={
          re_email: recoveryEmail,
        }
        axios({
            method: "post",
            url: process.env.REACT_APP_RECOVERY_MAIL_CHCK,
            headers: { "content-type": "application/json" },
            data: data_innfo_V
        })
        .then(result => {
            // alert(result.data);
            // console.log(result.data);
          if(result.data[0].error==='Success'){
            setError(result.data[0].message);
            setRecoverySucess(true);
            setRecoveryEmailForOtp(recoveryEmail);
            setRecoveryEmail('');
            setError('');
          }else{
            setError(result.data[0].message);
          }
    
        })
      }
    }
  }
  const OtpVerifyHandler = (event) => {
    // alert(enteredEmail);
    event.preventDefault();
   if(recoveryEmailOtp){
      if(recoveryEmailOtp.trim().length < 8){
        setError('Entered otp is not valid');
      }else{
        const data_innfo_V={
          re_email: recoveryEmailForOtp,
          verify_otp: recoveryEmailOtp,
        }
        // console.log(data_innfo_V);
        axios({
            method: "post",
            url: process.env.REACT_APP_OTP_VERIFY_CHCK,
            headers: { "content-type": "application/json" },
            data: data_innfo_V
        })
        .then(result => {
            // alert(result.data.message);
            // console.log(result.data);
          if(result.data[0].error==='Success'){
            setError(result.data[0].message);
            setRecoverySucess(false);
            setOtpVerify(true); 
            setRecoveryEmailOtp('');
            setError('');
          }else{
            setError(result.data[0].message);
          }
    
        })
      }
    } 
  }
  const NewPasswordHandler = (event) => {
    // alert(enteredEmail);
    event.preventDefault();
    if(newPassword){
      if(newPassword.trim().length < 8){
        setError('Entered password is not valid');
      }else{
        const data_innfo_V2={
          email: recoveryEmailForOtp,
          password: newPassword,
        }
        // console.log(data_innfo_V2);
        axios({
            method: "post",
            url: process.env.REACT_APP_CHNG_PSWRD_CHCK,
            headers: { "content-type": "application/json" },
            data: data_innfo_V2
        })
        .then(result => {
            // alert(result.data.message);
            // console.log(result.data);
          if(result.data[0].error==='Success'){
            alert(result.data[0].message);
            // const expirationTime = new Date(
            //   new Date().getTime() + +5000 * 1000
            // );
            // authCtx.login(result.data.idToken, expirationTime.toISOString());
            history('/');
            clickedButtonHandler('login');
            setError(result.data[0].message);
            setRecoverySucess(false);
            setOtpVerify(false);
            setError('');
          }else{
            setError(result.data[0].message);
          }
    
        })
      }
    } 
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
                <button onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('login')}} className={`${Active_btn==='login' ? classes.l_form_heder_butn_Actv : ''}`}>Login</button>
                <button onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('reset')}} className={`${Active_btn==='reset' ? classes.l_form_heder_butn_Actv : ''}`}>Reset Password</button>
              </div>
              
              {Active_btn==='login' &&
                <Fragment>
                  <form className={classes.l_form}  onSubmit={submitHandler}>
                    <div>
                      <input type="text"  id="email" value={enteredEmail} onChange={emailChangeHandler} onBlur={validateEmailHandler}  maxLength='250' className={`${classes.inputText} ${ emailIsValid === false ? classes.invalid : '' }`} required/>
                      <label className={classes.floating_label}>
                        User ID*
                      </label>
                      <span className={classes.inpt_icon}><AiOutlineUser/></span>
                    </div>
                    <div>
                      <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}  minLength='6' maxLength='25' className={`${classes.inputText} ${ passwordIsValid === false ? classes.invalid : '' }`} required/>
                      <label className={classes.floating_label}>
                        Password*
                      </label>
                      <span className={classes.inpt_icon}><IoKeyOutline/></span>
                    </div>
                    {errorv!='' && <p className={classes.erorror}>{errorv}</p>}
                    <div>
                        <button onClick={{validateEmailHandler, validatePasswordHandler}}>Login</button>
                    </div>
                  </form>
                </Fragment>
              }
              {Active_btn==='reset' &&
                <Fragment>
                  {(!recoverySucess && !otpVerify) && (
                    <Fragment>
                      <form className={classes.l_form} onSubmit={ResetHandler}>
                        <div>
                          <div className={classes.code_snt}>Code sent to</div>
                        </div>
                        <div>
                          <input type="text" value={recoveryEmail} onChange={recoveryEmailChangeHandler}  className={classes.inputText} required/>
                          <label className={classes.floating_label}>
                            Enter Recovery Email*
                          </label>
                          <span className={classes.inpt_icon}><HiOutlineMail/></span>
                        </div>
                        <div className={classes.forgot_button}>
                            <button className={`${classes.cncl_btn} mt-5`} onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('login')}}>Cancel</button>
                            <button className="mt-5">Continue</button>
                        </div>
                      </form>
                    </Fragment>
                  )}
                  {(recoverySucess && !otpVerify) &&  (
                    <Fragment>
                      <form className={classes.l_form}  onSubmit={OtpVerifyHandler}>
                        <div>
                          <div className={classes.code_snt}>Please check your registered e-mail for an 8 digit code.</div>
                        </div>
                        <div>
                          <input type="number" value={recoveryEmailOtp} onChange={recoveryEmailOtpChangeHandler} className={classes.inputText} required/>
                          {/* <label className={classes.floating_label}>
                            Enter Recovery Email*
                          </label> */}
                          <span className={classes.inpt_icon}><RiLockPasswordLine/></span>
                        </div>
                        <div className={classes.forgot_button}>
                            <button className={`${classes.cncl_btn} mt-5`} onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('login')}}>Cancel</button>
                            <button className="mt-5">Continue</button>
                        </div>
                      </form>
                    </Fragment>
                  )}
                  {(!recoverySucess && otpVerify) && (
                    <Fragment>
                      <form className={classes.l_form}  onSubmit={NewPasswordHandler}>
                        <div>
                          <div className={classes.code_snt}>Choose a new password. A strong password has at least eight characters and has a  combination of letters, digits, and special characters. </div>
                        </div>
                        <div>
                          <input type="password" minLength='8' value={newPassword} onChange={newPasswordChangeHandler} className={classes.inputText} required/>
                          {/* <label className={classes.floating_label}>
                            Enter Recovery Email*
                          </label> */}
                          <span className={classes.inpt_icon}><RiLockPasswordLine/></span>
                        </div>
                        <div className={classes.forgot_button}>
                            <button className={`${classes.cncl_btn} mt-5`} onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('login')}}>Cancel</button>
                            <button className="mt-5">Continue</button>
                        </div>
                      </form>
                    </Fragment>
                  )}
                  {errorv!='' && <p className={classes.erorror}>{errorv}</p>}
                  {/* <div className={classes.forgot_button}>
                      <button className={`${classes.cncl_btn} mt-5`} onClick={() => {setforgot_pwd(!forgot_pwd); clickedButtonHandler('login')}}>Cancel</button>
                      <button className="mt-5">Continue</button>
                  </div> */}
                </Fragment>
              }
              {/* </form> */}
            </div>
          </div>
      </div>
    </Fragment>
  )
}

export default Login