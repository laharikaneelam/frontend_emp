import React, { useReducer } from 'react';
import {Fragment, useState} from "react";
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from './EmployeeForm.module.scss';
// import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
import { ImOffice }  from "react-icons/im";
import { BsFillTelephoneFill }  from "react-icons/bs";
import { MdEmail }  from "react-icons/md";
import { BiEditAlt }  from "react-icons/bi";
import { FiCheck }  from "react-icons/fi";
import { AiOutlineClose }  from "react-icons/ai";
import Personal_info from './Personal_info';
import Contact_info from './Contact_info';
import Address_info from './Address_info';
import Work_basic_info from './Work_basic_info';
import Emp_work_info from './Emp_work_info';
const initialState = {
    name: '',
    DOB: '',
    gender: '',
    blood_group: '',
    martial_status: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
switch (action.type) {
    case 'SET_NAME':
    return { ...state, name: action.payload };
    case 'SET_DOB':
    return { ...state, DOB: action.payload };
    case 'SET_GENDER':
    return { ...state, gender: action.payload };
    case 'SET_BLOOD_GROUP':
        return { ...state, blood_group: action.payload };
    case 'SET_MARTIAL_STATUS':
        return { ...state, martial_status: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

  

const EmployeeForm = (props) =>{
    const params=useParams();
    const editable_usr_id=params.id;
    const [value, setValue] = React.useState('Personal');
    const [readonly, setReadonly] = useState(true);
    // const setReadonlyHandler = () =>{
    //     setReadonly(true);
    // }
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
    console.log(state);
    // const { name, email, password } = state;
    // const isValid = name.length > 0 && email.length > 0 && password.length > 0;
    // dispatch({ type: 'SET_VALIDATION', payload: isValid });
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
                        <div className={classes.user_name}>Srikanth Yadav</div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    {/* <TabList value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example"> */}
                                    <TabList onChange={handleChange}>
                                        <Tab label="Personal" value="Personal" className={classes.emp_frm_tab}/>
                                        <Tab label="Work" value="Work"  className={classes.emp_frm_tab}/>
                                        <Tab label="Team" value="Team"  className={classes.emp_frm_tab}/>
                                        <Tab label="Education" value="Education" className={classes.emp_frm_tab} />
                                        <Tab label="Family" value="Family"  className={classes.emp_frm_tab}/>
                                        <Tab label="Documents" value="Documents"  className={classes.emp_frm_tab}/>
                                        <Tab label="Work Week" value="Work Week"  className={classes.emp_frm_tab}/>
                                        <Tab label="Pay Roll" value="Pay Roll" className={classes.emp_frm_tab} />
                                        <Tab label="File Manager" value="File Manager" className={classes.emp_frm_tab} />
                                    </TabList>
                                </Box>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Personal">
                                    <Personal_info editable_id={editable_usr_id} />
                                    <Contact_info editable_id={editable_usr_id} />
                                    <Address_info editable_id={editable_usr_id}/>
                                </TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Work">
                                    {/* <section>
                                        <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        >
                                            <header>
                                                Basic Info
                                                <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button>
                                            </header>
                                            <div className={classes.emp_frm_tab_cnt_val}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Employee ID</label>
                                                        {readonly && <p>CSIN0001</p>}
                                                        {!readonly && <Input defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Date Of Joining</label>
                                                        {readonly && <p>05-04-2022</p>}
                                                        {!readonly && <Input type="date" defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Probition Period</label>
                                                        {readonly && <p>180 Days</p>}
                                                        {!readonly &&  <Input type="text" name="blood_group" defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Employee Type</label>
                                                        {readonly && <p>Full Time</p>}
                                                        {!readonly && <Input type="text" name="martial_status" defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Work Location</label>
                                                        {readonly && <p>Hyderabad</p>}
                                                        {!readonly && <Input type="text" name="martial_status" defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Employee Status</label>
                                                        {readonly && <p>Active</p>}
                                                        {!readonly && <Input type="text" name="martial_status" defaultValue=""  />}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="">Work Experience</label>
                                                        {readonly && <p>10 Yrs</p>}
                                                        {!readonly && <Input type="text" name="martial_status" defaultValue=""  />}
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </section> */}
                                    <Work_basic_info editable_id={editable_usr_id} />
                                    <Emp_work_info editable_id={editable_usr_id} />
                                </TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Team">Team</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Education">Education</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Family">Family</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Documents">Documents</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Work Week">Work Week</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Pay Roll">Pay Roll</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="File Manager">File Manager</TabPanel>
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