import React, { useReducer } from 'react';
import {Fragment, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from './EmployeeForm.module.scss';
// import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
import { ImOffice }  from "react-icons/im";
import { BsFillTelephoneFill }  from "react-icons/bs";
import { MdEmail }  from "react-icons/md";
// import { BiEditAlt }  from "react-icons/bi";
// import { FiCheck }  from "react-icons/fi";
// import { AiOutlineClose }  from "react-icons/ai";
import Personal_info from './Personal_info';
import Contact_info from './Contact_info';
import Address_info from './Address_info';
import Work_basic_info from './Work_basic_info';
import Emp_work_info from './Emp_work_info';
import Emp_work_history_Table from './Emp_work_history_Table';
import Team_repoting_manager from './Team_repoting_manager_Table';
import Direct_Report_Table from './Direct_Report_Table';
import Education_Info_Table from './Education_Info_Table';
import Family_Members_Table from './Family_Members_Table';
import Emegency_Contact_Table from './Emegency_Contact_Table';
import Documents_main from './Documents_main';
import Upload_User_Image from './Upload_User_Image';
import Avatar from '@mui/material/Avatar';

import axios from 'axios';
// import Upload_User_Image from './Upload_User_Image';
import Model from '../Model/Model';


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
    const [modelshow, setModelShow]=useState(false);
    const [UserImage, setUserImage]=useState('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
    const [ModelTitle, SetModelTitle]=useState('Upload Image');
    const params=useParams();
    const editable_usr_id=params.id;
    const [value, setValue] = React.useState('Personal');
    const [rows, setRows]=useState('');
    // const [readonly, setReadonly] = useState(true);
    // const setReadonlyHandler = () =>{
    //     setReadonly(true);
    // }
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


const [state, dispatch] = useReducer(reducer, initialState);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(state);
//     // const { name, email, password } = state;
//     // const isValid = name.length > 0 && email.length > 0 && password.length > 0;
//     // dispatch({ type: 'SET_VALIDATION', payload: isValid });
//   };
    //   const ariaLabel = { 'aria-label': 'description' };

    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
            dd_up_ID: editable_usr_id,
        }
        // console.log(data_innfo);
        axios({
            method: "post",
            url: process.env.REACT_APP_USERS_INFO_VAL_INFO,
            headers: { "content-type": "application/json" },
            data: data_innfo
        })
        .then(result => {
            setRows(result.data);
        })
    }, [modelshow])
    // console.log(rows[0].usr_emailID);

    const closeModel =() =>{
        setModelShow(false);
    }
    const setEnditedIdHander = (e) =>{
        // console.log(e);
    //   setEditedRowId(e); 
        setModelShow(true);
    }
    // useEffect(() => {
    //   if(rows.length > 0){
    //     console.log(rows[0].usr_img_no);
    //     setUserImage(`https://cloudscouts.pro/empapi/`+rows[0].usr_img_no);
    //   }
    // }, [modelshow])
    return (
        <Fragment>
            {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Upload_User_Image editedID={editable_usr_id} onAddImage={(e) => {setUserImage(e)}} onAddRow={(ev) =>  {setModelShow(false)}} /></Model>}

            {/* {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Upload_User_Image editedID={props.editable_id} editedTableID={editedRowId} onAddRow={() => {setModelShow(false)}} onChange={() => setDataCanged(true)} /></Model>} */}

            <div className={classes.emp_frm_main}>
                <div className="row">
                    {/* <div className={classes.user_profile_img}></div> */}
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <div className={classes.user_profile_img}>
                            <div className={classes.usr_p_img} onClick={() => {setEnditedIdHander(''); SetModelTitle('Update Image')}}>
                                {/* <img src={rows.length > 0 && ((rows[0].usr_img_no==='' || rows[0].usr_img_no===null) ? ('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500') : (`https://cloudscouts.pro/empapi/`+rows[0].usr_img_no))} alt="" className="image" /> */}
                                <Avatar
                                    alt=""
                                    src={rows.length > 0 && ((rows[0].usr_img_no==='' || rows[0].usr_img_no===null) ? ('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500') : (`https://cloudscouts.pro/empapi/`+rows[0].usr_img_no))}
                                    sx={{ width: 156, height: 156 }}
                                />
                            </div>
                            <div className={classes.usr_detais}>
                                {/* <div className={classes.ttle}>
                                    BI & EPM
                                </div>
                                <div className={classes.ttle_2}>
                                    02 - Associate
                                </div> */}
                                <div className={classes.ttle_3}>
                                    <div><BsFillTelephoneFill />{rows.length > 0 && rows[0].usr_phone_no}</div>
                                    <div><MdEmail /> {rows.length > 0 && rows[0].usr_emailID}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className={classes.user_name}>{rows.length > 0 && rows[0].first_name+' '+(rows[0].middle_name!==null?rows[0].middle_name :'') +' '+rows[0].last_name}</div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    {/* <TabList value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example"> */}
                                    <TabList onChange={handleChange}>
                                        <Tab label="Personal" value="Personal" className={classes.emp_frm_tab}/>
                                        <Tab label="Work" value="Work"  className={classes.emp_frm_tab}/>
                                        {/* <Tab label="Team" value="Team"  className={classes.emp_frm_tab}/> */}
                                        <Tab label="Education" value="Education" className={classes.emp_frm_tab} />
                                        {/* <Tab label="Family" value="Family"  className={classes.emp_frm_tab}/> */}
                                        <Tab label="Documents" value="Documents"  className={classes.emp_frm_tab}/>
                                        {/* <Tab label="Work Week" value="Work Week"  className={classes.emp_frm_tab}/>
                                        <Tab label="Pay Roll" value="Pay Roll" className={classes.emp_frm_tab} />
                                        <Tab label="File Manager" value="File Manager" className={classes.emp_frm_tab} /> */}
                                    </TabList>
                                </Box>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Personal">
                                    <Personal_info editable_id={editable_usr_id} />
                                    <Contact_info editable_id={editable_usr_id} />
                                    <Address_info editable_id={editable_usr_id}/>
                                    <Family_Members_Table editable_id={editable_usr_id} />
                                    <Emegency_Contact_Table editable_id={editable_usr_id} />
                                </TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Work">
                                    <Work_basic_info editable_id={editable_usr_id} />
                                    <Emp_work_info editable_id={editable_usr_id} />
                                    <Emp_work_history_Table editable_id={editable_usr_id} />
                                    <Team_repoting_manager editable_id={editable_usr_id} />
                                    <Direct_Report_Table editable_id={editable_usr_id} />
                                </TabPanel>
                                {/* <TabPanel className={classes.emp_frm_tab_cnt} value="Team">
                                    <Team_repoting_manager editable_id={editable_usr_id} />
                                    <Direct_Report_Table editable_id={editable_usr_id} />
                                </TabPanel> */}
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Education">
                                    <Education_Info_Table editable_id={editable_usr_id} />
                                </TabPanel>
                                {/* <TabPanel className={classes.emp_frm_tab_cnt} value="Family">
                                    <Family_Members_Table editable_id={editable_usr_id} />
                                    <Emegency_Contact_Table editable_id={editable_usr_id} />
                                </TabPanel> */}
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Documents">
                                    <Documents_main editable_id={editable_usr_id} />
                                </TabPanel>
                                {/* <TabPanel className={classes.emp_frm_tab_cnt} value="Work Week">Work Week</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="Pay Roll">Pay Roll</TabPanel>
                                <TabPanel className={classes.emp_frm_tab_cnt} value="File Manager">File Manager</TabPanel> */}
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