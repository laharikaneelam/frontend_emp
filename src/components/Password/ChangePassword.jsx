import { Fragment,  useState,  useContext } from "react";
import classes from './ChangePassword.module.scss';
import authcontextx from '../../Store/auth-context';
// import { IoKeyOutline } from "react-icons/io5";
import { CgPassword } from "react-icons/cg";
import {MdPassword} from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri";
import axios from 'axios';
const ChangePassword = (props) =>{
    const authCtx = useContext(authcontextx);
    const [row_id, setRow_ID] = useState('');
    const [errorv, setError] = useState('');
    const [formIsValid, setFormIsValid] = useState('');
    const [enteredNewPassword, setEnteredNewPassword] = useState('');
    const [NewpasswordIsValid, setNewpasswordIsValid] = useState('');

    const [re_enteredNewPassword, setRe_enteredNewPassword] = useState('');
    const [re_enteredNewPasswordIsValid, setRe_enteredNewPasswordIsValid] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordIsValid, setOldPasswordIsValid] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const oldPasswordChangeHandler =(event) =>{
        setOldPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length > 6 && NewpasswordIsValid && re_enteredNewPasswordIsValid
        );
    }

    const validOldPasswordChangeHandler =(event) =>{
        setOldPasswordIsValid(oldPassword.trim().length > 6);
    }

    const NewpasswordChangeHandler =(event) =>{
        setEnteredNewPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length > 6 && oldPasswordIsValid && re_enteredNewPasswordIsValid
        );
    }

    const validNewpasswordChangeHandler =(event) =>{
        // setNewpasswordIsValid(enteredNewPassword.trim().length > 6);
        if(enteredNewPassword.trim().length < 6){
            setNewpasswordIsValid(false);
            setError('New Password length should be > 6');
        }
        else if(enteredNewPassword.trim().length > 6 && (re_enteredNewPassword.trim().length > 0 && re_enteredNewPassword !== enteredNewPassword)){
            setNewpasswordIsValid(false);
            setError('New Password is not matching with the re-entered password.');
        }else{
            setNewpasswordIsValid(true);
            setError('');
        }
    }

    const ReNewpasswordChangeHandler =(event) =>{
        setRe_enteredNewPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length > 6 && oldPasswordIsValid && NewpasswordIsValid
        );
    }

    const validReNewpasswordChangeHandler =(event) =>{
        if(re_enteredNewPassword.trim().length < 6){
            setRe_enteredNewPasswordIsValid(false);
            setError('Re-Entered Password length should be > 6');
        }
        else if(re_enteredNewPassword.trim().length > 6 && re_enteredNewPassword !== enteredNewPassword){
            setRe_enteredNewPasswordIsValid(false);
            setError('Re-Entered Password is not matching with the new password.');
        }else{
            setRe_enteredNewPasswordIsValid(true);
            setError('');
        }
    }
    const submitHandler =(event) =>{
        event.preventDefault();
        // const enteredfirstNameRef = firstNameRef.current.value;
        // const enteredlastNameRef = lastNameRef.current.value;
        // const enteredemailIdRef = emailIdRef.current.value;

        if(formIsValid && oldPasswordIsValid && re_enteredNewPassword && enteredNewPassword){
            const data_innfo={
                row_id: authCtx.token,
                oldPswrd: oldPassword,
                NewPswrd: enteredNewPassword,
                dd_up: 'change_pswrd',
            }
            axios({
                method: "post",
                url: process.env.REACT_APP_USR_CHANGE_PASSWORD,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // authCtx.logout();
                if(result.data[0].error==='Success'){
                    alert(result.data[0].message);
                    authCtx.logout();
                }else{
                    alert(result.data[0].message);
                }
                // console.log(result.data);
                // alert(result.data.sent);
                // props.onAddRow('1');
                // props.onChange('');
                // console.log(result.data.sent);
            })
            .catch(error => console.log(error.message));
            
        }else{
            alert("All the inputs should be required")
        }
        
        // console.log(usr_type);
    }
    return (
        <Fragment>
            <div className={classes.change_password}>
                <form className={classes.l_form} onSubmit={submitHandler}>
                    <div className={classes.l_form_div}>
                        <div>
                            <input type="password"  id="old_password" className={`${classes.inputText} ${ oldPasswordIsValid === false ? classes.invalid : '' }`} required value={oldPassword} onChange={oldPasswordChangeHandler} onBlur={validOldPasswordChangeHandler}/>
                            <label className={classes.floating_label}>
                            Old Password
                            </label> 
                            <span className={classes.inpt_icon}><RiLockPasswordLine/></span>
                        </div>
                        <div>
                            <input type="password" id="password" minLength='6' maxLength='25' value={enteredNewPassword} onChange={NewpasswordChangeHandler}  onBlur={validNewpasswordChangeHandler} className={`${classes.inputText} ${ NewpasswordIsValid === false ? classes.invalid : '' }`} required/>
                            <label className={classes.floating_label}>
                            Password*
                            </label>
                            <span className={classes.inpt_icon}><MdPassword/></span>
                        </div>
                        <div>
                            <input type="password" id="re_password" minLength='6' maxLength='25' value={re_enteredNewPassword} onChange={ReNewpasswordChangeHandler} onBlur={validReNewpasswordChangeHandler} className={`${classes.inputText} ${ re_enteredNewPasswordIsValid === false ? classes.invalid : '' }`} required/>
                            <label className={classes.floating_label}>
                            Re-Enter Password*
                            </label>
                            <span className={classes.inpt_icon}><CgPassword/></span>
                        </div>
                    </div>
                    {errorv!=='' && <p className={classes.erorror}>{errorv}</p>}
                    <div>
                        <button className="float-end">Change Password</button>
                    </div>
                </form>
            </div>

        </Fragment>
    )
}
export default ChangePassword;