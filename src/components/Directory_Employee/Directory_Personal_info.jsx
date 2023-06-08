import React, { useReducer } from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import classes from '../Employee/EmployeeForm.module.scss';
// import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
// import { ImOffice }  from "react-icons/im";
// import { BsFillTelephoneFill }  from "react-icons/bs";
// import { MdEmail }  from "react-icons/md";
import { BiEditAlt }  from "react-icons/bi";
import { FiCheck }  from "react-icons/fi";
import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';


const Directory_Personal_info = (props) =>{
    const [rows, setRowsId] = useState('');
    // const rows=props.editable_id;
      useEffect(() => {
        if(props.editable_id!=''){
            setRowsId(props.editable_id);
            // console.log(va);
            // setBtn_name('Update');
            // const data_innfo={
            //     dd_id_v:props.editable_id,
            //     dd_up: 'get_prsnl',
            // }
            // axios({
            //     method: "post",
            //     url: process.env.REACT_APP_PERSONAL_INFO_KEY,
            //     headers: { "content-type": "application/json" },
            //     data: data_innfo
            // })
            // .then(result => {
            //     setRowsId(result.data[0]);
               
            // })
        }
    }, [])
    // const [rowVlues, setRows] = useState('');
    // const [rows, setRowsId] = useState('');
    // useEffect(() => {
    //     if(props.editable_id!=''){
    //         // console.log(va);
    //         // setBtn_name('Update');
    //         const data_innfo={
    //             dd_id_v:props.editable_id,
    //             dd_up: 'get_prsnl',
    //         }
    //         axios({
    //             method: "post",
    //             url: process.env.REACT_APP_PERSONAL_INFO_KEY,
    //             headers: { "content-type": "application/json" },
    //             data: data_innfo
    //         })
    //         .then(result => {
    //             setRowsId(result.data[0]);
               
    //         })
    //     }
    // }, [])
   
    
    return (
        <section>
            <header>
                Personal
            </header>
            <Box
             component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="row">
                        <div className="col-sm-4">
                            <label htmlFor="">Name<span className='imp_clss'>*</span></label>
                            <p>{rows.first_name} {rows.middle_name} {rows.last_name}</p>
                        </div>
                        {/* <div className="col-sm-4">
                            <label htmlFor="">Middle Name</label>
                            <p>{rows.middle_name}</p>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Last Name<span className='imp_clss'>*</span></label>
                            <p>{rows.last_name}</p>
                        </div> */}
                        <div className="col-sm-4">
                            <label htmlFor="">Date Of Birth<span className='imp_clss'>*</span></label>
                            <p>{rows.usr_dob}</p>
                        </div>
                        <div className="col-sm-4">
                            <div>
                            <label htmlFor="">Gender<span className='imp_clss'>*</span></label>
                            </div>
                            <p>{rows.gender=='M' ? 'Male' : rows.gender=='F' ? 'Female' : ''}</p>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Blood Group<span className='imp_clss'>*</span></label>
                            <p>{rows.blood_group}</p>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Martial Status<span className='imp_clss'>*</span></label>
                            <p>{rows.martial_status}</p>
                        </div>
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Directory_Personal_info;