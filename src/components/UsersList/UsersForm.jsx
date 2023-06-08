import { Fragment, useRef, useState, useEffect } from "react";
import classes from './UsersForm.module.scss';
import LiveSearchDropDown from '../LiveSearch/LiveSearchDropDown';
import swal from 'sweetalert';
import axios from 'axios';
import switch_class from '../Uni_Comp/Switch.module.scss';
const UsersForm = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Send');
    const [row_id, setRow_ID] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailIdRef = useRef();
    const [usr_type, setUsr_type]=useState('Admin'); // Apply Periodic
    const [usr_status, setUsr_status]=useState(''); // Apply Periodic
    const usr_typeHandler = (event) =>{
        setUsr_type(event.target.value);
    }

    useEffect(() => {
        if(props.editedID!==''){
            // console.log(props.editedID);
            setbtn_name('Update');
            // firstNameRef.current.value= props.editedID.row_id;
            firstNameRef.current.value=props.editedID.first_name;
            lastNameRef.current.value=props.editedID.last_name;
            emailIdRef.current.value=props.editedID.usr_emailID;
            // usr_type.current.value=props.editedID.usr_role;
            setUsr_type(props.editedID.usr_role);
            setUsr_status(props.editedID.usr_status);
            setRow_ID(props.editedID.row_id);
            setOrg_name(props.editedID.cmp_name);
            setUsr_remarks(props.editedID.usr_remarks);
            // firstNameRef=props.editedID.usr_status;
        }
    }, [])


    const submitHandler =(event) =>{
        event.preventDefault();
        // if(org_name===''){
        //     alert('Organisation is required')
        //     return;
        // }
        if(gst_swith==='Y'){
            if(user_excel){
                const data_innfo={
                    // usr_type: usr_type,
                    // cmp_name: org_name,
                    excel_doc : user_excel,
                    multi_users : gst_swith,
                    dd_up: btn_name,
                }
                console.log(data_innfo);
                axios({
                    method: "post",
                    url: process.env.REACT_APP_BULK_USERS_IMPORT,
                    headers: { "content-type": "multipart/form-data" },
                    data: data_innfo
                })
                .then(result => {
                    console.log(result.data);
                    // alert(result.data.sent);
                    swal({
                        // title: "Success",
                        // text: result.data.sent,
                        // icon: "success",
                        title: result.data.msg_type,
                        text: result.data.sent,
                        // icon: result.data.msg_type.toLowerCase(),
                    });
                    props.onAddRow('1');
                    props.onChange('');
                    // console.log(result.data.sent);
                })
                .catch(error => console.log(error.message));
                
            }else{
                alert("Enter all mandatory fileds")
            }
        }else{
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
            if(usr_type==='Inactive' && usr_remarks===''){
                alert('Reason For Inactive.')
                return;
            }
            if(enteredfirstNameRef && enteredlastNameRef && enteredemailIdRef && enteredemailIdRef.includes('@') && usr_type){
                const data_innfo={
                    row_id: row_id,
                    firstName: enteredfirstNameRef,
                    lastName: enteredlastNameRef,
                    emailId: enteredemailIdRef,
                    usr_type: usr_type,
                    usr_status: usr_status,
                    cmp_name: org_name,
                    usr_remarks: usr_remarks,
                    multi_users : gst_swith,
                    dd_up: btn_name,
                }
                // console.log(data_innfo);
                axios({
                    method: "post",
                    url: process.env.REACT_APP_INSR_KEY,
                    headers: { "content-type": "application/json" },
                    data: data_innfo
                })
                .then(result => {
                    // console.log(result.data);
                    // alert(result.data.sent);
                    swal({
                        // title: "Success",
                        // text: result.data.sent,
                        // icon: "success",
                        title: result.data.msg_type,
                        text: result.data.sent,
                        // icon: result.data.msg_type.toLowerCase(),
                    });
                    props.onAddRow('1');
                    props.onChange('');
                    // console.log(result.data.sent);
                })
                .catch(error => console.log(error.message));
                
            }else{
                alert("Enter all mandatory fileds")
            }
        }
        
        // console.log(usr_type);
    }
    function onChangeValue(event) {
        setUsr_status(event.target.value);
        // console.log(event.target.value);
    }
    const setinputID = (event) =>{
        setshowResultList(event);
    }
    const [showResultList, setshowResultList]=useState('');
    const [idV, setIdV]=useState(''); // getting data api
    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
        }
        axios({
        method: "post",
        url: process.env.REACT_APP_ORGN_DROP_KEY,
        headers: { "content-type": "application/json" },
        data: data_innfo
        })
        .then(result => {
            // setRows(result.data);
            setIdV(result.data);
            // console.log(result.data);
        })
    }, [])
    const [org_name, setOrg_name]=useState(''); // Account Identifier
    const setAcnt_Org_Vallues = (event) =>{
        // console.log(this.id)
        setOrg_name(event.target.value);
        setShowResults(true);
    }
    const listsetAcnt_idntHandler =(event) =>{
        setShowResults(false);
        setOrg_name(event);
    }

    const [user_excel, setUser_excel] = useState('');
    const user_excel_Handler =(event) =>{
        // console.log(event.target.files);
        // setLogo_img(event.target.files[0]['name']);
        setUser_excel(event.target.files[0]);
    }
    const [usr_remarks, setUsr_remarks]=useState('');
    const usr_remarks_Handler =(event) =>{
        // console.log(event.target.files);
        // setLogo_img(event.target.files[0]['name']);
        setUsr_remarks(event.target.value);
    }

    const [gst_swith, setGst_swith] = useState('Y');
    const gst_swith_handler =(event) =>{
        // console.log(event.target.value);
        // setLogo_img(event.target.files[0]['name']);
        // setGst_swith(event.target.value);
        if(event.target.checked)
        {
            setGst_swith('Y');
        }else{
            setGst_swith('N');
        }
    }
    return ( 
        <Fragment>
            <div>
                <form className={classes.l_form} onSubmit={submitHandler}>
                    <div className={classes.l_form_div}>
                        {/* {usr_status==='' &&
                            <div style={{width : '100%', marginBottom : '20px'}}>
                                <div style={{width : '50%', float : 'right'}}>
                                    <label style={{position : 'relative'}} htmlFor="">Multiple Users</label>
                                    <label  style={{position : 'relative'}} className={`float-end ${switch_class.switch}`} >
                                        <input className={switch_class['switch-input']} value={gst_swith} onChange={gst_swith_handler} type="checkbox" checked={`${gst_swith=='Y' ? 'checked' : ''}`} />
                                        <span className={switch_class['switch-label']} data-on="Yes" data-off="No"></span>
                                        <span className={switch_class['switch-handle']}></span>
                                    </label>
                                </div>
                            </div>
                        } */}
                        {(gst_swith == 'N') &&
                            <Fragment>
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
                                    <input type="email" id="email_id" className={classes.inputText} required  ref={emailIdRef} />
                                    <label className={classes.floating_label}>
                                    Email
                                    </label>
                                </div>
                                <div>
                                    <input type="text" id="organisation" className={classes.inputText} required  onChange={setAcnt_Org_Vallues} value={org_name}  onFocus={setAcnt_Org_Vallues} onClick={()=> setinputID('organisation')} />
                                    <label className={classes.floating_label}>
                                        Organisation
                                    </label> 
                                    {(showResults && showResultList==='organisation' && idV!=='') && (<LiveSearchDropDown listData={idV} setval={listsetAcnt_idntHandler} seach={org_name} onSelect={listsetAcnt_idntHandler}/>) }
                                </div>
                                <div>
                                    <select name="usr_type" id="usr_type" value={usr_type} onChange={usr_typeHandler}>
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                    <label className={classes.floating_label_no}>
                                        Role
                                    </label>
                                </div>
                            </Fragment>
                        }
                        {usr_status && <div onChange={onChangeValue}>
                            <label className={classes.in_label} htmlFor="status_y"><input type="radio" name="usr_status" value="Active" checked={usr_status==='Active'} id="status_y"/> Active</label>
                            <label className={classes.in_label} htmlFor="status_n"><input type="radio" name="usr_status" value="Inactive" checked={usr_status==='Inactive'} id="status_n"/> Inactive</label>
                            <label className={classes.floating_label_no_radio}>
                                Status
                            </label>
                        </div>}
                        {usr_status==='Inactive' && <div style={{width : '100%'}}>
                            <textarea id="last_name" maxLength='500' className={classes.inputText} required onChange={usr_remarks_Handler} onBlur={usr_remarks_Handler}>{usr_remarks}</textarea>
                            <label className={classes.floating_label_no}>
                             Reason For Inactive
                            </label>
                        </div>}
                        {(usr_status==='' && gst_swith == 'Y') && <div>
                            <input type="file"  id="users_buls" accept=".csv" onChange={user_excel_Handler} onBlur={user_excel_Handler} className={`${classes.inputText}`}  />
                            <label className={classes.floating_label_no}>
                                Bulk upload users
                            </label>
                        </div>}
                            {/* <div>
                                <input type="text"  id="usr_name" className={classes.inputText} required/>
                                <label className={classes.floating_label}>
                                Name
                                </label> 
                            </div>
                            <div>
                                <input type="email" id="usr_email" className={classes.inputText} required/>
                                <label className={classes.floating_label}>
                                Email
                                </label>
                            </div>
                            <div>
                                <input type="password" id="user_mbl" className={classes.inputText} required/>
                                <label className={classes.floating_label}>
                                Phone No.
                                </label>
                            </div>
                            <div>
                                <input type="password" id="user_jbttl" className={classes.inputText} required/>
                                <label className={classes.floating_label}>
                                Job Title
                                </label>
                            </div> */}
                            
                    </div>
                    <div>
                        {/* <button className="float-end">Send</button> */}
                        <button className="float-end">{btn_name}</button>
                    </div>
              </form>
            </div>
        </Fragment>
    )
}
export default UsersForm;