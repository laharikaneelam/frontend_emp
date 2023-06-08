import React, { useReducer } from 'react';
import {Fragment, useState} from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from '../Employee/EmployeeForm.module.scss';
// import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
import { ImOffice }  from "react-icons/im";
import { BsFillTelephoneFill }  from "react-icons/bs";
import { MdEmail }  from "react-icons/md";
import { BiArrowBack }  from "react-icons/bi";
import { FiCheck }  from "react-icons/fi";
import { AiOutlineClose }  from "react-icons/ai";
import { GrLinkNext }  from "react-icons/gr";


const initialState = {
    name: '',
    midle_name: '',
    last_name: '',
    oficl_email: '',
    phone_no: '',
    isValid: true,
    errors: {},
  };
  
const reducer = (state, action) => {
    console.log(state.errors);
switch (action.type) {
    case 'SET_NAME':
    return { ...state, name: action.payload };
    case 'SET_MIDLE_NAME':
    return { ...state, midle_name: action.payload };
    case 'SET_LAST_NAME':
    return { ...state, last_name: action.payload };
    case 'SET_OFICL_EMAIL':
        return { ...state, oficl_email: action.payload };
    case 'SET_PHONE_NO':
        return { ...state, phone_no: action.payload };
    case "SET_ERRORS":
        // console.log( ...state.errors);
        return {
            ...state,
            errors: {
                [action.fieldName]: action.error,
            },
           
        };
    case "RESET":
        return initialState;
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

  

const EmployeeForm = (props) =>{
    const [value, setValue] = React.useState('Mandatory Info');
    // const [readonly, setReadonly] = useState(true);
    // // const setReadonlyHandler = () =>{
    // //     setReadonly(true);
    // // }
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, midle_name, last_name, oficl_email, phone_no } = state;
    console.log(name.length);
    const errors = {};
    if (name.length===0) {
        errors.name = "Name is required";
    }
    if (!state.midle_name) {
        errors.midle_name = "Middle Name is required";
    }
    if (!state.last_name) {
        errors.last_name = "Last Name is required";
    }
    if (!state.oficl_email) {
        errors.oficl_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.oficl_email)) {
        errors.oficl_email = "Invalid email address";
    }
    if (!state.phone_no) {
        errors.phone_no = "Phone No is required";
    }
    //  console.log(errors);
    // if (!state.confirmPassword) {
    //     errors.confirmPassword = "Confirm Password is required";
    // } else if (state.password !== state.confirmPassword) {
    //     errors.confirmPassword = "Passwords don't match";
    // }

    // if (Object.keys(errors).length === 0) {
    //     // Submit form here
    //     console.log('test');
    //     dispatch({ type: "RESET" });
    // } else {
        // alert(errors);
        // console.log(errors);
        dispatch({ type: "SET_ERRORS", payload: errors });
        // console.log(state);
    // }
    // dispatch({ type: "SET_ERRORS", errors });
    
    // console.log(state);
    // const isValid = name.length > 0 && midle_name.length > 0 && last_name.length > 0 && oficl_email.length > 0 && phone_no.length > 0;
    // dispatch({ type: 'SET_VALIDATION', payload: isValid });
    // if(isValid){
    //     setValue('Optional Info');
    // }
  };
    //   const ariaLabel = { 'aria-label': 'description' };
    return (
        <Fragment>
            <div className={classes.emp_frm_main}>
                <div className="row">
                    {/* <div className={classes.user_profile_img}></div> */}
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <div className={classes.user_profile_img}>
                            <div className={classes.usr_p_img}>
                                <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="image" />
                            </div>
                            <div className={classes.usr_detais}>
                                <div className={classes.ttle}>
                                    BI & EPM
                                </div>
                                <div className={classes.ttle_2}>
                                    02 - Associate
                                </div>
                                <div className={classes.ttle_3}>
                                    <div><ImOffice /> Registered Office</div>
                                    <div><BsFillTelephoneFill /> 7894561230</div>
                                    <div><MdEmail /> Test@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className={classes.user_name}>Onboarding New Employee</div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    {/* <TabList value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example"> */}
                                    <TabList onChange={handleChange}>
                                        <Tab label="Mandatory Info" value="Mandatory Info" className={classes.emp_frm_tab}/>
                                        <Tab label="Optional Info" value="Optional Info"  className={classes.emp_frm_tab}/>
                                    </TabList>
                                </Box>
                                
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Mandatory Info">
                                    <section>
                                        <header>
                                            Mandatory Info
                                            {/* <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button> */}
                                        </header>
                                        <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                        >
                                            <div className={classes.emp_frm_tab_cnt_val}>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">First Name</label><Input defaultValue="" name="name" value={state.name} onChange={handleInputChange}  />
                                                        {state.errors.name && (
                                                            <span className="error">{state.errors.name}</span>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Middle Name</label><Input defaultValue="" name="midle_name" value={state.midle_name} onChange={handleInputChange}  />
                                                        {state.errors.midle_name && (
                                                            <span className="error">{state.errors.midle_name}</span>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Last Name</label><Input defaultValue="" name="last_name" value={state.last_name} onChange={handleInputChange}  />
                                                        {state.errors.last_name && (
                                                            <span className="error">{state.errors.last_name}</span>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Official Email ID</label><Input defaultValue="" type="email" name="oficl_email" value={state.oficl_email} onChange={handleInputChange}  />
                                                        {state.errors.oficl_email && (
                                                            <span className="error">{state.errors.oficl_email}</span>
                                                        )}
                                                    </div> 
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Phone Number</label><Input defaultValue="" name="phone_no" value={state.phone_no} onChange={handleInputChange}  />
                                                        {state.errors.phone_no && (
                                                            <span className="error">{state.errors.phone_no}</span>
                                                        )}
                                                    </div>
                                                    {/* <div className="col-sm-4">
                                                        <label htmlFor="">Date Of Joining</label><Input type="date" defaultValue="" name="DOJ" value={state.DOJ} onChange={handleInputChange} />
                                                    </div> */}
                                                    <div className="col-sm-12">
                                                    {/* disabled={!state.isValid} */}
                                                        <button type='submit' className="float-end" >NEXT <BiArrowBack style={{transform: 'rotate(180deg)'}}/></button>
                                                        <button type="button" className="float-end btn_cncel" ><AiOutlineClose />Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </section>
                                </TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Optional Info">
                                <section>
                                        <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        >
                                            <header>
                                                Personal
                                                {/* <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button> */}
                                            </header>
                                            <div className={classes.emp_frm_tab_cnt_val}>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Date Of Joining</label><Input type="date" defaultValue="" name="DOJ" value={state.DOB} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div>
                                                            <label htmlFor="">Gender</label>
                                                        </div>
                                                        <label htmlFor=""><input type="radio" name="gender" value="M"  value={state.gender} onChange={handleInputChange} /> Male</label>
                                                        <label style={{marginLeft : '15px'}} htmlFor=""><input type="radio" name="gender" value="F" value={state.gender} onChange={handleInputChange} /> Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <header>
                                                Work
                                            </header>
                                            <div className={classes.emp_frm_tab_cnt_val}>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Employee ID</label>
                                                        <Input type="text" name="emp_id" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Department</label>
                                                        <Input type="text" name="department" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Sub Department</label>
                                                        <Input type="text" name="sub_department" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Designation</label>
                                                        <Input type="text" name="designation" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Job Title</label>
                                                        <Input type="text" name="designation" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Reporting Manager</label>
                                                        <Input type="text" name="designation" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Work Location</label><Input type="text" name="martial_status" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Employee Type</label><Input type="text" name="martial_status" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Probition Period</label><Input type="text" name="blood_group" defaultValue=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <header>
                                                Salary Details
                                            </header>
                                            <div className={classes.emp_frm_tab_cnt_val}>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">CTC</label>
                                                        <Input type="text" name="ctc" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Account Holder's Name</label>
                                                        <Input type="text" name="acnt_hldr_name" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Bank Name</label>
                                                        <Input type="text" name="bnk_name" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">City</label>
                                                        <Input type="text" name="bnk_city" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Branch Name</label>
                                                        <Input type="text" name="bnk_branch" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">IFSC Code</label>
                                                        <Input type="text" name="bnk_ifsc" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Account Number</label><Input type="text" name="bnk_act_no" defaultValue=""  />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <button type='submit' className="float-end" disabled={!state.isValid}><FiCheck />Save</button>
                                                        <button type="button"  onClick={() => setValue('Mandatory Info')} className="float-end btn_cncel" disabled={!state.isValid}><BiArrowBack /> Back</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </section>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                    {/* <div className="col-sm-1"></div> */}
                </div>
            </div>
      </Fragment>
    );
}
export default EmployeeForm;