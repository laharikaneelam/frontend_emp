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
import swal from 'sweetalert';


const Directory_Work_basic_info = (props) =>{
    // console.log(props.editable_id);
    // const [rowVlues, setRows] = useState('');
    const [rows, setRowsId] = useState('');
    // const rows=props.editable_id;
      useEffect(() => {
        if(props.editable_id!=''){
            setRowsId(props.editable_id);
        }
    }, [])
    // useEffect(() => {
    //     if(props.editable_id!=''){
    //         // console.log(va);
    //         // setBtn_name('Update');
    //         const data_innfo={
    //             dd_id_v:props.editable_id,
    //             dd_up: 'get_work_basic',
    //         }
    //         axios({
    //             method: "post",
    //             url: process.env.REACT_APP_PERSONAL_INFO_KEY,
    //             headers: { "content-type": "application/json" },
    //             data: data_innfo
    //         })
    //         .then(result => {
    //             // setRows(result.data);
    //             setRowsId(result.data[0]);
               
    //         })
    //     }
    //     // setDataCanged(false);
    // }, [])

    
    return (
        <section>
            <header>
                Work
            </header>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            // autoComplete="off"
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="">Employee ID</label>
                            <p>{rows.employee_id}</p>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Reporting Manager</label>
                            <p>{rows.usr_reprt_mnger}</p>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Designation</label>
                            <p>{rows.usr_designation} Days</p>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Department</label>
                            <p>{rows.usr_department}</p>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Work Location</label>
                            <p>{rows.wrk_loc}</p>
                        </div>
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Directory_Work_basic_info;