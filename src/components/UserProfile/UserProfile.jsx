import { Fragment, useRef, useState, useEffect, useContext } from "react";
import classes from './UserProfile.module.scss';
// import { AiOutlineUser } from "react-icons/ai";
// import { HiOutlineMail } from "react-icons/hi";
import authcontextx from '../../Store/auth-context';
import axios from 'axios';
const UserProfile = (props) =>{
    const authCtx = useContext(authcontextx);
    // const [btn_name, setbtn_name] = useState('Send');
    const [row_id, setRow_ID] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailIdRef = useRef();
    // const [usr_type, setUsr_type]=useState('Admin'); // Apply Periodic
    // const [usr_status, setUsr_status]=useState('Active'); // Apply Periodic
    // const usr_typeHandler = (event) =>{
    //     setUsr_type(event.target.value);
    // }
    useEffect(() => {
        // alert('1');
        const data_innfo={
          dd_up: authCtx.token,
      }
        axios({
            method: "post",
            url: process.env.REACT_APP_USER_PROFILE_CHCK,
            headers: { "content-type": "application/json" },
            data: data_innfo
        })
        .then(result => {
            // alert(result.data);
            // setRows(result.data);
            if(result.data[0].row_id!=='')
            {
                setRow_ID(result.data[0].row_id);
                firstNameRef.current.value=result.data[0].first_name;
                lastNameRef.current.value=result.data[0].last_name;
                emailIdRef.current.value=result.data[0].usr_emailID;
            }else{
                alert('Authentication Error');
            }
            // console.log(result.data);
        })
    }, [])
    const submitHandler =(event) =>{
        event.preventDefault();
        const enteredfirstNameRef = firstNameRef.current.value;
        const enteredlastNameRef = lastNameRef.current.value;
        const enteredemailIdRef = emailIdRef.current.value;
        if(enteredfirstNameRef===''){
            alert('First Name is required')
            return;
        }
        if(enteredlastNameRef===''){
            alert('Last Name is required')
            return;
        }
        if(enteredemailIdRef===''){
            alert('Email Id is required')
            return;
        }
        if(!enteredemailIdRef.includes('@')){
            alert('Please check entered email ID.')
            return;
        }

        if(enteredfirstNameRef && enteredlastNameRef && enteredemailIdRef && enteredemailIdRef.includes('@')){
            const data_innfo={
                row_id: row_id,
                firstName: enteredfirstNameRef,
                lastName: enteredlastNameRef,
                emailId: enteredemailIdRef,
                // usr_type: usr_type,
                // usr_status: usr_status,
                dd_up: 'Update_profile',
            }
            axios({
                method: "post",
                url: process.env.REACT_APP_INSR_KEY,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                const expirationTime = new Date(
                    new Date().getTime() + +5000 * 1000
                  );
                const Userv=firstNameRef.current.value+ ' '+ lastNameRef.current.value;
                authCtx.login(authCtx.token, Userv, authCtx.User_Role, expirationTime);
                console.log(result.data);
                alert(result.data.sent);
                // props.onAddRow('1');
                // props.onChange('');
                // console.log(result.data.sent);
            })
            .catch(error => console.log(error.message));
            
        }else{
            alert("Account Identifier and Formula should be required")
        }
        
        // console.log(usr_type);
    }
    // function onChangeValue(event) {
    //     setUsr_status(event.target.value);
    //     // console.log(event.target.value);
    // }
    return (
        <Fragment>
            <div className={classes.user_profile_d}>
                <div className={classes.user_profile_img}>
                    <div className={classes.usr_p_img}>
                        <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="image" />
                    </div>
                    <div className={classes.usr_detais}>
                       <div className={classes.usr_p_name}>{authCtx.User_Name}</div>
                       <div className={classes.usr_p_role}>{authCtx.User_Role}</div>
                    </div>
                </div>
                <div>
                    <form className={classes.l_form} onSubmit={submitHandler}>
                        <div className={classes.l_form_div}>
                            <div>
                                <input type="text"  id="first_name" className={classes.inputText} required ref={firstNameRef} />
                                <label className={classes.floating_label}>
                                First Name
                                </label> 
                            </div>
                            <div>
                                <input type="text"  id="last_name" className={classes.inputText} required ref={lastNameRef} />
                                <label className={classes.floating_label}>
                                Last Name
                                </label> 
                            </div>
                            <div>
                                <input type="email" id="email_id" className={classes.inputText} required  ref={emailIdRef} readOnly />
                                <label className={classes.floating_label}>
                                Email
                                </label>
                            </div>
                        </div>
                        <div>
                            <button className="float-end">Update</button>
                        </div>
                </form>
                </div>
            </div>
        </Fragment>
    )
}
export default UserProfile;