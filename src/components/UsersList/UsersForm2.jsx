import React, { useReducer } from 'react';
import {Fragment, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
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
import swal from 'sweetalert';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const initialState = {
    name: '',
    midle_name: '',
    last_name: '',
    oficl_email: '',
    phone_no: '',
    DOJ: '',
    gender: '',
    emp_id: '',
    department: '',
    sub_department: '',
    designation: '',
    job_title: '',
    reprt_mnger: '',
    wrk_loc: '',
    empl_type: '',
    prob_period: '',
    ctc: '',
    acnt_hldr_name: '',
    bnk_name: '',
    bnk_city: '',
    bnk_branch: '',
    bnk_ifsc: '',
    bnk_act_no: '', 
    Organisation: '',
    Role: '',
    isValid: false,
    errors: '',
  };
  
const reducer = (state, action) => {
    // console.log(action.errors);
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
        case 'SET_DOJ':
            return { ...state, DOJ: action.payload };
        case 'SET_GENDER':
            return { ...state, gender: action.payload };
        case 'SET_EMP_ID':
            return { ...state, emp_id: action.payload };
        case 'SET_DEPARTMENT':
            return { ...state, department: action.payload };
        case 'SET_SUB_DEPARTMENT':
            return { ...state, sub_department: action.payload };
        case 'SET_DESIGNATION':
            return { ...state, designation: action.payload };
        case 'SET_JOB_TITLE':
            return { ...state, job_title: action.payload };
        case 'SET_REPRT_MNGER':
            return { ...state, reprt_mnger: action.payload };
        case 'SET_WRK_LOC':
            return { ...state, wrk_loc: action.payload };
        case 'SET_EMPL_TYPE':
            return { ...state, empl_type: action.payload };
        case 'SET_PROB_PERIOD':
            return { ...state, prob_period: action.payload };
        case 'SET_CTC':
            return { ...state, ctc: action.payload };
        case 'SET_ACNT_HLDR_NAME':
            return { ...state, acnt_hldr_name: action.payload };
        case 'SET_BNK_NAME':
            return { ...state, bnk_name: action.payload };
        case 'SET_BNK_CITY':
            return { ...state, bnk_city: action.payload };
        case 'SET_BNK_BRANCH':
            return { ...state, bnk_branch: action.payload };
        case 'SET_BNK_IFSC':
            return { ...state, bnk_ifsc: action.payload };
        case 'SET_BNK_ACT_NO':
            return { ...state, bnk_act_no: action.payload };
        case 'SET_ORGANISATION':
            return { ...state, Organisation: action.payload };
        case 'SET_ROLE':
            return { ...state, Role: action.payload };
        case "SET_ERRORS":
            return {
                ...state,
                errors:  action.errors,
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
    const [idV, setIdV]=useState(''); // getting data api
    const [Orgvalue, setOrgValue] = React.useState({vl: '', name: ''});
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
    const defaultProps = {
        options: idV,
        getOptionLabel: (option) => option.name,
        // isOptionEqualToValue: (option, value) => option.name === value.name,
    };

    const history = useNavigate();
    const [value, setValue] = React.useState('Mandatory Info');
    // const [readonly, setReadonly] = useState(true);
    // // const setReadonlyHandler = () =>{
    // //     setReadonly(true);
    // // }
    const handleChange = (event, newValue) => {
        // if(newValue=='Optional Info'){
        //     mandatoryHandler();
        // }
        setValue(newValue);
      };


    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(`SET_${name.toUpperCase()}`);
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
        // dispatch({ type: "SET_ERRORS", errors });
        // mandatoryHandler(e);
    };

    const mandatoryHandler = (e) =>{
        e.preventDefault();
        const { name, midle_name, last_name, oficl_email, phone_no, isValid, Organisation, Role} = state;
        // console.log(name.length);
        const errors = {};
        if (name.length===0) {
            errors.name = "Name is required";
        }
        // if (!state.midle_name) {
        //     errors.midle_name = "Middle Name is required";
        // }
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
        if (Orgvalue.name.trim().length===0) {
            errors.Organisation = "Organisation is required";
        }
        if (!state.Role) {
            errors.Role = "Role is required";
        }
        if (Object.keys(errors).length  === 0) {
            // Submit form here
            dispatch({ type: "SET_ERRORS", errors });
            // dispatch({ type: 'SET_VALIDATION', payload: isValid });
            // if(isValid){
                setValue('Optional Info');
            // }
            
        } else {
            // alert(errors);
            // console.log(Orgvalue);
            dispatch({ type: "SET_ERRORS", errors });
            // console.log(state);
        }
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state);
    if(state.name.length > 0 && state.last_name.length > 0 && state.oficl_email.length > 0 && state.phone_no.length > 0){
        const data_innfo={
            first_name: state.name,
            middle_name: state.midle_name,
            last_name : state.last_name,
            oficl_email : state.oficl_email,
            phone_no: state.phone_no,
            DOJ: state.DOJ,
            gender: state.gender,
            emp_id: state.emp_id,
            department: state.department,
            sub_department: state.sub_department,
            designation: state.designation,
            job_title: state.job_title,
            reprt_mnger: state.reprt_mnger,
            wrk_loc: state.wrk_loc,
            empl_type: state.empl_type,
            prob_period: state.prob_period,
            ctc: state.ctc,
            acnt_hldr_name: state.acnt_hldr_name,
            bnk_name: state.bnk_name,
            bnk_city: state.bnk_city,
            bnk_branch: state.bnk_branch,
            bnk_ifsc: state.bnk_ifsc,
            bnk_act_no: state.bnk_act_no, 
            Organisation: Orgvalue.name, 
            Role: state.Role, 
            on_board_dd: 'Add_onboard',
        }
        // console.log(data_innfo);
        axios({
            method: "post",
            url: process.env.REACT_APP_ONBOARDING_INSR_KEY,
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
            if(result.data.msg_type=='Success'){
                history('/users');
                // dispatch({ type: `RESET`, payload: '' });
                // setValue('Mandatory Info');
            }
            // props.onAddRow('1');
            // props.onChange('');
            // console.log(result.data.sent);
        })
        .catch(error => console.log(error.message));
        
    }else{
        alert("Enter all mandatory fileds")
    }
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
                                        {/* <Tab label="Optional Info" value="Optional Info"  className={classes.emp_frm_tab}/> */}
                                    </TabList>
                                </Box>
                                <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                >
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Mandatory Info">
                                    <section>
                                        <header>
                                            Mandatory Info
                                            {/* <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button> */}
                                        </header>
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
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Organisation</label>
                                                        {/* <Autocomplete
                                                            {...defaultProps}
                                                            id="auto-highlight"
                                                            autoHighlight
                                                            renderInput={(params) => (
                                                            <TextField {...params} name="Organisation"  onChange={handleInputChange}  onBlur={handleInputChange} value={state.Organisation} variant="standard" />
                                                            )}
                                                        /> */}
                                                        {/* <Autocomplete
                                                            {...defaultProps}
                                                            id="auto-highlight"
                                                            autoHighlight
                                                            renderInput={(params) => (
                                                            <TextField {...params} name="Organisation" value={state.Organisation} onChange={handleInputChange}  onBlur={handleInputChange} variant="standard" />
                                                            )}
                                                        /> */} 
                                                        <Autocomplete
                                                            {...defaultProps}
                                                            id="controlled-demo"
                                                            value={Orgvalue}
                                                            onChange={(event, newValue) => {
                                                            setOrgValue(newValue);
                                                            }}
                                                            renderInput={(params) => (
                                                            <TextField {...params} onChange={handleInputChange}  onBlur={handleInputChange} value={state.Organisation} variant="standard" />
                                                            )}
                                                        />
                                                        {state.errors.Organisation && (
                                                            <span className="error">{state.errors.Organisation}</span>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="">Role</label>
                                                        {/* <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={state.Role}
                                                            defaultValue=""
                                                            name="Role"
                                                            onChange={handleInputChange}
                                                        >
                                                            <MenuItem value={`Admin`}>Admin</MenuItem>
                                                            <MenuItem value={`Staff`}>Staff</MenuItem>
                                                        </Select> */}
                                                        <select id="Role" name="Role" value={state.Role} onChange={handleInputChange}  onBlur={handleInputChange}>
                                                            <option value="">None</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="Staff">Staff</option>
                                                        </select>
                                                        {state.errors.Role && (
                                                            <span className="error">{state.errors.Role}</span>
                                                        )}
                                                    </div>
                                                    
                                                    {/* <div className="col-sm-4">
                                                        <label htmlFor="">Date Of Joining</label><Input type="date" defaultValue="" name="DOJ" value={state.DOJ} onChange={handleInputChange} />
                                                    </div> */}
                                                    <div className="col-sm-12">
                                                    {/* disabled={!state.isValid} */}
                                                        <button type='button' onClick={mandatoryHandler} className="float-end" >NEXT <BiArrowBack style={{transform: 'rotate(180deg)'}}/></button>
                                                        <button onClick={() => dispatch({ type: `RESET`, payload: '' })} type="button" className="float-end btn_cncel" ><AiOutlineClose />Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        {/* </Box> */}
                                    </section>
                                </TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Optional Info">
                                    <section>
                                        <header>
                                            Optional Info
                                        </header>
                                        <header>
                                            Personal
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
                                                    <label htmlFor="" style={{width: '100px', display: 'inline-block'}}><input type="radio" name="gender" value="M" onChange={handleInputChange} /> Male</label>
                                                    <label style={{marginLeft : '15px', width: '100px', display: 'inline-block'}} htmlFor=""><input type="radio" name="gender" value="F" onChange={handleInputChange} /> Female</label>
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
                                                    <Input type="text" name="emp_id" value={state.emp_id} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Department</label>
                                                    <Input type="text" name="department" value={state.department} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Sub Department</label>
                                                    <Input type="text" name="sub_department" value={state.sub_department} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Designation</label>
                                                    <Input type="text" name="designation" value={state.designation} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Job Title</label>
                                                    <Input type="text" name="job_title" value={state.job_title} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Reporting Manager</label>
                                                    <Input type="text" name="reprt_mnger" value={state.reprt_mnger} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Work Location</label><Input type="text" name="wrk_loc" value={state.wrk_loc} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Employee Type</label><Input type="text" name="empl_type" value={state.empl_type} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Probition Period</label><Input type="text" name="prob_period" value={state.prob_period} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                            </div>
                                        </div>
                                        <header>
                                            Salary Details
                                        </header>
                                        <div className={classes.emp_frm_tab_cnt_val}>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label htmlFor="">CTC</label>
                                                    <Input type="text" name="ctc" value={state.ctc} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-12">
                                                    <label htmlFor="">Account Holder's Name</label>
                                                    <Input type="text" name="acnt_hldr_name" value={state.acnt_hldr_name} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Bank Name</label>
                                                    <Input type="text" name="bnk_name" value={state.bnk_name} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">City</label>
                                                    <Input type="text" name="bnk_city" value={state.bnk_city} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Branch Name</label>
                                                    <Input type="text" name="bnk_branch" value={state.bnk_branch} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">IFSC Code</label>
                                                    <Input type="text" name="bnk_ifsc" value={state.bnk_ifsc} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Account Number</label><Input type="text" name="bnk_act_no" value={state.bnk_act_no} onChange={handleInputChange} defaultValue=""  />
                                                </div>
                                                <div className="col-sm-12">
                                                    <button type='submit' className="float-end"><FiCheck />Save</button>
                                                    <button type="button"  onClick={() => setValue('Mandatory Info')} className="float-end btn_cncel"><BiArrowBack /> Back</button>
                                                    {/* disabled={!state.isValid} */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Box> */}
                                    </section>
                                </TabPanel>
                                </Box>
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